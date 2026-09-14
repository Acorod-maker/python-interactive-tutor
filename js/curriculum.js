/**
 * curriculum.js
 * Python 奇幻冒險：完整 8 大章節、24 關卡教材與關卡測試資料庫
 * 每個測試點均包含精準的預期值、目標變數定位與深度診斷
 */

export const CHEAT_SHEET_DATA = [
  {
    category: "輸出與輸入 (I/O)",
    title: "print() 與 f-string",
    code: `# 基本輸出
print("哈囉世界")

# 多個變數輸出
name = "小明"
age = 18
print("我是", name, "今年", age, "歲")

# 推薦使用 f-string
print(f"我是 {name}，今年 {age} 歲！")`
  },
  {
    category: "變數與型態 (Variables)",
    title: "常見資料型態與轉換",
    code: `# 4 種基本型態
x = 10         # int 整數
pi = 3.14      # float 浮點數
msg = "Python" # str 字串
is_fun = True  # bool 布林值 (True/False)

# 型態轉換
int("123")     # 轉為整數 123
float("3.14")  # 轉為浮點數 3.14
str(100)       # 轉為字串 "100"
type(x)        # 檢查型態 <class 'int'>`
  },
  {
    category: "運算子 (Operators)",
    title: "常用算術與比較符號",
    code: `# 算術運算
10 + 3   # 13 加
10 - 3   # 7 減
10 * 3   # 30 乘
10 / 3   # 3.333... 除法
10 // 3  # 3 整數除法 (只留商數)
10 % 3   # 1 取餘數
2 ** 3   # 8 次方 (2的3次方)

# 比較 (結果為 True 或 False)
x == y   # 等於
x != y   # 不等於
x > y, x < y, x >= y, x <= y`
  },
  {
    category: "流程控制 (Conditionals)",
    title: "if / elif / else",
    code: `score = 85

if score >= 90:
    print("太神啦！A+")
elif score >= 60:
    print("及格囉！繼續加油")
else:
    print("下次再努力！")

# 邏輯運算: and (且), or (或), not (非)
if score >= 60 and score <= 100:
    print("有效成績")`
  },
  {
    category: "迴圈 (Loops)",
    title: "for 與 while 迴圈",
    code: `# for 迴圈搭配 range
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):    # 1 到 5
    print(i)

# while 迴圈
count = 3
while count > 0:
    print(f"倒數: {count}")
    count -= 1

# break (中斷跳出), continue (跳過本輪)`
  },
  {
    category: "資料結構 (Data Structures)",
    title: "串列 (List) 與 字典 (Dict)",
    code: `# 串列 List (有序、可變)
fruits = ["蘋果", "香蕉", "橘子"]
fruits.append("芒果")    # 加入尾端
print(fruits[0])        # 第一項: "蘋果"
print(len(fruits))      # 長度

# 字典 Dictionary (Key-Value 鍵值對)
hero = {
    "name": "勇者亞瑟",
    "hp": 100,
    "level": 5
}
print(hero["name"])     # 存取值
hero["hp"] = 120        # 修改值
hero["mp"] = 50         # 新增鍵值`
  },
  {
    category: "函式 (Functions)",
    title: "自訂函式 def 與 return",
    code: `# 定義函式
def calculate_area(width, height):
    """計算矩形面積並回傳"""
    area = width * height
    return area

# 呼叫函式
result = calculate_area(10, 5)
print(f"面積為: {result}") # 50`
  }
];

