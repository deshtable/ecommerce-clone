const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const sheets = google.sheets("v4");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

/**
 * @param {*} postString
 * @param {*} loc 'receipt' or 'login'
 */
function runApi(call) {
  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    // call = main.bind(this, postString);
    authorize(JSON.parse(content), call);
  });
}

/*
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function receipts(message, auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: "1PtCPP7aVYhs1ueA4wMlJNanoyEsb7MOIO5uusPbfcNg",
      range: "Sheet1!A1:A1",
      valueInputOption: "RAW", // TODO: Update placeholder value.
      insertDataOption: "INSERT_ROWS", // TODO: Update placeholder value.
      resource: { values: [[message]] },
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
    }
  );
}

function login(accountInfo, auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.append(
    {
      // spreadsheetId: "1LTn65aQZ2DT134SJ9NuvYVcI6sHN14YJ-4JrRRHQhK0/edit#gid=0",
      spreadsheetId: "1LTn65aQZ2DT134SJ9NuvYVcI6sHN14YJ-4JrRRHQhK0",
      range: "Sheet1!C2:C2",
      valueInputOption: "RAW", // TODO: Update placeholder value.
      insertDataOption: "INSERT_ROWS", // TODO: Update placeholder value.
      resource: {
        range: "Sheet1!C:C",
        majorDimension: "COLUMNS",
        values: [[accountInfo.username], [accountInfo.password]],
      },
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
    }
  );
}

module.exports = { runApi, receipts, login };
