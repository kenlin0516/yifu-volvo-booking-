
function doGet(e) {
  const sheet = SpreadsheetApp.openById("1tHULMMx8OmglWMBa4mLK17P9LVXVlgSVyv69Rh6WfTQ").getSheetByName("工作表1");
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const data = rows.slice(1).map(r => {
    let row = {};
    headers.forEach((h, i) => row[h] = r[i]);
    return row;
  });
  return ContentService.createTextOutput(JSON.stringify({ records: data })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById("1tHULMMx8OmglWMBa4mLK17P9LVXVlgSVyv69Rh6WfTQ").getSheetByName("工作表1");
  const data = JSON.parse(e.postData.contents);
  if (data.action === "delete") {
    const range = sheet.getDataRange();
    const values = range.getValues();
    for (let i = values.length - 1; i > 0; i--) {
      if (values[i][0] === data.timestamp) {
        sheet.deleteRow(i + 1);
        break;
      }
    }
    return ContentService.createTextOutput("Deleted");
  }
  return ContentService.createTextOutput("No action");
}