export const CHAPTERS_DATA = [
  {
    id: "ch1",
    title: "第 1 章：初見 Python 與第一個程式",
    icon: "🌱",
    description: "開啟程式大門，認識 Python 的基本運作方式與輸出命令。",
    lessons: [
      {
        id: "ch1-1",
        title: "向世界打招呼：print() 函式",
        starterCode: `# 你的第一個 Python 程式！
# 試著修改下方引號內的文字，向世界打招呼吧！
print("Hello, Python!")
`,
        theory: `
<h2>電腦是如何聽懂我們說話的？</h2>
<p>歡迎來到 Python 的奇幻冒險！寫程式其實就像是在<strong>指揮一位動作極快、但完全不懂人類默契的小機器人</strong>。只要我們按照規定的語法下達指令，它就會分毫不差地替我們執行！</p>

<div class="callout story">
  <div class="callout-title">💡 生活小比喻：擴音喇叭</div>
  <p>在 Python 中，<code>print()</code> 就像是一個強大的「擴音喇叭」。括號裡放進你想說的文字，電腦就會把它如實投射並印在下方的黑色終端機螢幕上！</p>
</div>

<h3>📝 重要語法規則：引號成對</h3>
<p>當你想輸出一段文字（在程式世界稱為「<strong>字串 String</strong>」）時，必須用<strong>成對的半形引號</strong>包起來，例如 <code>"Hello"</code> 或 <code>'Python'</code> 都可以。</p>

<div class="code-block-wrapper">
  <div class="code-block-header"><span>範例程式碼</span></div>
  <pre>print("早安，世界！")
print("歡迎來到 Python 新手村")</pre>
</div>

<div class="callout warning">
  <div class="callout-title">⚠️ 新手最常踩的地雷！</div>
  <p>記得一定要使用<strong>英文半形引號 <code>""</code></strong>，如果打成了全形引號 <code>“”</code> 或中文引號，小機器人會看不懂並噴出 <code>SyntaxError</code>（語法錯誤）喔！</p>
</div>
`,
        mission: {
          goal: "印出專屬的自我介紹招呼語",
          description: "傳說中每位冒險者在踏出村莊前，都必須向村民大聲自我介紹。請使用 print() 在終端機印出：`我是冒險者，向世界問好！`",
          requirements: [
            "使用 `print()` 函式",
            "輸出文字中必須精準包含：`我是冒險者，向世界問好！`"
          ]
        },
        testScript: `
# 測試學員是否正確使用 print 輸出文字
target_text = "我是冒險者，向世界問好！"
actual_out = _captured_stdout.strip() if _captured_stdout.strip() else "(終端機無任何輸出)"
register_test(
    "印出冒險者招呼語",
    target_text in _captured_stdout,
    "終端機輸出未包含 '我是冒險者，向世界問好！'，請確認引號內的文字與標點符號是否完全吻合。",
    expected=f"包含「{target_text}」",
    actual=actual_out
)
`,
        hints: [
          "記得使用 print(\"...\") 的語法。",
          "請檢查文字是不是「我是冒險者，向世界問好！」包括最後的中文驚嘆號！",
          "確認引號是否為英文半形雙引號或單引號。"
        ],
        solution: `# 參考解答
print("我是冒險者，向世界問好！")`,
        quiz: {
          question: "在 Python 中，想要印出一段文字在螢幕上，應該使用哪一個函式？",
          options: [
            "echo()",
            "print()",
            "write()",
            "display()"
          ],
          correctIndex: 1,
          explanation: "太棒了！Python 中最常用的基本輸出函式就是 print()。"
        }
      },
      {
        id: "ch1-2",
        title: "多重輸出與文字拼裝",
        starterCode: `# 在 print 裡面用逗號 , 隔開多個想要印出的內容
name = "小艾"
print("冒險者：", name)
`,
        theory: `
<h2>一次說好多句話：逗號的魔法</h2>
<p>有時候我們想在同一行印出好幾項資料，例如名牌、血量或是分數。在 <code>print()</code> 裡面，你可以用<strong>逗號 <code>,</code></strong> 隔開多個項目，Python 會自動貼心地在它們之間空一格！</p>

<div class="code-block-wrapper">
  <div class="code-block-header"><span>多個參數示範</span></div>
  <pre>print("等級：", 1, "經驗值：", 100)
# 終端機會印出：等級： 1 經驗值： 100</pre>
</div>

<div class="callout tip">
  <div class="callout-title">💡 數字不用加引號！</div>
  <p>在 Python 中，純數字（如 <code>1</code>, <code>100</code>）代表數值，<strong>不需要</strong>用雙引號包起來。只有純文字才需要加引號喔！</p>
</div>
`,
        mission: {
          goal: "印出完整的角色名牌狀態",
          description: "請在程式碼中使用一次 print()，用逗號連接文字與數字，印出：`職業： 魔法師 武器： 法杖 攻擊力： 50`（注意冒號後有空白）",
          requirements: [
            "使用 `print()` 函式並用逗號分隔各項內容",
            "輸出包含 `職業： 魔法師 武器： 法杖 攻擊力： 50`"
          ]
        },
        testScript: `
actual_out = _captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)"
is_ok = "職業： 魔法師" in _captured_stdout and "攻擊力： 50" in _captured_stdout
register_test(
    "印出完整角色狀態",
    is_ok,
    "請確認輸出是否依序包含職業、武器與攻擊力 50！",
    expected="職業： 魔法師 武器： 法杖 攻擊力： 50",
    actual=actual_out
)
`,
        hints: [
          "可以寫成 print(\"職業：\", \"魔法師\", \"武器：\", \"法杖\", \"攻擊力：\", 50)",
          "逗號會在每項印出結果中間自動產生一個半形空格。"
        ],
        solution: `print("職業：", "魔法師", "武器：", "法杖", "攻擊力：", 50)`,
        quiz: {
          question: "當我們執行 print(\"A\", \"B\", \"C\") 時，終端機會顯示什麼？",
          options: [
            "ABC (全部擠在一起)",
            "A B C (各項之間自動空一格)",
            "A, B, C (連逗號一起印出來)",
            "出錯報錯"
          ],
          correctIndex: 1,
          explanation: "答對了！print() 函式中以逗號隔開的參數，在輸出時預設會用單一空白鍵分開。"
        }
      },
      {
        id: "ch1-3",
        title: "文字藝術家：換行與多行字串",
        starterCode: `# 試著印出一個三行的小金字塔！
print("  *  ")
print(" *** ")
print("*****")
`,
        theory: `
<h2>如何讓文字換行？</h2>
<p>如果想讓印出的字跳到下一行，有兩種超好用的方法：</p>

<h3>方法 1：特殊字元 <code>\\n</code> (換行符號)</h3>
<p><code>\\n</code> 是隱藏的「按下 Enter 鍵」暗號：</p>
<div class="code-block-wrapper">
  <pre>print("第一行\\n第二行\\n第三行")</pre>
</div>

<h3>方法 2：三引號 <code>"""</code> 多行字串</h3>
<p>如果有很多行文字或是想要畫 ASCII 字符圖案，使用三個雙引號包起來最過癮！換行格式會原汁原味保留：</p>
<div class="code-block-wrapper">
  <pre>print("""
 /\\_/\\  
( o.o ) 
 > ^ <
""")</pre>
</div>
`,
        mission: {
          goal: "畫出一隻可愛的終端機小貓",
          description: "使用三個雙引號 `\"\"\"` 或連續 print()，在終端機畫出有耳朵的 ASCII 藝術小貓臉：\n /\\_/\\ \n( o.o ) \n > ^ <",
          requirements: [
            "輸出必須包含小貓臉的圖樣特徵 `( o.o )` 與 `> ^ <`"
          ]
        },
        testScript: `
actual_out = _captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)"
is_cat = "( o.o )" in _captured_stdout and "> ^ <" in _captured_stdout
register_test(
    "終端機小貓藝術畫",
    is_cat,
    "小貓臉好像少了一隻眼睛或鬍鬚，請確認是否有 '( o.o )' 與 '> ^ <'！",
    expected="包含 '( o.o )' 與 '> ^ <'",
    actual=actual_out
)
`,
        hints: [
          "可以複製題目裡的三行小貓臉，放進 print(\"\"\" ... \"\"\") 之中。",
          "記得斜線符號不要漏掉囉！"
        ],
        solution: `print("""
 /\\_/\\  
( o.o ) 
 > ^ <
""")`,
        quiz: {
          question: "在 Python 中，代表「換行」的跳脫字元是哪一個？",
          options: [
            "\\t",
            "\\n",
            "/n",
            "\\enter"
          ],
          correctIndex: 1,
          explanation: "沒錯！\\n (newline) 就是最經典的換行符號。"
        }
      }
    ]
  },
  {
    id: "ch2",
    title: "第 2 章：記憶的魔法盒子 —— 變數與資料型態",
    icon: "📦",
    description: "學習如何將資料裝進具名的變數置物盒，掌握數字、文字與布林家族。",
    lessons: [
      {
        id: "ch2-1",
        title: "變數就像貼有標籤的置物盒",
        starterCode: `# 創建名為 player_name 的變數，並放入你的名字
player_name = "亞瑟"
player_hp = 100

print("角色名稱：", player_name)
print("生命值：", player_hp)
`,
        theory: `
<h2>為什麼需要變數？</h2>
<p>在玩遊戲時，角色的血量隨時在扣、金幣隨時在加。如果電腦記不住這些數值，遊戲就無法運作了！</p>

<div class="callout story">
  <div class="callout-title">📦 生活小比喻：貼標籤的置物盒</div>
  <p>想像<strong>變數 (Variable)</strong> 是一個置物盒，盒子外面貼上一張名字標籤（例如 <code>player_hp</code>）。等號 <code>=</code> 則是「放進去」的動作（在程式裡稱為<strong>賦值 Assignment</strong>）。</p>
</div>

<div class="code-block-wrapper">
  <pre>gold = 50       # 拿出名為 gold 的盒子，把 50 放進去
gold = gold + 20 # 拿出裡面的 50，加 20 變成 70，再放回盒子！
print(gold)     # 印出 70</pre>
</div>

<div class="callout warning">
  <div class="callout-title">⚠️ 變數命名規矩</div>
  <ul>
    <li>只能包含英文字母、數字和底線 <code>_</code></li>
    <li>開頭<strong>不能</strong>是數字（例如 <code>1player</code> 是違法的，但 <code>player1</code> 可以）</li>
    <li>英文大小寫是有差別的！(<code>HP</code> 和 <code>hp</code> 是兩個不同的盒子)</li>
  </ul>
</div>
`,
        mission: {
          goal: "建立勇者出發時的初始狀態變數",
          description: "請宣告三個變數：\n1. `hero_name` 賦值為文字 `\"艾利斯\"`\n2. `hero_level` 賦值為數字 `1`\n3. `hero_coins` 賦值為數字 `500`\n最後使用 print() 印出這三個變數。",
          requirements: [
            "定義變數 `hero_name`、`hero_level`、`hero_coins`",
            "三個變數的值分別為 '艾利斯'、1、500",
            "呼叫 `print()` 輸出它們"
          ]
        },
        testScript: `
register_test("hero_name 宣告與賦值", "hero_name" in dir() and hero_name == "艾利斯", "請建立 hero_name = '艾利斯'，注意引號與名稱拼法", expected="'艾利斯'", target_var="hero_name")
register_test("hero_level 宣告與賦值", "hero_level" in dir() and hero_level == 1, "請建立 hero_level = 1，數字不需引號", expected=1, target_var="hero_level")
register_test("hero_coins 宣告與賦值", "hero_coins" in dir() and hero_coins == 500, "請建立 hero_coins = 500", expected=500, target_var="hero_coins")
register_test("print 終端機輸出", len(_captured_stdout.strip()) > 0, "別忘了使用 print() 印出這三個變數！", expected="有文字輸出", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "文字要加引號 hero_name = \"艾利斯\"",
          "數字不需要加引號 hero_level = 1, hero_coins = 500",
          "最後一行寫 print(hero_name, hero_level, hero_coins)"
        ],
        solution: `hero_name = "艾利斯"
hero_level = 1
hero_coins = 500

print("英雄：", hero_name, "等級：", hero_level, "金幣：", hero_coins)`,
        quiz: {
          question: "下列哪一個變數名稱在 Python 中是「不合法」會報錯的？",
          options: [
            "user_score",
            "_secret_key",
            "9lives_cat",
            "totalScore2"
          ],
          correctIndex: 2,
          explanation: "答對了！變數名稱開頭不可以是數字，9lives_cat 會導致 SyntaxError。"
        }
      },
      {
        id: "ch2-2",
        title: "四大基本資料型態家族",
        starterCode: `# 觀察以下 4 種不同型態的變數
item_name = "回復藥水"   # str (字串)
item_count = 5           # int (整數)
item_price = 19.9        # float (浮點數/小數)
is_in_stock = True       # bool (布林值：真或假)

print(type(item_name))
print(type(item_count))
print(type(item_price))
print(type(is_in_stock))
`,
        theory: `
<h2>資料也有不同的血統！</h2>
<p>在 Python 的世界裡，所有放在置物盒裡的東西都有其屬性，最常見的四大門派為：</p>

<table style="width:100%; border-collapse: collapse; margin: 16px 0; font-size: 0.88rem;">
  <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
    <th style="padding: 8px;">型態名稱</th>
    <th style="padding: 8px;">英文簡寫</th>
    <th style="padding: 8px;">範例</th>
    <th style="padding: 8px;">用途說明</th>
  </tr>
  <tr style="border-bottom: 1px solid var(--border-subtle);">
    <td style="padding: 8px;">整數</td>
    <td style="padding: 8px;"><code>int</code></td>
    <td style="padding: 8px;"><code>10, -5, 0</code></td>
    <td style="padding: 8px;">沒有小數點的計數或數量</td>
  </tr>
  <tr style="border-bottom: 1px solid var(--border-subtle);">
    <td style="padding: 8px;">浮點數</td>
    <td style="padding: 8px;"><code>float</code></td>
    <td style="padding: 8px;"><code>3.14, -0.5</code></td>
    <td style="padding: 8px;">含有小數點的精確數值</td>
  </tr>
  <tr style="border-bottom: 1px solid var(--border-subtle);">
    <td style="padding: 8px;">字串</td>
    <td style="padding: 8px;"><code>str</code></td>
    <td style="padding: 8px;"><code>"嗨", 'abc'</code></td>
    <td style="padding: 8px;">引號包起來的文字訊息</td>
  </tr>
  <tr style="border-bottom: 1px solid var(--border-subtle);">
    <td style="padding: 8px;">布林值</td>
    <td style="padding: 8px;"><code>bool</code></td>
    <td style="padding: 8px;"><code>True, False</code></td>
    <td style="padding: 8px;">只有兩種狀態：對 (True) 或錯 (False)</td>
  </tr>
</table>

<div class="callout tip">
  <div class="callout-title">💡 照妖鏡：type() 函式</div>
  <p>當你不確定某個變數是什麼型態時，只要執行 <code>print(type(變數名))</code>，Python 就會告訴你答案！</p>
</div>
`,
        mission: {
          goal: "建立一把稀有傳奇武器的資料卡",
          description: "請宣告 4 個變數：\n1. `weapon_name`（文字）：`\"王者之劍\"`\n2. `attack_power`（整數）：`150`\n3. `critical_rate`（浮點數）：`0.25`\n4. `is_legendary`（布林值）：`True`",
          requirements: [
            "weapon_name 為 str，值為 '王者之劍'",
            "attack_power 為 int，值為 150",
            "critical_rate 為 float，值為 0.25",
            "is_legendary 為 bool，值為 True (注意大寫 T)"
          ]
        },
        testScript: `
register_test("weapon_name 型態與數值", "weapon_name" in dir() and weapon_name == "王者之劍" and isinstance(weapon_name, str), "weapon_name 應為字串 '王者之劍'", expected="'王者之劍' (str)", target_var="weapon_name")
register_test("attack_power 型態與數值", "attack_power" in dir() and attack_power == 150 and isinstance(attack_power, int), "attack_power 應為整數 150", expected="150 (int)", target_var="attack_power")
register_test("critical_rate 型態與數值", "critical_rate" in dir() and abs(critical_rate - 0.25) < 1e-5 and isinstance(critical_rate, float), "critical_rate 應為浮點數 0.25", expected="0.25 (float)", target_var="critical_rate")
register_test("is_legendary 型態與數值", "is_legendary" in dir() and is_legendary is True, "is_legendary 應為 True（注意大寫 T）", expected="True (bool)", target_var="is_legendary")
`,
        hints: [
          "True 的 T 必須是大寫！如果是 true 會找不到變數喔。",
          "小數點直接寫 0.25，不加引號。"
        ],
        solution: `weapon_name = "王者之劍"
attack_power = 150
critical_rate = 0.25
is_legendary = True

print(weapon_name, attack_power, critical_rate, is_legendary)`,
        quiz: {
          question: "變數 x = \"100\"，請問 type(x) 得到的結果是什麼？",
          options: [
            "<class 'int'>",
            "<class 'str'>",
            "<class 'float'>",
            "<class 'number'>"
          ],
          correctIndex: 1,
          explanation: "答對了！只要外面被引號 \"\" 包起來，即使裡面寫的是數字，也是文字字串 (str) 喔！"
        }
      },
      {
        id: "ch2-3",
        title: "型態魔法棒：型態轉換",
        starterCode: `# 下方是一段有 Bug 的程式碼！試著執行看看會發生什麼事？
user_input_age = "20"
next_year_age = user_input_age + 1  # 這裡會報錯！
print("明年年齡：", next_year_age)
`,
        theory: `
<h2>為什麼「"20" + 1」會報錯？</h2>
<p>在現實中，你不能把一個「文字玩偶」和「真正的蘋果」相加。在 Python 中也是一樣，文字的 <code>"20"</code> 和整數的 <code>1</code> 不能直接做算術加法，否則會觸發 <code>TypeError</code>！</p>

<h3>型態轉換大法</h3>
<p>我們可以用型態函式進行強制變身：</p>
<div class="code-block-wrapper">
  <pre>age_str = "20"
age_num = int(age_str)       # 把文字 "20" 轉成真正的數字 20
print(age_num + 1)           # 得到 21！

score = 95
msg = "你的分數是：" + str(score) # 把數字 95 轉成文字 "95" 來拼接
print(msg)</pre>
</div>
`,
        mission: {
          goal: "修復年齡計算機並成功算出明年的年齡",
          description: "使用 `int()` 將 `user_input_age` 轉換成整數，並計算出 `next_year_age`（加上 1），最後印出結果！",
          requirements: [
            "使用 `int()` 函式將文字轉為整數",
            "`next_year_age` 的數值必須為 21",
            "順利執行且沒有 TypeError 錯誤"
          ]
        },
        testScript: `
register_test("計算正確的明年年齡", "next_year_age" in dir() and next_year_age == 21, "next_year_age 應該為整數 21！請確認是否用 int() 轉型後加 1", expected=21, target_var="next_year_age")
register_test("成功印出結果", "21" in _captured_stdout, "終端機輸出應該印出包含 21 的結果！", expected="包含 21", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "將第二行改成：next_year_age = int(user_input_age) + 1",
          "或者是先把 user_input_age = int(user_input_age)"
        ],
        solution: `user_input_age = "20"
next_year_age = int(user_input_age) + 1
print("明年年齡：", next_year_age)`,
        quiz: {
          question: "執行 str(50) + str(50) 的結果是什麼？",
          options: [
            "100",
            "\"5050\"",
            "5050",
            "報錯 TypeError"
          ],
          correctIndex: 1,
          explanation: "太聰明了！兩個字串用 + 相加是「文字黏接」，所以 \"50\" + \"50\" 會變成 \"5050\"！"
        }
      }
    ]
  },
  {
    id: "ch3",
    title: "第 3 章：電腦的算術能力 —— 運算子與字串組合",
    icon: "⚡",
    description: "掌握加減乘除、取餘數、整數除法，並學會全宇宙最強的 f-string 字串格式化！",
    lessons: [
      {
        id: "ch3-1",
        title: "不只是加減乘除：特殊算術運算子",
        starterCode: `# 探索 Python 的各種算數能力
cookies = 10
friends = 3

each_gets = cookies // friends  # 整數除法 (商數)
leftover = cookies % friends    # 取餘數 (剩下的餅乾)
power_magic = 2 ** 8            # 次方 (2的8次方)

print("每人分得：", each_gets)
print("剩下餅乾：", leftover)
print("魔法能量：", power_magic)
`,
        theory: `
<h2>Python 是全世界最棒的計算機！</h2>
<p>除了一般的加減乘除 (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>) 之外，Python 有三個非常厲害的神祕運算子：</p>

<h3>1. 整數除法 <code>//</code></h3>
<p>一般的除法 <code>/</code> 總是會得到小數（例如 <code>7 / 2 = 3.5</code>）。如果你只想知道可以<strong>整除幾次</strong>，請用雙斜線 <code>//</code>，它會自動無條件捨去小數點：<code>7 // 2 = 3</code>！</p>

<h3>2. 取餘數 <code>%</code> (Modulo)</h3>
<p>如果想知道<strong>除完剩下多少</strong>，就用百分比符號 <code>%</code>：<code>7 % 2 = 1</code>。這在判斷奇數、偶數，或是遊戲冷卻時間倒數時非常常用！</p>

<h3>3. 次方 <code>**</code></h3>
<p>連續打兩個星號代表乘方！例如 <code>2 ** 3</code> 就是 2 的 3 次方（2 × 2 × 2 = 8）。</p>
`,
        mission: {
          goal: "計算冒險隊伍的寶藏分配",
          description: "冒險隊伍找到了 `total_gold = 107` 枚金幣，由 `members = 4` 個人平分。\n請計算：\n1. `gold_per_person`：每人可以拿到多少枚整數金幣（使用 `//`）\n2. `remaining_gold`：剩下幾枚無法平分的金幣（使用 `%`）",
          requirements: [
            "計算 `gold_per_person`，值應為 26",
            "計算 `remaining_gold`，值應為 3"
          ]
        },
        testScript: `
register_test("每人金幣計算 (整數除法 //)", "gold_per_person" in dir() and gold_per_person == 26, "gold_per_person 應該是 107 // 4 = 26", expected=26, target_var="gold_per_person")
register_test("剩餘金幣計算 (取餘數 %)", "remaining_gold" in dir() and remaining_gold == 3, "remaining_gold 應該是 107 % 4 = 3", expected=3, target_var="remaining_gold")
`,
        hints: [
          "gold_per_person = total_gold // members",
          "remaining_gold = total_gold % members"
        ],
        solution: `total_gold = 107
members = 4

gold_per_person = total_gold // members
remaining_gold = total_gold % members

print("每人獲得：", gold_per_person)
print("剩餘金幣：", remaining_gold)`,
        quiz: {
          question: "請問 15 % 4 的計算結果是多少？",
          options: [
            "3.75",
            "3",
            "1",
            "0"
          ],
          correctIndex: 1,
          explanation: "答對了！15 除以 4 等於 3 餘 3，所以餘數是 3。"
        }
      },
      {
        id: "ch3-2",
        title: "現代字串組合神器：f-string",
        starterCode: `# 舊方法：一直用逗號或加號很累
name = "小艾"
gold = 150
print("玩家 " + name + " 目前擁有 " + str(gold) + " 枚金幣")

# 現代推薦：f-string！
# 只要在引號前加上 f，並在大括號 {} 內放變數或運算式！
print(f"玩家 {name} 目前擁有 {gold} 枚金幣！")
`,
        theory: `
<h2>為什麼全世界的 Python 工程師都愛 f-string？</h2>
<p>以前要把文字和數字拼在一起，得寫一堆 <code>+</code> 號還要手動呼叫 <code>str()</code>，非常容易眼花撩亂。Python 3.6 推出的 <strong>f-string (格式化字串字面值)</strong> 徹底拯救了大家！</p>

<div class="callout tip">
  <div class="callout-title">✨ f-string 的兩大口訣</div>
  <ol>
    <li>在字串的引號外面最前面加上字母 <code>f</code>（例如 <code>f"..."</code>）</li>
    <li>想放變數或計算的地方，用大括號 <code>{變數名稱}</code> 挖洞填入！</li>
  </ol>
</div>

<div class="code-block-wrapper">
  <pre>item = "魔法藥水"
price = 45
qty = 3
# 大括號裡面甚至可以直接做算術！
print(f"購買 {qty} 瓶 {item}，總共花費 {price * qty} 元。")</pre>
</div>
`,
        mission: {
          goal: "使用 f-string 產生一組客製化收據",
          description: "已知變數 `customer = \"莉莉\"`、`item = \"珍珠奶茶\"`、`price = 65`、`cup = 2`。\n請建立變數 `receipt`，並使用 **f-string** 組合出：\n`\"感謝 莉莉 購買 2 杯 珍珠奶茶，總計 130 元！\"`（其中 130 可以直接寫 `{price * cup}` 算出來）。",
          requirements: [
            "定義變數 customer, item, price, cup",
            "使用 f-string 賦值給 `receipt` 變數",
            "print(receipt) 輸出正確句子"
          ]
        },
        testScript: `
expected_str = "感謝 莉莉 購買 2 杯 珍珠奶茶，總計 130 元！"
register_test("receipt 變數格式與內容", "receipt" in dir() and receipt == expected_str, "收據內容文字與空格需完全一致！", expected=f"'{expected_str}'", target_var="receipt")
register_test("print 輸出收據", expected_str in _captured_stdout, "請使用 print(receipt) 輸出收據！", expected=f"包含 {expected_str}", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "寫法格式：receipt = f\"感謝 {customer} 購買 {cup} 杯 {item}，總計 {price * cup} 元！\"",
          "不要忘記字串最前面的英文小寫 f。"
        ],
        solution: `customer = "莉莉"
item = "珍珠奶茶"
price = 65
cup = 2

receipt = f"感謝 {customer} 購買 {cup} 杯 {item}，總計 {price * cup} 元！"
print(receipt)`,
        quiz: {
          question: "下列哪一個 f-string 的語法是完全正確的？",
          options: [
            "print(f\"你好，(name)！\")",
            "print(f\"你好，{name}！\")",
            "print(\"你好，{name}！\"f)",
            "print(f[你好，{name}！])"
          ],
          correctIndex: 1,
          explanation: "太棒了！引號前加 f，變數用大括號 {} 包裹正是標準的 f-string 寫法。"
        }
      }
    ]
  },
  {
    id: "ch4",
    title: "第 4 章：命運的分岔路 —— 條件判斷 (if / else)",
    icon: "🔀",
    description: "學會用比較與邏輯運算子做出決策，理解 Python 最迷人也最嚴謹的「縮排」靈魂。",
    lessons: [
      {
        id: "ch4-1",
        title: "判斷真偽：比較運算子與 if 判斷",
        starterCode: `# 檢查玩家血量狀態
hp = 25

if hp < 30:
    print("⚠️ 警告：血量過低，請儘速喝水補血！")

print("探索繼續進行中...")
`,
        theory: `
<h2>程式也有自主思考能力！</h2>
<p>如果程式只能從頭到尾死板板地一行行執行，那就不可能做出能根據玩家選擇產生不同反應的遊戲了。<strong>條件判斷 (if statement)</strong> 就像是路口的紅綠燈，決定要走哪一條路！</p>

<h3>6 大比較審判官</h3>
<ul>
  <li><code>==</code> 等於（注意是兩個等號！一個等號是放東西賦值）</li>
  <li><code>!=</code> 不等於</li>
  <li><code>></code> 大於、<code><</code> 小於</li>
  <li><code>>=</code> 大於等於、<code><=</code> 小於等於</li>
</ul>

<div class="callout story">
  <div class="callout-title">⚠️ Python 的靈魂：縮排 (Indentation)</div>
  <p>在其他程式語言（如 C/Java/JS），常常用大括號 <code>{}</code> 來包住要執行的範圍。但在 Python 中，完全依靠<strong>縮排（通常是 4 個空格）</strong>來表達「誰屬於誰的內部」！</p>
</div>

<div class="code-block-wrapper">
  <pre>if 條件:
    # 這裡有 4 個空格的縮排！
    # 只有當條件為 True 時，這裡才會被執行
print("這行沒有縮排，不管條件如何都會被執行")</pre>
</div>
`,
        mission: {
          goal: "設計一個體溫發燒警示系統",
          description: "給定體溫變數 `temperature = 38.5`。\n寫一個 `if` 條件判斷，若 `temperature >= 37.5`，則印出：`\"體溫過高，請前往發燒篩檢站！\"`",
          requirements: [
            "定義變數 `temperature = 38.5`",
            "當 temperature >= 37.5 時觸發印出警示文字",
            "終端機必須印出 `體溫過高，請前往發燒篩檢站！`"
          ]
        },
        testScript: `
expected_alert = "體溫過高，請前往發燒篩檢站！"
register_test("temperature 變數宣告", "temperature" in dir(), "請宣告 temperature 變數", expected=38.5, target_var="temperature")
register_test("if 條件觸發警示輸出", expected_alert in _captured_stdout, "未偵測到發燒警示輸出！請確認 if 條件、冒號與縮排是否正確。", expected=expected_alert, actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "if temperature >= 37.5: 記得冒號！",
          "下一行要按 Tab 或 4 個空白鍵縮排。"
        ],
        solution: `temperature = 38.5

if temperature >= 37.5:
    print("體溫過高，請前往發燒篩檢站！")`,
        quiz: {
          question: "在 Python 中，判斷兩者「是否相等」要用什麼符號？",
          options: [
            "=",
            "==",
            "===",
            "equals"
          ],
          correctIndex: 1,
          explanation: "完全正確！一個等號 = 是賦值（把右邊塞給左邊），兩個等號 == 才是比較是否相等。"
        }
      },
      {
        id: "ch4-2",
        title: "多重抉擇：if / elif / else 階梯",
        starterCode: `# 考試成績分級
score = 82

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

print(f"你的評級為：{grade}")
`,
        theory: `
<h2>不是黑就是白？不，世界有很多種可能！</h2>
<p>如果條件不只一種情況，我們可以使用 <code>elif</code>（就是 else if 的合體縮寫）和 <code>else</code>（其餘所有情況）：</p>

<div class="code-block-wrapper">
  <pre>if 第一個條件:
    # 達成第一個條件時執行
elif 第二個條件:
    # 第一個沒達成，但達成第二個條件時執行
else:
    # 以上全部都沒達成時執行（安全墊）</pre>
</div>

<div class="callout tip">
  <div class="callout-title">💡 優先順序由上而下！</div>
  <p>Python 會由上而下依序檢查，<strong>只要有一個條件滿足並執行了，後面的 elif 和 else 就會直接跳過</strong>，不會重複執行喔！</p>
</div>
`,
        mission: {
          goal: "打造手搖飲推薦機",
          description: "顧客給定今日氣溫變數 `weather_temp = 32`：\n1. 若 `weather_temp >= 30`，設定變數 `drink = \"冰鎮西瓜汁\"`\n2. 若 `weather_temp >= 20`（介於 20 到 29 度），設定變數 `drink = \"微冰四季春\"`\n3. 其餘情況（小於 20 度），設定變數 `drink = \"熱薑母黑糖茶\"`\n最後印出 `f\"今日推薦飲品：{drink}\"`。",
          requirements: [
            "使用 if / elif / else 架構",
            "當 weather_temp 為 32 時，drink 應為 '冰鎮西瓜汁'",
            "印出 `今日推薦飲品：冰鎮西瓜汁`"
          ]
        },
        testScript: `
register_test("drink 變數推薦結果", "drink" in dir() and drink == "冰鎮西瓜汁", "當 weather_temp = 32 時，drink 應被賦值為 '冰鎮西瓜汁'", expected="'冰鎮西瓜汁'", target_var="drink")
register_test("今日推薦飲品輸出", "今日推薦飲品：冰鎮西瓜汁" in _captured_stdout, "請使用 print 印出今日推薦飲品！", expected="今日推薦飲品：冰鎮西瓜汁", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "if weather_temp >= 30:\n    drink = \"冰鎮西瓜汁\"",
          "elif weather_temp >= 20:\n    drink = \"微冰四季春\"",
          "else:\n    drink = \"熱薑母黑糖茶\""
        ],
        solution: `weather_temp = 32

