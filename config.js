// ═══ 雲端聖恩宮・網頁版設定檔（可直接在 GitHub 網站上編輯此檔） ═══
window.TEMPLE_CONFIG = {
  temple_name: '雲端聖恩宮',

  // 後端主機網址。留空 = 純網頁版（參拜、求籤可用；點燈／法會／濟世顯示聯絡方式）
  // 日後架好主機後填入，例如 'https://temple.example.com'，即自動開放線上報名
  apiBase: '',

  // 聯絡資訊（顯示在點燈、法會、濟世、尋燈頁面），沒有的項目留空即可
  contact: {
    phone: '',          // 例：'05-1234567'
    line_url: '',       // 例：'https://lin.ee/xxxxxxx'
    address: '',        // 例：'雲林縣斗六市○○路○號'
    hours: '',          // 例：'每日 07:00–21:00'
  },

  // Google 表單網址（法會報名、隨緣濟世）。填了就會直接在網頁上顯示表單讓信眾報名
  // 用 google_forms/建立報名表單.gs 一鍵建立後，把執行紀錄印出的網址貼過來
  google_forms: {
    ceremony: 'https://docs.google.com/forms/d/e/1FAIpQLSfqYa66G-HCOHotecchZ_aoGYcoeIWfIhCG-ypzLjjJ7WiHVQ/viewform',
    jishi: 'https://docs.google.com/forms/d/e/1FAIpQLSe7t3m5EbSum35ZajefgmmJav2gzUpe4RT7PG2f55gAbuJgog/viewform',
  },

  // 匯款帳號（留空則不顯示）
  bank: { bank_name: '', bank_code: '', branch: '', account: '', account_name: '' },

  // 點燈價目表（純網頁版顯示用）
  lamps: [
      {
          "name": "太歲平安燈",
          "price": 600
      },
      {
          "name": "關聖帝君光明燈",
          "price": 600
      },
      {
          "name": "關聖帝君武財神燈",
          "price": 1200
      },
      {
          "name": "福德正財庫燈",
          "price": 800
      },
      {
          "name": "天上聖母平安燈",
          "price": 600
      },
      {
          "name": "溪女娘娘祈福護幼燈",
          "price": 600
      },
      {
          "name": "玄天上帝消災延壽燈",
          "price": 600
      },
      {
          "name": "中壇元帥行車平安燈",
          "price": 600
      },
      {
          "name": "濟公師父開運化劫燈",
          "price": 800
      }
  ],
};
