# 雲端聖恩宮・GitHub Pages 上架步驟（免費、免主機）

## 網頁版能做什麼

| 功能 | GitHub Pages 網頁版 | 說明 |
|---|---|---|
| 大殿參拜、八尊神像 | ✅ | |
| 祈福牆（姓名＋心願） | ✅ | 只存在信眾自己的手機／瀏覽器，其他人看不到 |
| 百首靈籤（抽籤＋三聖杯＋解籤） | ✅ | 100 首完整籤詩與各項解說 |
| 法會報名、隨緣濟世 | ✅ Google 表單 | 回覆進 Google 試算表，自動編號（見第五節） |
| 點燈安太歲、線上尋燈 | 📞 顯示價目表與聯絡方式 | 需要後端主機 |
| 廟務後台 | ❌ | 需要後端主機 |

日後架好主機（見《上架部署指南.md》），只要在 `config.js` 填入 `apiBase`，網頁版就會自動開放線上報名。

## 一、建立 GitHub 帳號與儲存庫

1. 到 https://github.com 註冊帳號（例：`shengen-temple`）。
2. 右上角「＋」→ **New repository**
   - Repository name：例 `temple`
   - 選 **Public**（免費帳號的 Pages 需公開）
   - 按 **Create repository**

## 二、上傳檔案

1. 解壓縮 `cloud_temple_github_pages.zip`。
2. 在剛建立的儲存庫頁面點 **uploading an existing file**。
3. 把解壓後**資料夾裡面的所有東西**（`index.html`、`config.js`、`lots.json`、`static` 資料夾）一起拖進去。
   ⚠️ 要拖「裡面的檔案」，不是拖外層資料夾，`index.html` 必須在最上層。
4. 下方按 **Commit changes**。

## 三、開啟 GitHub Pages

1. 儲存庫上方 **Settings** → 左側 **Pages**。
2. Source 選 **Deploy from a branch**，Branch 選 **main**、資料夾 **/(root)** → **Save**。
3. 等 1～3 分鐘，重新整理此頁，會出現網址：
   `https://您的帳號.github.io/temple/`

## 四、填寫聯絡資訊（建議）

在儲存庫點開 `config.js` → 右上角鉛筆圖示編輯，填入：

```js
contact: {
  phone: '05-1234567',
  line_url: 'https://lin.ee/xxxxxxx',
  address: '雲林縣斗六市○○路○號',
  hours: '每日 07:00–21:00',
},
bank: { bank_name: '○○銀行', bank_code: '000', branch: '○○分行', account: '1234567890', account_name: '雲端聖恩宮' },
```

改完按 **Commit changes**，約 1 分鐘後網站更新。燈價也在同一檔的 `lamps` 修改。

## 五、法會報名、隨緣濟世掛 Google 表單

1. 打開 https://script.google.com → **新專案**，刪掉原本內容，貼上 `google_forms/建立報名表單.gs` 全部內容。
2. 修改最上方「廟方設定」：匯款帳號 `BANK_TEXT`、法會名稱 `CEREMONIES`、報名項目與金額 `CEREMONY_ITEMS`。
3. 上方函式選「建立報名表單」→ **執行** → 依畫面授權（出現「Google 尚未驗證」時按「進階」→「前往」）。
4. 執行完，下方執行紀錄會印出一段：
   ```js
   google_forms: {
     ceremony: 'https://docs.google.com/forms/d/e/……/viewform',
     jishi: 'https://docs.google.com/forms/d/e/……/viewform',
   },
   ```
   把網址貼到 GitHub 上 `config.js` 的 `google_forms`，Commit 後網頁的「法會報名」「隨緣濟世」就會直接出現表單。

自動完成的功能：
- 回覆都進同一份 Google 試算表（「法會報名」「隨緣濟世」兩個分頁），可直接當名單列印、匯出。
- 每筆報名自動產生**報名編號**（法會 `CE20261016-001`、濟世 `JS20261016-001`），寫在試算表最右欄。
- 信眾有填 Email 就自動寄報名編號（法會選匯款者附上匯款帳號）；廟方 Gmail 同步收到新報名通知。

之後要改法會名稱或項目，直接到 Google 表單編輯即可，網頁不用改。
⚠️ 請貼「傳送 → 連結」或執行紀錄給的網址（含 `/d/e/`），不要貼編輯網址（含 `/edit`），否則信眾看不到表單。`forms.gle` 短網址也可以用，但只會顯示「開啟表單」按鈕，不會內嵌。

## 六、更換神像照片

到 `static/deities/photos/`，用 **Add file → Upload files** 上傳同名檔案覆蓋即可（`guansheng.jpg`、`fude.jpg`、`mazu.jpg`、`xinu.jpg`、`xuantian.jpg`、`nezha.jpg`、`jigong1.jpg`、`jigong2.jpg`）。建議每張壓在 300KB 以內。

## 七、之後要更新網頁程式

在電腦上的專案資料夾執行 `python scripts/build_github_pages.py`，會重新產生 `github_pages/`（不會覆蓋您已填好的 `config.js`），再把 `index.html` 上傳覆蓋即可。

## 小提醒

- 儲存庫是公開的，**不要上傳 `.env`、`instance/` 資料庫或任何密碼**；網頁版套件本身不含這些。
- 想用自己的網域（例 `www.shengen.org.tw`）：Settings → Pages → Custom domain 填入，並到網域商設定 CNAME 指向 `您的帳號.github.io`。
- 放進 LINE 官方帳號圖文選單：直接貼上 GitHub Pages 網址即可。