if weather_temp >= 30:
    drink = "冰鎮西瓜汁"
elif weather_temp >= 20:
    drink = "微冰四季春"
else:
    drink = "熱薑母黑糖茶"

print(f"今日推薦飲品：{drink}")`,
        quiz: {
          question: "當我們有 5 個不同的區間條件需要依序判斷時，應該使用哪種關鍵字？",
          options: [
            "else if",
            "elif",
            "elseif",
            "then"
          ],
          correctIndex: 1,
          explanation: "答對了！Python 簡化了語法，專門使用 elif。"
        }
      }
    ]
  },
  {
    id: "ch5",
    title: "第 5 章：不知疲倦的重複機器 —— 迴圈 (Loops)",
    icon: "🔄",
    description: "讓電腦一秒重複運算一萬次！精通 for 迴圈、while 迴圈與 break/continue 控制技。",
    lessons: [
      {
        id: "ch5-1",
        title: "節奏大師：for 迴圈與 range()",
        starterCode: `# 讓電腦為我們數數
for i in range(5):
    print(f"現在數到：{i}")
`,
        theory: `
<h2>人類討厭重複，電腦最愛重複！</h2>
<p>如果你想在螢幕印出 100 次「我愛寫程式」，總不可能複製貼上 100 行吧？<strong>迴圈 (Loop)</strong> 就是用來指揮電腦反覆做某件事的魔法符咒！</p>

