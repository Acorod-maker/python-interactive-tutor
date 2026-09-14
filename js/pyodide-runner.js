/**
 * pyodide-runner.js
 * Pyodide WebAssembly Python 3 直譯環境封裝
 * 具備深度錯誤分析、語法樹/Traceback 行號定位與預期值比對診斷功能
 */

class PyodideRunner {
  constructor() {
    this.pyodide = null;
    this.isLoading = false;
    this.isReady = false;
    this.loadError = null;
  }

  /**
   * 初始化 Pyodide WebAssembly 環境
   */
  async init(onStatusUpdate) {
    if (this.isReady) return true;
    if (this.isLoading) return false;

    this.isLoading = true;
    if (onStatusUpdate) onStatusUpdate('loading', '正在下載並初始化 Pyodide WebAssembly Python 引擎...');

    try {
      if (typeof window.loadPyodide !== 'function') {
        throw new Error('未偵測到 loadPyodide 全域函式，請確認網路連線可存取 CDN。');
      }

      this.pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });

      // 初始化 Python 端輔助環境與錯誤分析器
      await this.pyodide.runPythonAsync(`
import sys
import io
import traceback
import json

class OutputCapture:
    def __init__(self):
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()
    
    def get_stdout(self):
        return self.stdout_buffer.getvalue()

    def get_stderr(self):
        return self.stderr_buffer.getvalue()

    def clear(self):
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()

_runner_capture = OutputCapture()

def _extract_code_context(user_code, line_num, window=2):
    """提取出錯行周圍的程式碼片段"""
    if not line_num or not user_code:
        return ""
    lines = user_code.splitlines()
    total = len(lines)
    start = max(0, line_num - 1 - window)
    end = min(total, line_num + window)
    
    result = []
    for idx in range(start, end):
        cur_line = idx + 1
        prefix = "> " if cur_line == line_num else "  "
        line_content = lines[idx]
        result.append(f"{prefix}{cur_line:3d} | {line_content}")
    return "\\n".join(result)
`);

