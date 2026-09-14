/**
 * app.js
 * Python 奇幻冒險主應用程式控制器
 * 具備：精確代碼出錯行定位、預期 vs 實際值視覺比對、程式碼行號標籤高亮
 */

import { CHAPTERS_DATA, CHEAT_SHEET_DATA } from './curriculum.js';
import { pyRunner } from './pyodide-runner.js';
import { soundManager } from './sound-effects.js';

class PythonQuestApp {
  constructor() {
    this.currentLesson = null;
    this.currentChapter = null;
    this.isSandboxMode = false;
    this.completedLessons = new Set(JSON.parse(localStorage.getItem('py_quest_completed') || '[]'));
    this.userCodes = JSON.parse(localStorage.getItem('py_quest_codes') || '{}');
    this.currentHintIndex = 0;
    this.currentErrorLine = null;

    // DOM 快照快取
    this.dom = {
      progressText: document.getElementById('progress-text'),
      badgeCount: document.getElementById('badge-count'),
      progressFill: document.getElementById('progress-fill'),
      chaptersList: document.getElementById('chapters-list'),
      currentChapterIndicator: document.getElementById('current-chapter-indicator'),
      
      // Lesson Panel
      bcChapter: document.getElementById('bc-chapter'),
      bcLesson: document.getElementById('bc-lesson'),
      lessonTitle: document.getElementById('lesson-title'),
      missionStatusBadge: document.getElementById('mission-status-badge'),
      tabBtns: document.querySelectorAll('.tab-btn'),
      tabPanes: document.querySelectorAll('.tab-pane'),
      theoryContent: document.getElementById('theory-content'),
      missionGoal: document.getElementById('mission-goal'),
      missionDescription: document.getElementById('mission-description'),
      missionRequirements: document.getElementById('mission-requirements'),
      hintSection: document.getElementById('hint-section'),
      btnGetHint: document.getElementById('btn-get-hint'),
      hintCounter: document.getElementById('hint-counter'),
      btnShowSolution: document.getElementById('btn-show-solution'),
      hintBox: document.getElementById('hint-box'),
      solutionBox: document.getElementById('solution-box'),
      quizContainer: document.getElementById('quiz-container'),

      // Code Editor
      fileName: document.getElementById('file-name'),
      unsavedDot: document.getElementById('unsaved-dot'),
      codeEditor: document.getElementById('code-editor'),
      lineNumbers: document.getElementById('line-numbers'),
      btnFormatCode: document.getElementById('btn-format-code'),
      btnResetCode: document.getElementById('btn-reset-code'),
      engineStatus: document.getElementById('engine-status'),
      statusText: document.getElementById('status-text'),
      btnRunCode: document.getElementById('btn-run-code'),
      btnVerifyMission: document.getElementById('btn-verify-mission'),

      // Console
      tabStdout: document.getElementById('tab-stdout'),
      tabTestResults: document.getElementById('tab-test-results'),
      testBadge: document.getElementById('test-badge'),
      btnClearConsole: document.getElementById('btn-clear-console'),
      stdoutView: document.getElementById('stdout-view'),
      testView: document.getElementById('test-view'),
      consoleOutput: document.getElementById('console-output'),
      testResultsList: document.getElementById('test-results-list'),

      // Modals
      victoryModal: document.getElementById('victory-modal'),
      victoryLessonName: document.getElementById('victory-lesson-name'),
      victorySkillTag: document.getElementById('victory-skill-tag'),
      btnModalStay: document.getElementById('btn-modal-stay'),
      btnModalNext: document.getElementById('btn-modal-next'),

      cheatsheetModal: document.getElementById('cheatsheet-modal'),
      cheatsheetContent: document.getElementById('cheatsheet-content'),
      btnCheatsheet: document.getElementById('btn-cheatsheet'),
      btnCloseCheatsheet: document.getElementById('btn-close-cheatsheet'),

      // Sandbox & Settings
      btnSandbox: document.getElementById('btn-sandbox'),
      sandboxBanner: document.getElementById('sandbox-banner'),
      btnExitSandbox: document.getElementById('btn-exit-sandbox'),
      btnSound: document.getElementById('btn-sound'),
      btnTheme: document.getElementById('btn-theme'),
      btnResetProgress: document.getElementById('btn-reset-progress')
    };
  }