<h3>認識計數好幫手：<code>range()</code></h3>
<ul>
  <li><code>range(5)</code>：產生 <code>0, 1, 2, 3, 4</code>（共 5 個數，注意從 0 開始，不包含 5！）</li>
  <li><code>range(1, 6)</code>：產生 <code>1, 2, 3, 4, 5</code>（從 1 開始，到 6 前面停下）</li>
  <li><code>range(0, 10, 2)</code>：每次跳 2 步，產生 <code>0, 2, 4, 6, 8</code></li>
</ul>

<div class="code-block-wrapper">
  <pre>total = 0
for num in range(1, 11):
    total += num  # 等同於 total = total + num
print(f"1加到10的總和是：{total}") # 55</pre>
</div>
`,
        mission: {
          goal: "發射太空火箭倒數計時",
          description: "請寫一個 `for` 迴圈，從 5 倒數到 1，依序在終端機印出：\n`倒數 5 秒...`\n`倒數 4 秒...`\n`倒數 3 秒...`\n`倒數 2 秒...`\n`倒數 1 秒...`\n最後在迴圈結束後印出：`\"🚀 太空火箭升空！\"`",
          requirements: [
            "使用 for 迴圈印出倒數訊息",
            "訊息內容為 `倒數 X 秒...` (X 為 5 到 1)",
            "結尾印出 `🚀 太空火箭升空！`"
          ]
        },
        testScript: `
has_countdown = "倒數 5 秒..." in _captured_stdout and "倒數 1 秒..." in _captured_stdout
has_liftoff = "🚀 太空火箭升空！" in _captured_stdout
register_test("倒數 5 到 1 迴圈執行", has_countdown, "請確認是否有從 5 倒數到 1！", expected="包含 倒數 5 秒... 至 倒數 1 秒...", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
register_test("太空火箭升空標語", has_liftoff, "最後記得印出 '🚀 太空火箭升空！'", expected="🚀 太空火箭升空！", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "提示：range(5, 0, -1) 可以從 5 倒數到 1！",
          "也可以寫 for i in [5, 4, 3, 2, 1]:"
        ],
        solution: `for i in range(5, 0, -1):
    print(f"倒數 {i} 秒...")

