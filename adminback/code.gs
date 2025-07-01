const SHEET_ID = '1tHULMMx8OmglWMBa4mLK17P9LVXVlgSVyv69Rh6WfTQ';
const SHEET_NAME = '工作表1';

// 統一回傳 JSON 並加上 CORS 標頭
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// 處理瀏覽器的預檢 (OPTIONS)
function doOptions(e) {
  return jsonResponse({ status: 'ok' });
}

// GET: 讀取、搜尋與排序
function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  let data = values.slice(1).map((row, i) => {
    const rec = {};
    headers.forEach((h, j) => rec[h] = row[j]);
    rec.rowNumber = i + 2;
    return rec;
  });

  // 搜尋功能
  if (e.parameter.searchTerm) {
    const term = e.parameter.searchTerm.toLowerCase();
    data = data.filter(rec =>
      Object.values(rec)
        .some(v => v.toString().toLowerCase().includes(term))
    );
  }

  // 排序功能 (依日期 + 時間)
  if (e.parameter.sortOrder) {
    data.sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}`);
      const db = new Date(`${b.date}T${b.time}`);
      return da - db;
    });
    if (e.parameter.sortOrder.toLowerCase() === 'desc') data.reverse();
  }

  return jsonResponse({ records: data });
}

// POST: 新增與刪除
function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ status: 'error', message: '無效的 JSON' });
  }

  if (payload.action === 'submit') {
    const row = [
      payload.name || '',
      payload.phone || '',
      payload.carModel || '',
      payload.plate || '',
      payload.service || '',
      payload.date || '',
      payload.time || ''
    ];
    sheet.appendRow(row);
    return jsonResponse({ status: 'success', message: '預約已儲存' });
  }

  if (payload.action === 'delete') {
    const r = parseInt(payload.rowNumber, 10);
    if (r > 1) {
      sheet.deleteRow(r);
      return jsonResponse({ status: 'success', message: '刪除成功' });
    }
    return jsonResponse({ status: 'error', message: '無效的列編號' });
  }

  return jsonResponse({ status: 'error', message: '未知的操作' });
}