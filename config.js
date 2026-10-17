// ═══ 雲端聖恩宮・網頁版設定檔（可直接在 GitHub 網站上編輯此檔） ═══
window.TEMPLE_CONFIG = {
  temple_name: '雲端聖恩宮',

  // 後端主機網址。留空 = 純網頁版（參拜、求籤可用；點燈／法會／濟世顯示聯絡方式）
  // 日後架好主機後填入，例如 'https://temple.example.com'，即自動開放線上報名
  apiBase: '',

  // 聯絡資訊（顯示在點燈、法會、濟世、尋燈頁面），沒有的項目留空即可
  contact: {
    phone: '0926-990032',// 例：'0926-990032'
    line_url: 'https://line.me/ti/g/lM2FMiP3dT',// 例：'https://line.me/ti/g/lM2FMiP3dT'
    address: '雲林縣斗六市中山路395號',        // 例：'雲林縣斗六市中山路395號'
    hours: '每週五 20:30–23:00',          // 例：'每週五 20:30–23:00'
  },

  // Google 表單網址（法會報名、隨緣濟世）。填了就會直接在網頁上顯示表單讓信眾報名
  // 用 google_forms/建立報名表單.gs 一鍵建立後，把執行紀錄印出的網址貼過來
  google_forms: {
    ceremony: 'https://docs.google.com/forms/d/e/1FAIpQLSfqYa66G-HCOHotecchZ_aoGYcoeIWfIhCG-ypzLjjJ7WiHVQ/viewform',
    jishi: 'https://docs.google.com/forms/d/e/1FAIpQLSe7t3m5EbSum35ZajefgmmJav2gzUpe4RT7PG2f55gAbuJgog/viewform',
  },

  // 雲端祈福牆網址（Google Apps Script 網頁應用程式）。祈福心願會存進 Google 試算表「祈福牆」分頁
  wall_api: 'https://script.google.com/macros/s/AKfycbzgnRC6uFip0QnS3N4_iNw4AQV9PcvB7Uyb9EGoNF8MJmt8lOzqY9sw38rqsdI2iAGECQ/exec',

  // 匯款帳號（留空則不顯示）
  bank: { bank_name: '', bank_code: '', branch: '', account: '', account_name: '' },

  // 點燈價目表（純網頁版顯示用）
  lamps: [
      {
          "name": "太歲平安燈",
          "price": 300
      },
      {
          "name": "關聖帝君光明燈",
          "price": 300
      },
      {
          "name": "關聖帝君武財神燈",
          "price": 1000
      },
      {
          "name": "福德正財庫燈",
          "price": 1000
      },
      {
          "name": "天上聖母平安燈",
          "price": 300
      },
      {
          "name": "溪女娘娘祈福護幼燈",
          "price": 300
      },
      {
          "name": "玄天上帝消災延壽燈",
          "price": 300
      },
      {
          "name": "中壇元帥行車平安燈",
          "price": 300
      },
      {
          "name": "濟公師父開運化劫燈",
          "price": 1000
      }
  ],
};