print("🚀 太空火箭升空！")`,
        quiz: {
          question: "執行 list(range(3)) 會產生什麼數字清單？",
          options: [
            "[1, 2, 3]",
            "[0, 1, 2]",
            "[0, 1, 2, 3]",
            "[3]"
          ],
          correctIndex: 1,
          explanation: "太棒了！range(n) 預設從 0 開始，到 n-1 結束，所以 range(3) 會產生 0, 1, 2。"
        }
      },
      {
        id: "ch5-2",
        title: "只要條件滿足就一直做：while 迴圈",
        starterCode: `# 只要體力大於 0 就繼續練功
energy = 3

while energy > 0:
    print(f"揮劍練習！剩餘體力：{energy}")
    energy -= 1  # 每次消耗 1 點體力，這行至關重要！

print("體力耗盡，回村莊休息。")
`,
        theory: `
<h2>當你不知道要重複幾次時：while 迴圈</h2>
<p><code>for</code> 迴圈適合「知道確切次數」的場合；而 <code>while</code> 迴圈的意義是：<strong>「只要 (while) 條件還是 True，就一直重複做下去！」</strong></p>

<div class="callout warning">
  <div class="callout-title">☠️ 恐怖的無窮迴圈 (Infinite Loop)</div>
  <p>如果你的 while 條件永遠都是 True，電腦就會瘋狂狂轉永不休止！因此，在 while 迴圈裡面，<strong>一定要有改變狀態的語句（例如計數器累加、扣減）</strong>，確保條件終究會變成 False 而停下來！</p>
