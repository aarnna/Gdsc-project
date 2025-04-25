const SHEET_NAME = 'Notes';

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const notes = data.slice(1).map(row => ({ title: row[0], content: row[1] }));
  return ContentService.createTextOutput(JSON.stringify(notes)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const body = JSON.parse(e.postData.contents);
  sheet.appendRow([body.title, body.content]);
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }));
}
