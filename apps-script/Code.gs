/**
 * Sejiwa Digital — penerima lead website → Google Sheet + notifikasi email.
 *
 * Cara pasang (ringkas, detail di README.md):
 * 1. Buat Google Sheet baru → Extensions → Apps Script → paste file ini.
 * 2. Project Settings → Script Properties, tambahkan:
 *      SECRET        = string acak panjang (sama dengan APPS_SCRIPT_SECRET di Vercel)
 *      NOTIFY_EMAIL  = kontak@sejiwadigital.com   (boleh beberapa, pisahkan koma)
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me   |   Who has access: Anyone
 * 4. Copy URL /exec → isi APPS_SCRIPT_URL di Vercel.
 */

var SHEET_NAME = "Leads";

var COLUMNS = [
  "submitted_at", "status", "name", "company", "role", "email", "phone", "services",
  "industry", "website", "company_size", "budget", "timeline", "notes",
  "locale", "page", "form_location",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "ttclid", "landing_page", "referrer"
];

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    var secret = props.getProperty("SECRET") || "";
    if (!secret || body.token !== secret) return json_({ ok: false, error: "unauthorized" });

    var lead = body.lead || {};
    lead.status = "Baru";

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sheet = getSheet_();
      var row = COLUMNS.map(function (k) { return safe_(lead[k]); });
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    notify_(props.getProperty("NOTIFY_EMAIL"), lead);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

// Untuk cek cepat di browser: buka URL /exec → harus muncul {"ok":true,"service":"sejiwa-leads"}
function doGet() {
  return json_({ ok: true, service: "sejiwa-leads" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length)
      .setFontWeight("bold").setBackground("#00268E").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    // Dropdown status lead
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Baru", "Dihubungi", "Meeting", "Proposal", "Deal", "Lost"], true).build();
    sheet.getRange(2, 2, 1000, 1).setDataValidation(rule);
  }
  return sheet;
}

// Cegah formula injection (=, +, -, @) di Google Sheets
function safe_(v) {
  if (v === undefined || v === null) return "";
  var s = String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function notify_(to, lead) {
  if (!to) return;
  var subject = "Lead baru: " + (lead.company || "-") + " (" + (lead.services || "-") + ")";
  var wa = String(lead.phone || "").replace(/\D/g, "").replace(/^0/, "62");
  var lines = [
    "Nama       : " + lead.name + (lead.role ? " (" + lead.role + ")" : ""),
    "Perusahaan : " + lead.company,
    "Email      : " + lead.email,
    "WhatsApp   : " + lead.phone + "  →  https://wa.me/" + wa,
    "Layanan    : " + lead.services,
    "Industri   : " + (lead.industry || "-"),
    "Website    : " + (lead.website || "-"),
    "Ukuran     : " + (lead.company_size || "-"),
    "Budget     : " + lead.budget,
    "Timeline   : " + lead.timeline,
    "",
    "Catatan:",
    lead.notes || "-",
    "",
    "— Sumber —",
    "Halaman    : " + lead.page + " [" + lead.form_location + "]",
    "UTM        : " + [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(String).join(" / "),
    "Click ID   : " + [lead.gclid && "gclid", lead.fbclid && "fbclid", lead.ttclid && "ttclid"].filter(String).join(", "),
    "Landing    : " + (lead.landing_page || "-"),
    "Referrer   : " + (lead.referrer || "-"),
    "",
    "Sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ];
  MailApp.sendEmail({ to: to, subject: subject, body: lines.join("\n"), replyTo: lead.email || undefined });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