</div>
`,
        mission: {
          goal: "累加存錢筒直到達標",
          description: "小明想買一台 100 元的玩具車。他目前存款 `savings = 0`，每天存入固定零用錢 `daily = 15`。\n請使用 `while` 迴圈，當 `savings < 100` 時持續存錢並紀錄天數 `days`。\n最後印出 `f\"花了 {days} 天，存到了 {savings} 元！\"`",
          requirements: [
            "使用 while savings < 100 迴圈進行累加",
            "計算正確的天數 days (7天) 與最終金額 savings (105元)",
            "印出存款結果"
          ]
        },
        testScript: `
register_test("存錢天數累加 (days)", "days" in dir() and days == 7, "days 累計天數應該為 7 天！", expected=7, target_var="days")
register_test("最終存款金額 (savings)", "savings" in dir() and savings == 105, "savings 累積金額應該為 105 元！", expected=105, target_var="savings")
register_test("存款結果印出", "花了 7 天，存到了 105 元！" in _captured_stdout, "請確認輸出句子包含 '花了 7 天，存到了 105 元！'", expected="花了 7 天，存到了 105 元！", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "初始化 savings = 0, days = 0, daily = 15",
          "在 while 迴圈內部：savings += daily，days += 1"
        ],
        solution: `savings = 0
days = 0
daily = 15

while savings < 100:
    savings += daily
    days += 1

print(f"花了 {days} 天，存到了 {savings} 元！")`,
        quiz: {
          question: "如果在 while 迴圈中寫了 while True:，要如何主動跳出迴圈？",
          options: [
            "exit",
            "break",
            "stop",
            "continue"
          ],
          correctIndex: 1,
          explanation: "答對了！break 關鍵字就是緊急煞車，能瞬間中斷並跳出當前迴圈。"
        }
      }
    ]
  },
  {
    id: "ch6",
    title: "第 6 章：百寶袋與通訊錄 —— 串列與字典",
    icon: "🧰",
    description: "學會用清單一次收納成千上萬筆資料，掌握鍵值對 (Key-Value) 快速查表技巧。",
    lessons: [
      {
        id: "ch6-1",
        title: "購物清單與百寶袋：串列 (List)",
        starterCode: `# 勇者的道具背包
backpack = ["木劍", "草藥", "火把"]

# 取出第一個道具（注意：程式從 0 號開始數！）
print("第一格道具：", backpack[0])

# 撿到了新道具：使用 append() 放入背包尾端
backpack.append("魔法盾牌")
print("更新後的背包：", backpack)
print("背包內共有幾個道具：", len(backpack))
`,
        theory: `
<h2>一個盒子裝不夠，你有用過抽屜嗎？</h2>
<p>如果我們要記錄 100 位同學的名字，總不可能宣告 100 個變數 <code>name1, name2...</code> 吧？<strong>串列 (List)</strong> 就是一個可伸縮的百寶袋，用中括號 <code>[]</code> 表示，裡面可以用逗號放很多東西！</p>

<h3>索引值 (Index) 從 0 開始！</h3>
<p>這是程式界最重要的約定：<strong>最前面的第一個元素編號是 0</strong>，第二個是 1，以此類推！</p>

<div class="code-block-wrapper">
  <pre>fruits = ["蘋果", "香蕉", "西瓜"]
