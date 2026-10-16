/**
 * 雲端聖恩宮：一鍵建立「法會報名」與「隨緣濟世」Google 表單
 *
 * 使用方式（只需做一次）：
 *  1. 到 https://script.google.com → 新專案 → 刪掉原本內容，貼上本檔全部內容
 *  2. 修改下方「廟方設定」（匯款帳號、法會名稱、報名項目）
 *  3. 上方函式選單選「建立報名表單」→ 執行 → 依指示授權
 *  4. 執行完成後，下方「執行紀錄」會印出兩個表單網址，貼到網站 config.js 的 google_forms
 *
 * 會自動完成：
 *  - 建立兩份表單＋一份回覆試算表（「法會報名」「隨緣濟世」兩個分頁）
 *  - 每筆報名自動產生報名編號（法會 CE20261016-001、濟世 JS20261016-001）寫入試算表
 *  - 信眾若有填 Email，自動寄送報名編號；廟方信箱同步收到新報名通知
 */

// ════════ 廟方設定（請修改） ════════
const TEMPLE = '雲端聖恩宮';
const BANK_TEXT = '匯款銀行：○○銀行（000）○○分行\n帳號：0000000000000\n戶名：雲端聖恩宮';
const CEREMONIES = ['新春祈福法會', '中元普度法會', '禮斗祈福法會'];          // 法會名稱，可增減
const CEREMONY_ITEMS = ['祈福消災 NT$600', '超渡祖先 NT$1,200', '普度供品 NT$1,000']; // 報名項目，可增減
const NOTIFY_TEMPLE = true;   // 有新報名時寄通知到執行此程式的 Google 帳號信箱
// ═══════════════════════════════════

const PHONE_RULE = () => FormApp.createTextValidation()
  .requireTextMatchesPattern('^[0-9+\\-() #]{8,20}$').setHelpText('請輸入正確的電話號碼').build();
const EMAIL_RULE = () => FormApp.createTextValidation().requireTextIsEmail().setHelpText('Email 格式不正確').build();

function 建立報名表單() {
  const ss = SpreadsheetApp.create(TEMPLE + '・線上報名回覆');
  const ce = buildCeremonyForm_();
  const js = buildJishiForm_();
  ce.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  js.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  Utilities.sleep(2000);

  // 把回覆分頁改名，刪除空白預設分頁
  ss.getSheets().forEach(sh => {
    const url = sh.getFormUrl() || '';
    if (url.indexOf(ce.getId()) >= 0) sh.setName('法會報名');
    else if (url.indexOf(js.getId()) >= 0) sh.setName('隨緣濟世');
  });
  ss.getSheets().forEach(sh => { if (!sh.getFormUrl() && ss.getSheets().length > 1 && sh.getLastRow() === 0) ss.deleteSheet(sh); });

  // 報名編號觸發器
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === '自動編號') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('自動編號').forSpreadsheet(ss).onFormSubmit().create();

  const msg = [
    '✅ 建立完成！',
    '回覆試算表：' + ss.getUrl(),
    '法會報名（編輯）：' + ce.getEditUrl(),
    '隨緣濟世（編輯）：' + js.getEditUrl(),
    '',
    '👇 請把下面這段貼到網站 config.js 的 google_forms：',
    "  google_forms: {",
    "    ceremony: '" + ce.getPublishedUrl() + "',",
    "    jishi: '" + js.getPublishedUrl() + "',",
    "  },",
  ].join('\n');
  Logger.log(msg);
}

