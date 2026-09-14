# 🐍 Python 奇幻冒險 Quest (Python Interactive Tutor)

> 專為想從 0 開始學習 Python 的新手打造的沉浸式、高互動性 Web 學習平台與闖關教材。

![Python Interactive Tutor](https://img.shields.io/badge/Python-3.12%20(Pyodide%20Wasm)-blue?style=for-the-badge&logo=python)
![Zero Friction](https://img.shields.io/badge/Setup-Zero%20Installation-emerald?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 🌟 專案亮點與核心特色

1. **瀏覽器即時執行 (Zero Setup Friction)**：
   - 核心採用 **Pyodide WebAssembly (Python 3.12)**，學員完全不用在本機安裝 Python 或配置環境變數，打開瀏覽器就能直接寫程式、即時運行！
2. **生動生活化教學 (Zero-to-One Friendly Curriculum)**：
   - 針對完全零基礎新手設計，以比喻（貼標籤的置物盒、命運分岔路、自動化工廠、主廚與服務生）取代枯燥語法。
   - 包含 8 大核心章節、漸進式 17+ 關卡，循序漸進從輸出、變數、運算子、條件判斷、迴圈、串列/字典、自訂函式，一路引導到親手實作「RPG 地下城決戰文字小遊戲」！
3. **智慧單元測試與即時反饋 (Automated Validation & Hint System)**：
   - 點擊「🚀 送出驗證挑戰」即可自動執行單元測試，檢查輸出與變數。
   - 三段式漸進提示 (Hints) 與完整解答 (Solution)，彻底消滅卡關挫折感。
4. **遊戲化體驗 (Gamification)**：
   - 學習進度條、星級成就徽章、過關音效 (純 Web Audio API 合成) 與彩帶紙花特效。
   - 進度與寫過的程式碼自動記錄於瀏覽器 `localStorage`，重新整理不丟失。
5. **自由實驗沙盒 (Sandbox Mode) & 語法小抄 (Cheat Sheet)**：
   - 提供無拘無束的自由寫扣沙盒，隨時驗證自己的想法。
   - 內建精美的常用語法卡片手冊，新手隨時可查詢。

---

## 🚀 如何快速啟動與遊玩？

### 方式 1：使用 Python 內建伺服器（推薦）
在終端機中切換至本專案目錄並啟動伺服器：
```bash
cd "C:\Users\sean_\.gemini\antigravity-ide\scratch\python-interactive-tutor"
python -m http.server 8080
```
接著在瀏覽器打開：[http://localhost:8080](http://localhost:8080) 即可開始冒險！

### 方式 2：直接雙擊 `index.html`
直接以 Chrome、Edge、Safari 或 Firefox 等現代瀏覽器開啟 `index.html` 即可。

---

## 📚 課綱架構 (8 大章節)

- **第 1 章：初見 Python 與第一個程式**（`print()`、多重輸出、ASCII 小貓畫）
- **第 2 章：記憶的魔法盒子 —— 變數與資料型態**（變數賦值、int/float/str/bool、型態轉換）
- **第 3 章：電腦的算術能力 —— 運算子與字串組合**（整數除法 `//`、取餘數 `%`、次方 `**`、現代 f-string）
- **第 4 章：命運的分岔路 —— 條件判斷**（比較運算子、縮排精神、if / elif / else 手搖飲推薦機）
- **第 5 章：不知疲倦的重複機器 —— 迴圈**（`for` 與 `range()` 倒數、`while` 存錢筒、break/continue）
- **第 6 章：百寶袋與通訊錄 —— 串列與字典**（List 索引與 append、Dictionary 鍵值對查表、毛小孩檔案）
- **第 7 章：打造自己的專屬工具 —— 函式**（`def` 工具箱、`return` 上菜 vs `print` 大喊、BMI 指數計算）
- **第 8 章：新手畢業專案 —— 文字地下城 RPG 冒險遊戲**（血量計算、攻擊函式、戰鬥迴圈與獲勝結局）

---

## 🛠️ 如何擴充新關卡或題目？

所有課程教材、任務驗證腳本與測驗題均模組化維護在 `js/curriculum.js` 中。
只需在對應的章節 `lessons` 陣列中新增一個物件：

```javascript
{
  id: "chX-Y",
  title: "關卡名稱",
  starterCode: "# 初始骨架代碼",
  theory: "<h2>觀念說明 HTML</h2>",
  mission: {
    goal: "任務簡述",
    description: "故事背景與詳細任務指示",
    requirements: ["要求 1", "要求 2"]
  },
  testScript: `
register_test("測試名稱", 檢查條件, "未通過時的友善提示")
`,
  hints: ["提示一", "提示二"],
  solution: "# 參考解答",
  quiz: {
    question: "隨堂小測驗題目？",
    options: ["選項A", "選項B", "選項C", "選項D"],
    correctIndex: 0,
    explanation: "解析說明"
  }
}
```
存檔後重新整理網頁即可自動載入！