print(fruits[0]) # 蘋果
print(fruits[1]) # 香蕉
print(fruits[-1]) # 西瓜 (負數代表從最後面倒數第1個！)</pre>
</div>
`,
        mission: {
          goal: "整理冒險公會的任務委託清單",
          description: "1. 宣告清單 `missions = [\"討伐史萊姆\", \"採集藥草\", \"護送商人\"]`\n2. 使用 `.append()` 新增第四個委託：`\"探索古代遺跡\"`\n3. 使用 `len()` 取得任務總數存入 `total_missions`\n4. 印出第一項委託與任務總數！",
          requirements: [
            "missions 包含 4 項任務",
            "最後一項為 '探索古代遺跡'",
            "total_missions 為 4"
          ]
        },
        testScript: `
is_ok = "missions" in dir() and len(missions) == 4 and missions[3] == "探索古代遺跡"
register_test("missions 串列與 append()", is_ok, "missions 應該有 4 項任務，最後一項為 '探索古代遺跡'", expected="4項元素，尾端為 '探索古代遺跡'", target_var="missions")
register_test("total_missions 任務總數", "total_missions" in dir() and total_missions == 4, "total_missions 應該等於 4", expected=4, target_var="total_missions")
`,
        hints: [
          "missions.append(\"探索古代遺跡\")",
          "total_missions = len(missions)"
        ],
        solution: `missions = ["討伐史萊姆", "採集藥草", "護送商人"]
missions.append("探索古代遺跡")
total_missions = len(missions)

print("第一項任務：", missions[0])
print("任務總數：", total_missions)`,
        quiz: {
          question: "已知 items = [\"A\", \"B\", \"C\", \"D\"]，請問 items[2] 的值是什麼？",
          options: [
            "\"B\"",
            "\"C\"",
            "\"D\"",
            "\"A\""
          ],
          correctIndex: 1,
          explanation: "太棒了！索引 0 是 A、1 是 B、2 是 C，所以 items[2] 是 \"C\"！"
        }
      },
      {
        id: "ch6-2",
        title: "查閱個人資料卡：字典 (Dictionary)",
        starterCode: `# 冒險者角色檔案庫
player = {
    "name": "克勞德",
    "job": "大劍戰士",
    "hp": 250,
    "mp": 30
}

# 透過 Key 鍵名稱來查值
print("角色名稱：", player["name"])

# 修改數值
player["hp"] = 300

# 新增全新屬性
player["attack"] = 85

print("完整資料：", player)
`,
        theory: `
<h2>想像一本真正的「字典」</h2>
<p>在現實中查字典時，我們會根據「單字（Key）」去找它的「解釋內容（Value）」。在 Python 中，這叫做 <strong>字典 (Dictionary)</strong>，用大括號 <code>{}</code> 表示：</p>

<div class="code-block-wrapper">
  <pre>hero = {
    "名字": "亞瑟",     # "名字" 是 Key，"亞瑟" 是 Value
    "等級": 10,
    "已轉職": True
}
print(hero["等級"])    # 10</pre>
</div>

<div class="callout tip">
  <div class="callout-title">💡 串列 vs 字典，該選誰？</div>
  <ul>
    <li>想要一長串有順序的東西（如購物清單、歷史紀錄）➔ 用 <strong>串列 List</strong></li>
    <li>想要儲存帶有明確欄位名稱的資料（如使用者資訊、商品規格）➔ 用 <strong>字典 Dictionary</strong></li>
  </ul>
</div>
`,
        mission: {
          goal: "建立寵物醫院的毛小孩病歷表",
          description: "宣告字典 `pet`，包含以下 4 個鍵值對：\n1. `\"name\"`: `\"布丁\"`\n2. `\"species\"`: `\"柴犬\"`\n3. `\"age\"`: `3`\n4. `\"is_vaccinated\"`: `True`\n最後使用 f-string 印出：`f\"寵物名字：{pet['name']}，是一隻 {pet['age']} 歲的 {pet['species']}！\"`",
          requirements: [
            "字典 pet 包含 name, species, age, is_vaccinated",
            "年齡為數字 3，疫苗標記為 True",
            "印出完整的寵物介紹"
          ]
        },
        testScript: `
pet_ok = "pet" in dir() and pet.get("name") == "布丁" and pet.get("species") == "柴犬" and pet.get("age") == 3 and pet.get("is_vaccinated") is True
register_test("pet 字典四項欄位", pet_ok, "請確認 pet 字典包含正確的 name, species, age=3 與 is_vaccinated=True", expected="{'name': '布丁', 'species': '柴犬', 'age': 3, 'is_vaccinated': True}", target_var="pet")
register_test("寵物病歷介紹印出", "寵物名字：布丁，是一隻 3 歲的 柴犬！" in _captured_stdout, "請確認 print 輸出包含：寵物名字：布丁，是一隻 3 歲的 柴犬！", expected="寵物名字：布丁，是一隻 3 歲的 柴犬！", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "pet = {\"name\": \"布丁\", \"species\": \"柴犬\", \"age\": 3, \"is_vaccinated\": True}",
          "在 f-string 中如果外面用雙引號，裡面字典 key 要用單引號：f\"{pet['name']}\""
        ],
        solution: `pet = {
    "name": "布丁",
    "species": "柴犬",
    "age": 3,
    "is_vaccinated": True
}

print(f"寵物名字：{pet['name']}，是一隻 {pet['age']} 歲的 {pet['species']}！")`,
        quiz: {
          question: "在字典 user = {\"name\": \"Leo\"} 中，如果想要把名字改成 \"Max\"，該怎麼寫？",
          options: [
            "user.name = \"Max\"",
            "user[\"name\"] = \"Max\"",
            "user.append(\"Max\")",
            "user(0) = \"Max\""
          ],
          correctIndex: 1,
          explanation: "答對了！透過 user[\"name\"] = \"Max\" 即可直接更新鍵對應的數值。"
        }
      }
    ]
  },
  {
    id: "ch7",
    title: "第 7 章：打造自己的專屬工具 —— 函式 (Functions)",
    icon: "⚙️",
    description: "告別複製貼上！學習如何用 def 將常用的魔法包裝成專屬積木，並理解 return 的精髓。",
    lessons: [
      {
        id: "ch7-1",
        title: "自訂魔法工具箱：def 與參數",
        starterCode: `# 定義一個打招呼的專屬函式
def greet_player(name, title="初級冒險者"):
    print(f"✨ 歡迎光臨！尊貴的【{title}】{name} 閣下！")

# 呼叫這個函式
greet_player("艾利斯")
greet_player("梅林", "大魔導士")
`,
        theory: `
<h2>不要重複你自己！(DRY 原則)</h2>
<p>在寫程式時，如果同樣的 5 行運算程式碼在很多地方都要用到，難道每次都要複製貼上嗎？<strong>函式 (Function)</strong> 就像是一個獨立的小工廠，你把材料（參數）丟進去，它就會自動幫你加工好！</p>

<h3>打造函式三步驟</h3>
<div class="code-block-wrapper">
  <pre>def 函式名稱(參數1, 參數2):
    # 這裡放加工的動作（記得縮排！）
    print(f"加工完成：{參數1}")

# 使用它（呼叫函式 Call Function）
函式名稱("原料A", "原料B")</pre>
</div>
`,
        mission: {
          goal: "打造一個矩形面積計算工廠",
          description: "定義一個名為 `calc_rectangle_area(width, height)` 的函式：\n在函式內部計算 `area = width * height` 並印出 `f\"寬 {width} 高 {height} 的面積為：{area}\"`。\n請呼叫此函式兩次：分別傳入 (5, 8) 與 (10, 20)。",
          requirements: [
            "定義 calc_rectangle_area(width, height)",
            "印出格式正確的面積字串",
            "呼叫兩次計算"
          ]
        },
        testScript: `
has_fn = "calc_rectangle_area" in dir() and callable(calc_rectangle_area)
register_test("自訂函式 calc_rectangle_area 定義", has_fn, "請使用 def calc_rectangle_area(width, height): 定義函式", expected="可正常呼叫的函式", target_var="calc_rectangle_area")
has_outputs = "40" in _captured_stdout and "200" in _captured_stdout
register_test("函式呼叫與面積輸出", has_outputs, "請呼叫函式傳入 (5, 8) 與 (10, 20)，輸出應分別包含 40 與 200！", expected="包含 40 與 200", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "def calc_rectangle_area(width, height):",
          "    area = width * height",
          "    print(f\"寬 {width} 高 {height} 的面積為：{area}\")"
        ],
        solution: `def calc_rectangle_area(width, height):
    area = width * height
    print(f"寬 {width} 高 {height} 的面積為：{area}")

calc_rectangle_area(5, 8)
calc_rectangle_area(10, 20)`,
        quiz: {
          question: "在 Python 中，用來定義一個自訂函式的關鍵字是？",
          options: [
            "function",
            "def",
            "fun",
            "create"
          ],
          correctIndex: 1,
          explanation: "太棒了！def 是 define（定義）的縮寫。"
        }
      },
      {
        id: "ch7-2",
        title: "把成果帶回家：return 回傳值",
        starterCode: `# 比較 print() 與 return 的差別
def add_with_print(a, b):
    print("相加結果：", a + b)

def add_with_return(a, b):
    return a + b  # 把計算成果「吐」回給外面的人！

ans1 = add_with_print(3, 4)
ans2 = add_with_return(3, 4)

print("ans1 存到了什麼：", ans1) # 得到 None！
print("ans2 存到了什麼：", ans2) # 得到 7！
`,
        theory: `
<h2>新手最容易困惑的大魔王：print() vs return</h2>
<div class="callout story">
  <div class="callout-title">🍽️ 餐廳主廚的大比喻</div>
  <ul>
    <li><strong><code>print()</code> 像主廚大喊</strong>：「菜做好囉！」—— 聲音雖然很大，但外面的人<strong>兩手空空，什麼都沒拿到</strong>。</li>
    <li><strong><code>return</code> 像服務生上菜</strong>：把熱騰騰的盤子（成果）親手端出廚房，外面的變數才能接住並繼續拿去做別的料理！</li>
  </ul>
</div>

<div class="code-block-wrapper">
  <pre>def square(n):
    return n * n

