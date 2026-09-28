/**
 * Skyflix Media Creative Academy — application intake.
 *
 * Paste this into the Apps Script editor of the Google Sheet that should hold
 * applications (Extensions → Apps Script), then follow SETUP.md in this folder.
 *
 * The website POSTs { secret, columns, row } as JSON. This script checks the
 * secret, makes sure the header row matches `columns`, and appends `row`.
 */

var SHEET_NAME = 'Applications';
var SCRIPT_VERSION = 2;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var payload = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var expected = (props.getProperty('SHARED_SECRET') || '').trim();

    if (!expected) {
      return json_({ ok: false, error: 'no-secret-set' });
    }
    if (String(payload.secret || '').trim() !== expected) {
      return json_({ ok: false, error: 'unauthorised' });
    }

    // The website's status check: prove the sheet is reachable, write nothing.
    if (payload.dryRun) {
      var book = getBook_();
      return json_({ ok: true, spreadsheet: book.getName(), version: SCRIPT_VERSION });
    }

    if (!payload.columns || !payload.row) {
      return json_({ ok: false, error: 'bad payload' });
    }

    // Two applicants submitting at the same moment must not overwrite a row.
    lock.waitLock(20000);

    var sheet = getSheet_();
    var headers = ensureHeaders_(sheet, payload.columns);
    var values = headers.map(function (name) {
      return safeCell_(payload.row[name]);
    });
    sheet.appendRow(values);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Visiting the web app URL in a browser just confirms it is deployed. */
function doGet() {
  return json_({ ok: true, service: 'skyflix-academy-intake', version: SCRIPT_VERSION });
}

/**
 * The sheet this script belongs to. If the script was created on its own
 * (script.google.com rather than Extensions → Apps Script in the sheet), set a
 * SHEET_ID script property to the ID in the sheet's URL:
 * docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 */
function getBook_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id.trim());
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error('no-sheet: script is not attached to a sheet and SHEET_ID is not set');
  }
  return active;
}

function getSheet_() {
  var book = getBook_();
  return book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
}

/**
 * Writes the header row on first use, and appends any new columns the website
 * starts sending later, without moving existing data around.
 */
function ensureHeaders_(sheet, columns) {
  var lastCol = sheet.getLastColumn();
  var headers = lastCol > 0
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String)
    : [];

  var missing = columns.filter(function (name) {
    return headers.indexOf(name) === -1;
  });

  if (missing.length) {
    headers = headers.filter(function (h) { return h !== ''; }).concat(missing);
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setValues([headers]);
    range.setFontWeight('bold').setBackground('#050505').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return headers;
}

/**
 * Applicant text must never run as a spreadsheet formula. Anything starting
 * with = + - @ is stored as plain text by prefixing an apostrophe.
 */
function safeCell_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return value;
  var text = String(value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