      this.isReady = true;
      this.isLoading = false;
      if (onStatusUpdate) onStatusUpdate('ready', 'Python 3.12 (Pyodide WebAssembly) 準備就緒！');
      return true;
    } catch (err) {
      console.error('Pyodide 載入失敗:', err);
      this.isLoading = false;
      this.loadError = err.message;
      if (onStatusUpdate) onStatusUpdate('error', `載入失敗: ${err.message}`);
      return false;
    }
  }

  /**
   * 執行一般 Python 代碼並攔截 stdout/stderr 與精確錯誤定位
   */
  async runCode(code, { onStdout, onStderr } = {}) {
    if (!this.isReady) {
      const errMsg = '直譯引擎尚未就緒，請稍候重試。';
      if (onStderr) onStderr(errMsg);
      return { success: false, error: errMsg, stdout: '' };
    }

    try {
      this.pyodide.globals.set('_user_code_to_run', code);

      const runResultJson = await this.pyodide.runPythonAsync(`
import sys
_runner_capture.clear()
sys.stdout = _runner_capture.stdout_buffer
sys.stderr = _runner_capture.stderr_buffer

_run_error = None
_user_globals = {"__name__": "__main__"}

try:
    _compiled = compile(_user_code_to_run, "solution.py", "exec")
    exec(_compiled, _user_globals)
except SyntaxError as e:
    _run_error = {
        "type": "SyntaxError",
        "name": type(e).__name__,
        "line": e.lineno,
        "offset": e.offset,
        "line_code": e.text.strip() if e.text else "",
        "message": str(e.msg),
        "code_context": _extract_code_context(_user_code_to_run, e.lineno)
    }
except Exception as e:
    tb_list = traceback.extract_tb(sys.exc_info()[2])
    user_frame = None
    for f in reversed(tb_list):
        if f.filename == "solution.py":
            user_frame = f
            break
    
    line_no = user_frame.lineno if user_frame else None
    _run_error = {
        "type": "RuntimeError",
        "name": type(e).__name__,
        "line": line_no,
        "line_code": user_frame.line if user_frame else "",
        "message": str(e),
        "code_context": _extract_code_context(_user_code_to_run, line_no) if line_no else ""
    }
finally:
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

_stdout = _runner_capture.get_stdout()
_stderr = _runner_capture.get_stderr()

json.dumps({
    "success": _run_error is None,
    "stdout": _stdout,
    "stderr": _stderr,
    "error": _run_error
})
`);

      const res = JSON.parse(runResultJson);

      if (res.stdout && onStdout) onStdout(res.stdout);
      if (res.stderr && onStderr) onStderr(res.stderr);

      if (res.error) {
        const friendlyMessage = this._formatErrorMessage(res.error);
        if (onStderr) onStderr(friendlyMessage.fullFormatted);
        return {
          success: false,
          errorInfo: res.error,
          error: friendlyMessage.fullFormatted,
          stdout: res.stdout || ''
        };
      }

      return {
        success: true,
        stdout: res.stdout || '',
        stderr: res.stderr || ''
      };
    } catch (err) {
      const fallbackErr = this._formatErrorMessage({ message: err.message });
      if (onStderr) onStderr(fallbackErr.fullFormatted);
      return {
        success: false,
        error: fallbackErr.fullFormatted,
        stdout: ''
      };
    }
  }

  /**
   * 執行關卡檢驗測試 (Test Runner)
   * 具備：精準行號定位、預期 vs 實際比對、出錯代碼片段高亮
   */
  async runChallengeValidation(userCode, testScript) {
    if (!this.isReady) {
      return {
        passed: false,
        summary: '直譯引擎尚未就緒',
        results: [{ testName: '引擎檢查', passed: false, message: 'Pyodide 尚未載入完成' }]
      };
    }

    try {
      this.pyodide.globals.set('_user_code_input', userCode);
      this.pyodide.globals.set('_test_script_input', testScript);

      const validationJson = await this.pyodide.runPythonAsync(`
import sys
import json
import traceback

_runner_capture.clear()
sys.stdout = _runner_capture.stdout_buffer
sys.stderr = _runner_capture.stderr_buffer

_user_globals = {"__name__": "__main__"}
_runtime_error = None
_test_results = []

# 1. 執行學員程式碼並捕捉異常
try:
    _compiled = compile(_user_code_input, "solution.py", "exec")
    exec(_compiled, _user_globals)
except SyntaxError as e:
    _runtime_error = {
        "is_syntax": True,
        "name": type(e).__name__,
        "line": e.lineno,
        "offset": e.offset,
        "line_code": e.text.strip() if e.text else "",
        "message": str(e.msg),
        "code_context": _extract_code_context(_user_code_input, e.lineno)
    }
except Exception as e:
    tb_list = traceback.extract_tb(sys.exc_info()[2])
    user_frame = None
    for f in reversed(tb_list):
        if f.filename == "solution.py":
            user_frame = f
            break
    
    line_no = user_frame.lineno if user_frame else None
    _runtime_error = {
        "is_syntax": False,
        "name": type(e).__name__,
        "line": line_no,
        "line_code": user_frame.line if user_frame else "",
        "message": str(e),
        "code_context": _extract_code_context(_user_code_input, line_no) if line_no else ""
    }
finally:
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

_captured_stdout = _runner_capture.get_stdout()

# 輔助：尋找變數在學員代碼中的具體行號
def _find_var_line(var_name):
    lines = _user_code_input.splitlines()
    for idx, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith(var_name) and ("=" in stripped or "(" in stripped):
            return idx + 1, stripped
    # 模糊查找
    for idx, line in enumerate(lines):
        if var_name in line:
            return idx + 1, line.strip()
    return None, ""

# 2. 如果學員代碼有語法或執行期錯誤，直接終止並回傳定位資訊
if _runtime_error:
    _validation_output = {
        "has_runtime_error": True,
        "runtime_error": _runtime_error,
        "stdout": _captured_stdout,
        "results": []
    }
else:
    # 3. 注入高級測試斷言函式
    def register_test(name, condition, error_hint, expected=None, actual=None, target_var=None):
        line_num = None
        line_snippet = ""
        actual_val = actual

        if target_var:
            line_num, line_snippet = _find_var_line(target_var)
            if actual is None:
                if target_var in _user_globals:
                    actual_val = repr(_user_globals[target_var])
                else:
                    actual_val = "❌ 未宣告此變數 (未找到)"

        if not condition:
            # 如果沒有指定 target_var，嘗試推測相關行
            if not line_num:
                for idx, l in enumerate(_user_code_input.splitlines()):
                    if any(k in l for k in ["print", "if", "for", "while", "def"]):
                        line_num = idx + 1
                        line_snippet = l.strip()
                        break

            code_ctx = _extract_code_context(_user_code_input, line_num) if line_num else ""
            
            _test_results.append({
                "name": name,
                "passed": False,
                "hint": error_hint,
                "expected": str(expected) if expected is not None else None,
                "actual": str(actual_val) if actual_val is not None else None,
                "line": line_num,
                "line_code": line_snippet,
                "code_context": code_ctx
            })
        else:
            _test_results.append({
                "name": name,
                "passed": True,
                "hint": "通過！",
                "expected": None,
                "actual": None,
                "line": None,
                "line_code": "",
                "code_context": ""
            })

    # 執行測試腳本
    try:
        exec(_test_script_input, {
            **_user_globals,
            "register_test": register_test,
            "_captured_stdout": _captured_stdout,
            "_user_code": _user_code_input
        })
    except Exception as test_ex:
        _test_results.append({
            "name": "驗證腳本執行",
            "passed": False,
            "hint": f"測試邏輯檢驗失敗: {str(test_ex)}",
            "expected": None,
            "actual": None,
            "line": None,
            "line_code": "",
            "code_context": ""
        })

    _validation_output = {
        "has_runtime_error": False,
        "runtime_error": None,
        "stdout": _captured_stdout,
        "results": _test_results
    }

json.dumps(_validation_output)
`);

      const parsed = JSON.parse(validationJson);

      // 狀況 A：程式碼本身執行就崩潰（語法錯誤、NameError、TypeError）
      if (parsed.has_runtime_error) {
        const err = parsed.runtime_error;
        const friendly = this._formatErrorMessage(err);

        return {
          passed: false,
          hasExecutionError: true,
          errorInfo: {
            name: err.name,
            line: err.line,
            lineCode: err.line_code,
            message: err.message,
            codeContext: err.code_context,
            hint: friendly.chineseTip,
            fullFormatted: friendly.fullFormatted
          },
          stdout: parsed.stdout || '',
          results: [{
            testName: `程式執行中斷 (${err.name})`,
            passed: false,
            message: friendly.fullFormatted,
            line: err.line,
            lineCode: err.line_code,
            codeContext: err.code_context
          }]
        };
      }

      // 狀況 B：程式正常跑完，但檢查測試要求
      const allPassed = parsed.results.length > 0 && parsed.results.every(r => r.passed);
      const firstFailed = parsed.results.find(r => !r.passed);

      return {
        passed: allPassed,
        hasExecutionError: false,
        errorInfo: firstFailed ? {
          name: '邏輯/目標不符',
          line: firstFailed.line,
          lineCode: firstFailed.line_code,
          codeContext: firstFailed.code_context,
          expected: firstFailed.expected,
          actual: firstFailed.actual,
          hint: firstFailed.hint
        } : null,
        stdout: parsed.stdout || '',
        results: parsed.results.map(r => ({
          testName: r.name,
          passed: r.passed,
          message: r.hint,
          expected: r.expected,
          actual: r.actual,
          line: r.line,
          lineCode: r.line_code,
          codeContext: r.code_context
        }))
      };
    } catch (err) {
      console.error('執行驗證時發生未知異常:', err);
      return {
        passed: false,
        hasExecutionError: true,
        errorInfo: {
          name: '執行失敗',
          line: null,
          message: err.message,
          hint: '請檢查程式碼中是否有無窮迴圈或未封閉括號。'
        },
        results: [{
          testName: '驗證系統中斷',
          passed: false,
          message: `檢驗過程發生例外：${err.message}`
        }]
      };
    }
  }

  /**
   * 友善化 Python 錯誤訊息與新手除錯指引
   */
  _formatErrorMessage(errObj) {
    if (!errObj) return { fullFormatted: '未知錯誤', chineseTip: '' };

    const name = errObj.name || '';
    const line = errObj.line ? `第 ${errObj.line} 行` : '未知行數';
    const rawMsg = errObj.message || '';
    const lineCode = errObj.line_code ? `\n> ${errObj.line} | ${errObj.line_code}` : '';

    let chineseTip = '';
    let suggestion = '';

    if (name === 'SyntaxError') {
      chineseTip = '這是「語法錯誤 (SyntaxError)」。電腦看不懂這行寫法。';
      if (rawMsg.includes("expected ':'") || rawMsg.includes("invalid syntax")) {
        suggestion = '請檢查行尾是否有漏打半形冒號 `:`，或是括號、引號沒有成對封閉！';
      } else {
        suggestion = '請檢查是否有使用到中文全形符號（如全形括號或引號）。';
      }
    } else if (name === 'IndentationError') {
      chineseTip = '這是「縮排錯誤 (IndentationError)」。Python 依靠縮排判斷程式區塊。';
      suggestion = '請確認 if、for、while 或 def 底下的程式碼是否整齊縮排 4 個空格！';
    } else if (name === 'NameError') {
      chineseTip = '這是「變數未定義錯誤 (NameError)」。';
      suggestion = '你呼叫了一個小機器人沒看過的名稱！請檢查：1. 是否尚未宣告該變數？ 2. 英文字母大小寫是否有拼錯？';
    } else if (name === 'TypeError') {
      chineseTip = '這是「型態不相容錯誤 (TypeError)」。';
      suggestion = '例如你可能把「文字 (str)」跟「數字 (int)」直接相加了，請使用 str() 或 int() 先進行型態轉換！';
    } else if (name === 'ZeroDivisionError') {
      chineseTip = '這是「除以零錯誤 (ZeroDivisionError)」。';
      suggestion = '數學上分母不可以是 0 喔！請檢查除數變數是否變成了 0。';
    } else if (name === 'IndexError') {
      chineseTip = '這是「索引超出範圍 (IndexError)」。';
      suggestion = '串列長度不夠，你存取了不存在的元素！請記得串列索引是從 0 開始數的。';
    } else if (name === 'KeyError') {
      chineseTip = '這是「查無鍵值錯誤 (KeyError)」。';
      suggestion = '字典中沒有這個 Key！請檢查字典中是否有該名稱，或是 Key 的引號名稱拼錯了。';
    } else {
      chineseTip = `發生了 ${name} 錯誤。`;
      suggestion = '請仔細檢視下方出錯行周圍的程式碼。';
    }

    const fullFormatted = `❌ 錯誤類型：${name} (${line})
${lineCode ? lineCode + '\n' : ''}💬 錯誤原因：${rawMsg}
💡【除錯小幫手】：${chineseTip}
🔧【修改建議】：${suggestion}`;

    return {
      fullFormatted,
      chineseTip,
      suggestion,
      line: errObj.line,
      lineCode: errObj.line_code
    };
  }
}

export const pyRunner = new PyodideRunner();