# 拿回傳值繼續運算
total = square(3) + square(4)  # 9 + 16 = 25
print(total)</pre>
</div>
`,
        mission: {
          goal: "打造國際標準 BMI 健康計算器",
          description: "公式：`BMI = 體重 (kg) / (身高 (m) ** 2)`\n請定義函式 `calc_bmi(weight, height_m)`：\n計算 BMI 並使用 `round(bmi, 2)` 四捨五入到小數點後兩位，最後透過 `return` 回傳結果。\n請測試計算 `my_bmi = calc_bmi(70, 1.75)`，並印出結果！",
          requirements: [
            "定義 calc_bmi(weight, height_m)",
            "函式內部使用 return 回傳四捨五入的 BMI",
            "calc_bmi(70, 1.75) 的回傳值應為 22.86"
          ]
        },
        testScript: `
has_fn = "calc_bmi" in dir() and callable(calc_bmi)
register_test("calc_bmi 函式定義", has_fn, "請定義 calc_bmi(weight, height_m) 函式", expected="函式 calc_bmi", target_var="calc_bmi")
if has_fn:
    bmi_val = calc_bmi(70, 1.75)
    register_test("calc_bmi(70, 1.75) 回傳值", abs(bmi_val - 22.86) < 0.01, f"calc_bmi(70, 1.75) 應該 return 22.86！目前回傳為 {bmi_val}", expected=22.86, actual=bmi_val)
register_test("印出 BMI 數值", "22.86" in _captured_stdout, "請印出計算出的 BMI 數值！", expected="包含 22.86", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "bmi = weight / (height_m ** 2)",
          "return round(bmi, 2)"
        ],
        solution: `def calc_bmi(weight, height_m):
    bmi = weight / (height_m ** 2)
    return round(bmi, 2)

my_bmi = calc_bmi(70, 1.75)
print(f"計算出的 BMI 為：{my_bmi}")`,
        quiz: {
          question: "當一個函式執行到 return 語句時，會發生什麼事？",
          options: [
            "印出文字並繼續往下執行",
            "立即結束該函式，並把值傳遞給呼叫者",
            "重新執行函式一次",
            "程式當機報錯"
          ],
          correctIndex: 1,
          explanation: "太精準了！return 會立刻將控制權交還給呼叫端，函式就此結束退出。"
        }
      }
    ]
  },
  {
    id: "ch8",
    title: "第 8 章：新手畢業專案 —— 文字地下城 RPG 冒險遊戲",
    icon: "🏆",
    description: "融合前面學過的所有核心觀念，親手完成你人生中第一個可遊玩的 Python 文字冒險小遊戲！",
    lessons: [
      {
        id: "ch8-1",
        title: "畢業試煉：地下城怪物決戰 RPG",
        starterCode: `# ⚔️ 歡迎來到 Python 新手村畢業專題！
# 請補全下方的地下城戰鬥邏輯，讓遊戲順利運作！

hero = {
    "name": "新手勇者",
    "hp": 100,
    "attack": 25,
    "potions": 2
}

monster = {
    "name": "地城惡龍",
    "hp": 80,
    "attack": 15
}

def hero_attack():
    # 勇者攻擊惡龍，惡龍血量減少
    monster["hp"] -= hero["attack"]
    print(f"🗡️ {hero['name']} 發動猛攻！對 {monster['name']} 造成 {hero['attack']} 點傷害！")

def monster_attack():
    # 惡龍反擊勇者，勇者血量減少
    hero["hp"] -= monster["attack"]
    print(f"🔥 {monster['name']} 噴吐烈焰！對 {hero['name']} 造成 {monster['attack']} 點傷害！")

# 模擬進行一回合交鋒
hero_attack()
monster_attack()

print(f"當前戰況 ➔ 勇者血量：{hero['hp']} | 惡龍血量：{monster['hp']}")
`,
        theory: `
<h2>🎉 恭喜你走到最後一步！</h2>
<p>回顧一下，你已經學會了：</p>
<ul>
  <li>✅ <strong>變數與資料型態</strong>：記錄數值與狀態</li>
  <li>✅ <strong>算術與 f-string</strong>：計算傷害與產生精美戰報</li>
  <li>✅ <strong>條件判斷 if/else</strong>：判斷勝負與是否需要喝藥水</li>
  <li>✅ <strong>迴圈 while/for</strong>：進行每回合的戰鬥推進</li>
  <li>✅ <strong>字典與串列</strong>：管理角色與怪物的資料結構</li>
  <li>✅ <strong>函式 def/return</strong>：封裝攻擊與補血邏輯</li>
</ul>

<p>現在，讓我們把這些武器全部組裝在一起，完成專屬於你的 RPG 文字冒險小遊戲！</p>
`,
        mission: {
          goal: "完成自動戰鬥迴圈直到惡龍被擊敗！",
          description: "請在程式下方加上一個 `while` 迴圈：\n只要 `hero[\"hp\"] > 0 and monster[\"hp\"] > 0` 就持續交替呼叫 `hero_attack()` 與 `monster_attack()`。\n當戰鬥結束後：\n若 `monster[\"hp\"] <= 0`，印出 `\"🎉 勇者大獲全勝，成功拯救世界！\"`",
          requirements: [
            "使用 while 迴圈持續戰鬥直到有一方血量歸零或小於 0",
            "惡龍血量歸零時印出 `🎉 勇者大獲全勝，成功拯救世界！`",
            "遊戲不卡在無窮迴圈中"
          ]
        },
        testScript: `
dragon_hp = monster.get("hp", 999) if "monster" in dir() else 999
dragon_dead = dragon_hp <= 0
register_test("惡龍血量歸零倒下", dragon_dead, "惡龍的血量應該小於等於 0！請檢查 while 迴圈內是否有持續執行 hero_attack()", expected="monster['hp'] <= 0", actual=f"monster['hp'] = {dragon_hp}")
has_victory = "🎉 勇者大獲全勝，成功拯救世界！" in _captured_stdout
register_test("獲勝勝利標語輸出", has_victory, "請在惡龍血量歸零時印出 '🎉 勇者大獲全勝，成功拯救世界！'", expected="🎉 勇者大獲全勝，成功拯救世界！", actual=_captured_stdout.strip() if _captured_stdout.strip() else "(無輸出)")
`,
        hints: [
          "寫法：while hero[\"hp\"] > 0 and monster[\"hp\"] > 0:",
          "    hero_attack()",
          "    if monster[\"hp\"] <= 0: break",
          "    monster_attack()"
        ],
        solution: `hero = {
    "name": "新手勇者",
    "hp": 100,
    "attack": 25,
    "potions": 2
}

monster = {
    "name": "地城惡龍",
    "hp": 80,
    "attack": 15
}

def hero_attack():
    monster["hp"] -= hero["attack"]
    print(f"🗡️ {hero['name']} 發動猛攻！對 {monster['name']} 造成 {hero['attack']} 點傷害！")

def monster_attack():
    hero["hp"] -= monster["attack"]
    print(f"🔥 {monster['name']} 噴吐烈焰！對 {hero['name']} 造成 {monster['attack']} 點傷害！")

while hero["hp"] > 0 and monster["hp"] > 0:
    hero_attack()
    if monster["hp"] <= 0:
        break
    monster_attack()

if monster["hp"] <= 0:
    print("🎉 勇者大獲全勝，成功拯救世界！")
else:
    print("勇者倒下了，請重新挑戰！")`,
        quiz: {
          question: "在開發 RPG 遊戲時，將各個角色的屬性包裝成 Dictionary（例如 hero = {\"hp\": 100}）最大的好處是什麼？",
          options: [
            "讓程式碼執行速度變快一百倍",
            "結構清晰、欄位語意明確，好維護與傳遞給函式",
            "避免電腦過熱",
            "不需要寫 print"
          ],
          correctIndex: 1,
          explanation: "太棒了！良好的資料結構設計是成為優秀軟體工程師最重要的基石！"
        }
      }
    ]
  }
];