  /**
   * 初始化應用程式
   */
  async init() {
    this._bindEvents();
    this._renderChaptersSidebar();
    this._renderCheatSheet();
    this._updateOverallProgress();

    // 讀取最後一次開啟的關卡或預設第一關
    const lastLessonId = localStorage.getItem('py_quest_last_lesson') || 'ch1-1';
    this.loadLesson(lastLessonId);

    // 初始化 Pyodide WebAssembly
    pyRunner.init((status, message) => {
      this._updateEngineStatus(status, message);
    });

    // 檢查初始靜音狀態
    if (soundManager.isMuted) {
      this.dom.btnSound.querySelector('.icon').textContent = '🔇';
    }
  }

  /**
   * 綁定全局事件
   */
  _bindEvents() {
    // 編輯器輸入與行號同步，輸入時自動清除上次的錯誤標註
    this.dom.codeEditor.addEventListener('input', () => {
      if (this.currentErrorLine !== null) {
        this.currentErrorLine = null;
      }
      this._updateLineNumbers();
      this._saveCurrentCodeDraft();
    });

    this.dom.codeEditor.addEventListener('scroll', () => {
      this.dom.lineNumbers.scrollTop = this.dom.codeEditor.scrollTop;
    });

    // 處理編輯器按鍵：Tab 鍵插入 4 空格、Ctrl+Enter 執行
    this.dom.codeEditor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runUserCode();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.dom.codeEditor.selectionStart;
        const end = this.dom.codeEditor.selectionEnd;
        const value = this.dom.codeEditor.value;
        this.dom.codeEditor.value = value.substring(0, start) + '    ' + value.substring(end);
        this.dom.codeEditor.selectionStart = this.dom.codeEditor.selectionEnd = start + 4;
        this._updateLineNumbers();
        this._saveCurrentCodeDraft();
      }
    });

    // 標籤頁切換 (觀念 / 任務 / 測驗)
    this.dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundManager.playClick();
        const tabId = btn.dataset.tab;
        this._switchLessonTab(tabId);
      });
    });

    // 控制台標籤切換
    this.dom.tabStdout.addEventListener('click', () => this._switchConsoleTab('stdout'));
    this.dom.tabTestResults.addEventListener('click', () => this._switchConsoleTab('test'));
    this.dom.btnClearConsole.addEventListener('click', () => {
      this.dom.consoleOutput.innerHTML = '<span class="system-msg">控制台輸出已清除。</span>';
    });

    // 代碼執行與關卡驗證
    this.dom.btnRunCode.addEventListener('click', () => {
      soundManager.playClick();
      this.runUserCode();
    });

    this.dom.btnVerifyMission.addEventListener('click', () => {
      soundManager.playClick();
      this.verifyCurrentMission();
    });

    // 提示與解答按鈕
    this.dom.btnGetHint.addEventListener('click', () => this._showNextHint());
    this.dom.btnShowSolution.addEventListener('click', () => this._toggleSolution());

    // 代碼工具 (格式整理、重置)
    this.dom.btnFormatCode.addEventListener('click', () => this._formatCurrentCode());
    this.dom.btnResetCode.addEventListener('click', () => this._resetCurrentCode());

    // 彈跳視窗控制
    this.dom.btnModalStay.addEventListener('click', () => {
      this.dom.victoryModal.classList.add('hidden');
    });

    this.dom.btnModalNext.addEventListener('click', () => {
      this.dom.victoryModal.classList.add('hidden');
      this.loadNextLesson();
    });

    // 語法小抄
    this.dom.btnCheatsheet.addEventListener('click', () => {
      soundManager.playClick();
      this.dom.cheatsheetModal.classList.remove('hidden');
    });
    this.dom.btnCloseCheatsheet.addEventListener('click', () => {
      this.dom.cheatsheetModal.classList.add('hidden');
    });

    // 沙盒模式切換
    this.dom.btnSandbox.addEventListener('click', () => this._toggleSandboxMode(true));
    this.dom.btnExitSandbox.addEventListener('click', () => this._toggleSandboxMode(false));

    // 音效切換
    this.dom.btnSound.addEventListener('click', () => {
      const isMuted = soundManager.toggleMute();
      this.dom.btnSound.querySelector('.icon').textContent = isMuted ? '🔇' : '🔊';
    });

    // 主題切換 (深色 / 淺色)
    this.dom.btnTheme.addEventListener('click', () => {
      soundManager.playClick();
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      this.dom.btnTheme.querySelector('.icon').textContent = isLight ? '☀️' : '🌙';
    });

    // 重置進度
    this.dom.btnResetProgress.addEventListener('click', () => {
      if (confirm('確定要清空所有學習進度與存檔嗎？此動作無法復原！')) {
        localStorage.removeItem('py_quest_completed');
        localStorage.removeItem('py_quest_codes');
        localStorage.removeItem('py_quest_last_lesson');
        this.completedLessons.clear();
        this.userCodes = {};
        this._updateOverallProgress();
        this._renderChaptersSidebar();
        this.loadLesson('ch1-1');
      }
    });
  }

  /**
   * 渲染左側章節與關卡列表
   */
  _renderChaptersSidebar() {
    this.dom.chaptersList.innerHTML = '';

    CHAPTERS_DATA.forEach((chapter, chIdx) => {
      const chapterCard = document.createElement('div');
      chapterCard.className = 'chapter-card';
      chapterCard.dataset.chapterId = chapter.id;

      // 檢查此章節是否為當前展開
      const isCurrentChapter = this.currentChapter && this.currentChapter.id === chapter.id;
      if (isCurrentChapter || chIdx === 0) {
        chapterCard.classList.add('expanded');
      }

      // 計算本章完成數
      const completedInChapter = chapter.lessons.filter(l => this.completedLessons.has(l.id)).length;

      chapterCard.innerHTML = `
        <div class="chapter-header">
          <div class="chapter-title-group">
            <span class="chapter-icon">${chapter.icon}</span>
            <span class="chapter-name">${chapter.title.split('：')[1] || chapter.title}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="chapter-badge">${completedInChapter}/${chapter.lessons.length}</span>
            <span class="chapter-arrow">▶</span>
          </div>
        </div>
        <div class="lessons-list" id="lessons-for-${chapter.id}"></div>
      `;

      // 展開/收合事件
      const header = chapterCard.querySelector('.chapter-header');
      header.addEventListener('click', () => {
        soundManager.playClick();
        chapterCard.classList.toggle('expanded');
      });

      // 渲染內部關卡
      const lessonsListEl = chapterCard.querySelector('.lessons-list');
      chapter.lessons.forEach((lesson, lIdx) => {
        const isCompleted = this.completedLessons.has(lesson.id);
        const isActive = this.currentLesson && this.currentLesson.id === lesson.id;

        const lessonItem = document.createElement('div');
        lessonItem.className = `lesson-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
        lessonItem.dataset.lessonId = lesson.id;

        lessonItem.innerHTML = `
          <span>${lIdx + 1}. ${lesson.title}</span>
          <span class="lesson-status-icon">${isCompleted ? '✓' : '○'}</span>
        `;

        lessonItem.addEventListener('click', (e) => {
          e.stopPropagation();
          soundManager.playClick();
          this.loadLesson(lesson.id);
        });

        lessonsListEl.appendChild(lessonItem);
      });

      this.dom.chaptersList.appendChild(chapterCard);
    });
  }

  /**
   * 載入指定關卡
   */
  loadLesson(lessonId) {
    let foundLesson = null;
    let foundChapter = null;

    for (const ch of CHAPTERS_DATA) {
      const match = ch.lessons.find(l => l.id === lessonId);
      if (match) {
        foundLesson = match;
        foundChapter = ch;
        break;
      }
    }

    if (!foundLesson) return;

    this.currentLesson = foundLesson;
    this.currentChapter = foundChapter;
    this.currentHintIndex = 0;
    this.currentErrorLine = null;
    this.isSandboxMode = false;
    this.dom.sandboxBanner.classList.add('hidden');

    localStorage.setItem('py_quest_last_lesson', lessonId);

    // 更新 UI 頂端導航資訊
    this.dom.bcChapter.textContent = foundChapter.title.split('：')[0];
    this.dom.bcLesson.textContent = foundLesson.title;
    this.dom.lessonTitle.textContent = foundLesson.title;
    this.dom.currentChapterIndicator.textContent = foundChapter.title.split('：')[0].replace('第 ', 'Ch ').replace(' 章', '');

    // 更新任務完成狀態標籤
    const isCompleted = this.completedLessons.has(lessonId);
    if (isCompleted) {
      this.dom.missionStatusBadge.textContent = '已完成 ✓';
      this.dom.missionStatusBadge.classList.add('completed');
    } else {
      this.dom.missionStatusBadge.textContent = '未完成';
      this.dom.missionStatusBadge.classList.remove('completed');
    }

    // 填入觀念內容
    this.dom.theoryContent.innerHTML = foundLesson.theory;

    // 填入任務內容
    this.dom.missionGoal.textContent = foundLesson.mission.goal;
    this.dom.missionDescription.innerHTML = foundLesson.mission.description.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
    this.dom.missionRequirements.innerHTML = foundLesson.mission.requirements.map(r => `<li>${r.replace(/`([^`]+)`/g, '<code>$1</code>')}</li>`).join('');

    // 重置提示與解答面板
    this.dom.hintCounter.textContent = `(0/${foundLesson.hints.length})`;
    this.dom.hintBox.classList.add('hidden');
    this.dom.hintBox.innerHTML = '';
    this.dom.solutionBox.classList.add('hidden');
    this.dom.solutionBox.innerHTML = '';

    // 填入小測驗
    this._renderQuiz(foundLesson.quiz);

    // 載入代碼（如果有存檔則優先載入存檔，否則填入 starterCode）
    const savedCode = this.userCodes[lessonId] !== undefined ? this.userCodes[lessonId] : foundLesson.starterCode;
    this.dom.codeEditor.value = savedCode;
    this.dom.fileName.textContent = `${lessonId}.py`;
    this._updateLineNumbers();

    // 預設跳至觀念分頁
    this._switchLessonTab('tab-theory');

    // 終端機切換至 stdout
    this._switchConsoleTab('stdout');

    // 重新標記側邊欄選中狀態
    this._highlightActiveSidebarItem(lessonId);
  }

  /**
   * 標記側邊欄高亮
   */
  _highlightActiveSidebarItem(lessonId) {
    document.querySelectorAll('.lesson-item').forEach(item => {
      if (item.dataset.lessonId === lessonId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 確保父章節為展開狀態
    const currentChapterCard = document.querySelector(`.chapter-card[data-chapter-id="${this.currentChapter.id}"]`);
    if (currentChapterCard) {
      currentChapterCard.classList.add('expanded');
    }
  }

  /**
   * 切換教材分頁
   */
  _switchLessonTab(tabId) {
    this.dom.tabBtns.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.dom.tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  /**
   * 切換終端機 / 測試報告標籤
   */
  _switchConsoleTab(tabType) {
    if (tabType === 'stdout') {
      this.dom.tabStdout.classList.add('active');
      this.dom.tabTestResults.classList.remove('active');
      this.dom.stdoutView.classList.add('active');
      this.dom.testView.classList.remove('active');
    } else {
      this.dom.tabStdout.classList.remove('active');
      this.dom.tabTestResults.classList.add('active');
      this.dom.stdoutView.classList.remove('active');
      this.dom.testView.classList.add('active');
    }
  }

  /**
   * 渲染小測驗卡片
   */
  _renderQuiz(quizData) {
    if (!quizData) {
      this.dom.quizContainer.innerHTML = '<p class="system-msg">本關卡暫無測驗題。</p>';
      return;
    }

    this.dom.quizContainer.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-question-title">❓ 觀念隨堂小檢測：${quizData.question}</div>
        <div class="quiz-options">
          ${quizData.options.map((opt, idx) => `
            <button class="quiz-option-btn" data-opt-index="${idx}">
              <span class="quiz-opt-letter">${String.fromCharCode(65 + idx)}.</span>
              <span class="quiz-opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback hidden" id="quiz-feedback"></div>
      </div>
    `;

    const optionBtns = this.dom.quizContainer.querySelectorAll('.quiz-option-btn');
    const feedbackBox = this.dom.quizContainer.querySelector('#quiz-feedback');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.dataset.optIndex, 10);
        optionBtns.forEach(b => b.disabled = true);

        if (selectedIdx === quizData.correctIndex) {
          soundManager.playSuccess();
          btn.classList.add('correct');
          feedbackBox.className = 'quiz-feedback success';
          feedbackBox.innerHTML = `🎉 <strong>答對了！</strong> ${quizData.explanation}`;
        } else {
          soundManager.playError();
          btn.classList.add('incorrect');
          optionBtns[quizData.correctIndex].classList.add('correct');
          feedbackBox.className = 'quiz-feedback error';
          feedbackBox.innerHTML = `❌ <strong>再想一下！</strong> ${quizData.explanation}`;
        }
        feedbackBox.classList.remove('hidden');
      });
    });
  }

  /**
   * 提示系統：漸進式揭示提示
   */
  _showNextHint() {
    if (!this.currentLesson || !this.currentLesson.hints) return;

    soundManager.playClick();
    const hints = this.currentLesson.hints;

    if (this.currentHintIndex < hints.length) {
      this.currentHintIndex++;
    }

    this.dom.hintCounter.textContent = `(${this.currentHintIndex}/${hints.length})`;
    this.dom.hintBox.classList.remove('hidden');

    const displayedHints = hints.slice(0, this.currentHintIndex);
    this.dom.hintBox.innerHTML = displayedHints.map((h, i) => `<div><strong>💡 提示 ${i + 1}：</strong> ${h}</div>`).join('<div style="margin: 6px 0; border-top: 1px dashed rgba(245,158,11,0.2);"></div>');
  }

  /**
   * 解答系統：顯示/隱藏參考解答
   */
  _toggleSolution() {
    if (!this.currentLesson || !this.currentLesson.solution) return;

    soundManager.playClick();
    if (this.dom.solutionBox.classList.contains('hidden')) {
      this.dom.solutionBox.classList.remove('hidden');
      this.dom.solutionBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>🔓 參考解答代碼：</strong>
          <button id="btn-copy-solution" class="copy-btn">填入編輯器</button>
        </div>
        <pre style="margin: 0; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-family: var(--font-mono);">${this.currentLesson.solution}</pre>
      `;

      document.getElementById('btn-copy-solution').addEventListener('click', () => {
        soundManager.playClick();
        this.dom.codeEditor.value = this.currentLesson.solution;
        this.currentErrorLine = null;
        this._updateLineNumbers();
        this._saveCurrentCodeDraft();
      });
    } else {
      this.dom.solutionBox.classList.add('hidden');
    }
  }

  /**
   * 格式化整理代碼
   */
  _formatCurrentCode() {
    soundManager.playClick();
    const code = this.dom.codeEditor.value;
    const cleaned = code.split('\n').map(line => line.trimEnd()).join('\n');
    this.dom.codeEditor.value = cleaned;
    this._updateLineNumbers();
    this._saveCurrentCodeDraft();
  }

  /**
   * 重置回初始代碼
   */
  _resetCurrentCode() {
    if (!this.currentLesson) return;
    if (confirm('確定要將編輯器重置為本關卡的初始代碼嗎？目前的修改將會消失。')) {
      soundManager.playClick();
      this.dom.codeEditor.value = this.currentLesson.starterCode;
      this.currentErrorLine = null;
      this._updateLineNumbers();
      this._saveCurrentCodeDraft();
    }
  }

  /**
   * 執行使用者程式碼
   */
  async runUserCode() {
    const code = this.dom.codeEditor.value;
    this._switchConsoleTab('stdout');
    this.dom.consoleOutput.innerHTML = '<span class="system-msg">⏳ 正在執行程式碼...</span>\n';

    const result = await pyRunner.runCode(code, {
      onStdout: (out) => {
        this.dom.consoleOutput.innerHTML += `<span class="stdout-msg">${this._escapeHtml(out)}</span>`;
      },
      onStderr: (err) => {
        this.dom.consoleOutput.innerHTML += `<span class="error-msg">${this._escapeHtml(err)}</span>`;
      }
    });

    if (result.success) {
      this.currentErrorLine = null;
      this._updateLineNumbers();
      if (!result.stdout && !result.stderr) {
        this.dom.consoleOutput.innerHTML += '<span class="system-msg">[執行完成，程式碼無文字輸出]</span>\n';
      }
    } else {
      if (result.errorInfo && result.errorInfo.line) {
        this.currentErrorLine = result.errorInfo.line;
        this._updateLineNumbers(result.errorInfo.line);
      }
    }
  }

  /**
   * 送出挑戰驗證（包含核心錯誤診斷與出錯行高亮指示）
   */
  async verifyCurrentMission() {
    if (!this.currentLesson || !this.currentLesson.testScript) {
      alert('當前關卡未設定驗證條件或處於自由沙盒中！');
      return;
    }

    const code = this.dom.codeEditor.value;
    this._switchConsoleTab('test');
    this.dom.testResultsList.innerHTML = '<div class="test-empty-state">🧪 正在運行智慧測試比對與代碼語法診斷...</div>';

    const outcome = await pyRunner.runChallengeValidation(code, this.currentLesson.testScript);

    let diagnosisHtml = '';

    if (!outcome.passed && outcome.errorInfo) {
      const err = outcome.errorInfo;
      
      // 標註編輯器行號
      if (err.line) {
        this.currentErrorLine = err.line;
        this._updateLineNumbers(err.line);
      } else {
        this.currentErrorLine = null;
        this._updateLineNumbers();
      }

      // 構建代碼片段高亮
      let codeSnippetHtml = '';
      if (err.codeContext) {
        const rows = err.codeContext.split('\n').map(row => {
          const isErrorRow = row.startsWith('>');
          return `<span class="${isErrorRow ? 'error-row' : ''}">${this._escapeHtml(row)}</span>`;
        }).join('\n');
        codeSnippetHtml = `<div class="code-snippet-preview"><pre style="margin:0;">${rows}</pre></div>`;
      }

      // 構建預期 vs 實際比較框
      let comparisonHtml = '';
      if (err.expected !== undefined || err.actual !== undefined) {
        comparisonHtml = `
          <div class="comparison-grid">
            <div class="comparison-card actual">
              <div class="comparison-label"><span>🔴</span> 你的程式實際輸出 / 變數值：</div>
              <div class="comparison-val">${this._escapeHtml(err.actual || '(無輸出或未定義)')}</div>
            </div>
            <div class="comparison-card expected">
              <div class="comparison-label"><span>🟢</span> 關卡任務目標預期要求：</div>
              <div class="comparison-val">${this._escapeHtml(err.expected || '需符合特定規格')}</div>
            </div>
          </div>
        `;
      }

      diagnosisHtml = `
        <div class="diagnosis-container">
          <div class="diagnosis-header">
            <div class="diagnosis-title">
              <span>🔍</span>
              <span>${outcome.hasExecutionError ? '【程式執行中斷】具體出錯位置如下' : '【驗證未通過】發現代碼規格不符'}</span>
            </div>
            ${err.line ? `<span class="diagnosis-line-badge">📍 錯誤定位：第 ${err.line} 行</span>` : ''}
          </div>

          ${codeSnippetHtml}

          ${comparisonHtml}

          <div class="fix-tip-box">
            <strong>💡【錯誤分析與修復指引】：</strong><br>
            ${this._escapeHtml(err.hint || err.message || '請仔細檢查上方程式碼與變數規格。')}
          </div>
        </div>
      `;
    } else {
      this.currentErrorLine = null;
      this._updateLineNumbers();
    }

    // 渲染測試清單
    const testsHtml = outcome.results.map(r => `
      <div class="test-item ${r.passed ? 'passed' : 'failed'}">
        <div class="test-item-header">
          <span>${r.passed ? '✅ 通過測試' : '❌ 未通過'}：${r.testName}</span>
          ${r.line && !r.passed ? `<span style="font-size:0.75rem; color:#fb7185;">(相關代碼在第 ${r.line} 行)</span>` : ''}
        </div>
        <div class="test-item-detail">${this._escapeHtml(r.message)}</div>
      </div>
    `).join('');

    this.dom.testResultsList.innerHTML = diagnosisHtml + testsHtml;

    // 更新測試計數標籤
    const passCount = outcome.results.filter(r => r.passed).length;
    this.dom.testBadge.textContent = `${passCount}/${outcome.results.length}`;
    this.dom.testBadge.classList.remove('hidden');

    if (outcome.passed) {
      // 挑戰成功！
      soundManager.playSuccess();
      soundManager.playLevelUp();

      // 慶祝彩帶
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      // 標記完成
      this.completedLessons.add(this.currentLesson.id);
      localStorage.setItem('py_quest_completed', JSON.stringify([...this.completedLessons]));
      
      this._updateOverallProgress();
      this._renderChaptersSidebar();

      // 更新本頁狀態標記
      this.dom.missionStatusBadge.textContent = '已完成 ✓';
      this.dom.missionStatusBadge.classList.add('completed');

      // 彈出過關歡慶視窗
      this.dom.victoryLessonName.textContent = this.currentLesson.title;
      this.dom.victorySkillTag.textContent = this.currentLesson.mission.goal;
      this.dom.victoryModal.classList.remove('hidden');
    } else {
      soundManager.playError();
    }
  }

  /**
   * 前往下一關
   */
  loadNextLesson() {
    let allLessons = [];
    CHAPTERS_DATA.forEach(ch => {
      allLessons.push(...ch.lessons);
    });

    const currIdx = allLessons.findIndex(l => l.id === this.currentLesson.id);
    if (currIdx !== -1 && currIdx < allLessons.length - 1) {
      const nextLesson = allLessons[currIdx + 1];
      this.loadLesson(nextLesson.id);
    } else {
      alert('🏆 太神啦！你已經通關完全部 8 大章節的所有挑戰！你已經正式具備 Python 獨立撰寫能力！');
    }
  }

  /**
   * 更新進度條與成就徽章
   */
  _updateOverallProgress() {
    let totalLessonsCount = 0;
    CHAPTERS_DATA.forEach(ch => {
      totalLessonsCount += ch.lessons.length;
    });

    const completedCount = this.completedLessons.size;
    const percent = Math.round((completedCount / totalLessonsCount) * 100);

    this.dom.progressText.textContent = `進度：${completedCount} / ${totalLessonsCount} 關卡 (${percent}%)`;
    this.dom.badgeCount.textContent = `🏆 ${completedCount} 徽章`;
    this.dom.progressFill.style.width = `${percent}%`;
  }

  /**
   * 更新引擎狀態
   */
  _updateEngineStatus(status, message) {
    const indicator = this.dom.engineStatus.querySelector('.status-indicator');
    this.dom.statusText.textContent = message;

    if (status === 'loading') {
      indicator.className = 'status-indicator loading';
    } else if (status === 'ready') {
      indicator.className = 'status-indicator';
      this.dom.statusText.textContent = '⚡ Python 3.12 (Pyodide WebAssembly) 準備就緒';
    } else if (status === 'error') {
      indicator.className = 'status-indicator error';
    }
  }

  /**
   * 切換自由沙盒模式
   */
  _toggleSandboxMode(enabled) {
    soundManager.playClick();
    this.isSandboxMode = enabled;

    if (enabled) {
      this.dom.sandboxBanner.classList.remove('hidden');
      this.dom.bcChapter.textContent = '自由實驗區';
      this.dom.bcLesson.textContent = '自由沙盒 Playground';
      this.dom.lessonTitle.textContent = '🧪 自由沙盒：無拘無束的 Python 實驗室';
      
      this.dom.theoryContent.innerHTML = `
        <h2>歡迎來到無拘無束的自由沙盒！</h2>
        <p>在這裡沒有關卡目標、沒有規則束縛，你可以盡情發揮想像力，嘗試任何你想寫的 Python 程式碼。</p>
        <div class="callout tip">
          <div class="callout-title">💡 嘗試點新東西？</div>
          <p>試試看 import math 計算圓周率，或是自己寫個九九乘法表？寫完隨時點擊「執行程式碼 (Ctrl+Enter)」看看結果吧！</p>
        </div>
      `;

      this.dom.codeEditor.value = `# 自由沙盒模式：在此隨意實驗 Python 代碼！
import math

print("=== 自由沙盒實驗 ===")
print("圓周率 pi =", math.pi)
for i in range(1, 4):
    print(f"火箭點火準備：第 {i} 號噴嘴正常！")
`;
      this.dom.fileName.textContent = 'sandbox.py';
      this.currentErrorLine = null;
      this._updateLineNumbers();
      this._switchLessonTab('tab-theory');
    } else {
      this.dom.sandboxBanner.classList.add('hidden');
      const lastId = localStorage.getItem('py_quest_last_lesson') || 'ch1-1';
      this.loadLesson(lastId);
    }
  }

  /**
   * 渲染語法速查手冊
   */
  _renderCheatSheet() {
    this.dom.cheatsheetContent.innerHTML = CHEAT_SHEET_DATA.map(item => `
      <div class="cheat-card">
        <h3><span>⚡</span> ${item.title}</h3>
        <p style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 6px;">分類：${item.category}</p>
        <pre>${this._escapeHtml(item.code)}</pre>
      </div>
    `).join('');
  }

  /**
   * 更新行號，可高亮指定的出錯行
   */
  _updateLineNumbers(errorLine = null) {
    const lines = this.dom.codeEditor.value.split('\n').length;
    let numbersHtml = '';
    for (let i = 1; i <= lines; i++) {
      if (errorLine !== null && i === errorLine) {
        numbersHtml += `<span class="error-line-num" title="第 ${i} 行代碼有誤">${i}🚨</span>`;
      } else {
        numbersHtml += `<span>${i}</span>\n`;
      }
    }
    this.dom.lineNumbers.innerHTML = numbersHtml;
  }

  /**
   * 自動儲存編輯中代碼至 localStorage
   */
  _saveCurrentCodeDraft() {
    if (this.currentLesson && !this.isSandboxMode) {
      this.userCodes[this.currentLesson.id] = this.dom.codeEditor.value;
      localStorage.setItem('py_quest_codes', JSON.stringify(this.userCodes));
    }
  }

  _escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// 頁面加載後啟動應用
window.addEventListener('DOMContentLoaded', () => {
  const app = new PythonQuestApp();
  app.init();
  window.pythonQuestApp = app;
});
