const SHEET_ID = '1tHULMMx8OmglWMBa4mLK17P9LVXVlgSVyv69Rh6WfTQ';
const SHEET_NAME = '工作表1';

// 匯入 HTML/JS 模板
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// GET：依參數回傳登入頁、後台頁或 JSON 資料
function doGet(e) {
  // JSON 端點
  if (e.parameter.json === 'true') {
    return getJson(e);
  }
  // 後台頁面
  if (e.parameter.page === 'admin') {
    return HtmlService.createTemplateFromFile('admin')
      .evaluate()
      .setTitle('益福汽車 - 後台預約管理');
  }
  // 預設：登入頁面
  return HtmlService.createTemplateFromFile('login')
    .evaluate()
    .setTitle('益福汽車 - 後台登入');
}

// JSON 端點：讀取、搜尋與排序
function getJson(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  const headers = values.shift(); // 取出標題列
  let data = values.map((row, i) => {
    const rec = {};
    headers.forEach((h, j) => rec[h] = row[j]);
    rec.rowNumber = i + 2;
    return rec;
  });

  // 搜尋
  if (e.parameter.searchTerm) {
    const term = e.parameter.searchTerm.toLowerCase();
    data = data.filter(rec =>
      Object.values(rec).some(v => v.toString().toLowerCase().includes(term))
    );
  }
  // 排序
  if (e.parameter.sortOrder) {
    data.sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}`);
      const db = new Date(`${b.date}T${b.time}`);
      return da - db;
    });
    if (e.parameter.sortOrder.toLowerCase() === 'desc') data.reverse();
  }

  return ContentService
    .createTextOutput(JSON.stringify({ records: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

// POST：新增與刪除
function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: '無效的 JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

  // 新增
  if (payload.action === 'submit') {
    sheet.appendRow([
      payload.name || '',
      payload.phone || '',
      payload.carModel || '',
      payload.plate || '',
      payload.service || '',
      payload.date || '',
      payload.time || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: '預約已儲存' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  // 刪除
  if (payload.action === 'delete') {
    const r = parseInt(payload.rowNumber, 10);
    if (r > 1) sheet.deleteRow(r);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: '刪除成功' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'error', message: '未知的操作' }))
    .setMimeType(ContentService.MimeType.JSON);
}