function buildCeremonyForm_() {
  const f = FormApp.create(TEMPLE + '・法會線上報名');
  f.setDescription('選擇法會與項目，填寫資料後依指示匯款或至本宮現場繳費。\n\n' + BANK_TEXT +
                   '\n\n匯款後請回填帳號後五碼，以利廟方核帳。');
  f.setConfirmationMessage('🙏 報名完成！功德無量。\n報名編號將寄到您填寫的 Email（若有填寫）。\n選擇匯款者請記得回報帳號後五碼；現場付現請至本宮服務台繳納。');
  f.addListItem().setTitle('法會名稱').setChoiceValues(CEREMONIES).setRequired(true);
  f.addMultipleChoiceItem().setTitle('報名項目').setChoiceValues(CEREMONY_ITEMS).setRequired(true);
  f.addTextItem().setTitle('數量').setValidation(FormApp.createTextValidation()
    .requireNumberBetween(1, 99).setHelpText('請輸入 1～99').build()).setRequired(true);
  f.addTextItem().setTitle('報名人姓名').setRequired(true);
  f.addTextItem().setTitle('聯絡電話').setValidation(PHONE_RULE()).setRequired(true);
  f.addTextItem().setTitle('地址').setRequired(true);
  f.addParagraphTextItem().setTitle('參加／祈福名單（一行一位，可含生辰）')
    .setHelpText('例：林大德 甲午年三月初三日 吉時');
  f.addMultipleChoiceItem().setTitle('付款方式').setChoiceValues(['🏦 匯款支付', '💰 現場付現']).setRequired(true);
  f.addTextItem().setTitle('匯款帳號後五碼（選擇匯款者填寫）').setValidation(FormApp.createTextValidation()
    .requireTextMatchesPattern('^\\d{5}$').setHelpText('請輸入 5 位數字').build());
  f.addTextItem().setTitle('電子郵件（選填，寄送報名編號）').setValidation(EMAIL_RULE());
  f.addParagraphTextItem().setTitle('備註');
  return f;
}

function buildJishiForm_() {
  const f = FormApp.create(TEMPLE + '・隨緣濟世報名');
  f.setDescription('請填寫基本資料與欲請示之事，報名完成後會取得報名編號，濟世當天報上編號或姓名即可。');
  f.setConfirmationMessage('🙏 報名完成！\n報名編號將寄到您填寫的 Email（若有填寫）；濟世當天報上姓名與電話亦可。');
  f.addTextItem().setTitle('姓名').setRequired(true);
  f.addTextItem().setTitle('電話').setValidation(PHONE_RULE()).setRequired(true);
  f.addTextItem().setTitle('生辰').setHelpText('例：甲午年三月初三日 吉時（或國曆 2000/10/10 上午10點）').setRequired(true);
  f.addTextItem().setTitle('住址').setHelpText('例：雲林縣斗六市…').setRequired(true);
  f.addParagraphTextItem().setTitle('所要請示的事情')
    .setHelpText('例：家中長輩身體欠安，請示調養方向與化解之道。').setRequired(true);
  f.addTextItem().setTitle('電子郵件（選填，寄送報名編號）').setValidation(EMAIL_RULE());
  return f;
}

/** 每筆新報名：產生報名編號、寄信 */
function 自動編號(e) {
  const sh = e.range.getSheet(), row = e.range.getRow();
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const isJishi = sh.getName() === '隨緣濟世' || headers.indexOf('所要請示的事情') >= 0;
  let col = headers.indexOf('報名編號') + 1;
  if (!col) { col = headers.filter(String).length + 1; sh.getRange(1, col).setValue('報名編號').setFontWeight('bold'); }

  const today = Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyyMMdd');
  const prefix = (isJishi ? 'JS' : 'CE') + today + '-';
  const used = row > 2 ? sh.getRange(2, col, row - 2, 1).getValues().flat().filter(v => String(v).indexOf(prefix) === 0).length : 0;
  const regNo = prefix + ('00' + (used + 1)).slice(-3);
  sh.getRange(row, col).setValue(regNo);

  const v = e.namedValues || {};
  const get = k => (Object.keys(v).find(x => x.indexOf(k) === 0) ? v[Object.keys(v).find(x => x.indexOf(k) === 0)][0] : '');
  const name = get(isJishi ? '姓名' : '報名人姓名'), mail = get('電子郵件');
  const kind = isJishi ? '隨緣濟世' : '法會報名（' + get('法會名稱') + '）';
  if (mail) {
    MailApp.sendEmail(mail, `【${TEMPLE}】${kind}報名完成・編號 ${regNo}`,
      `${name} 善信您好：\n\n您的${kind}報名已完成。\n報名編號：${regNo}\n\n` +
      (isJishi ? '濟世當天請報上編號或姓名即可。' : (get('付款方式').indexOf('匯款') >= 0 ? BANK_TEXT + '\n\n' : '') + '感謝您的護持，功德無量。') +
      `\n\n${TEMPLE} 敬上`);
  }
  if (NOTIFY_TEMPLE) {
    const body = Object.keys(v).map(k => `${k}：${v[k].join(', ')}`).join('\n');
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(), `【新報名】${kind} ${regNo} ${name}`, body);
  }
}
