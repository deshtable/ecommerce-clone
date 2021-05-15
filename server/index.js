const express = require("express");
const apiCalls = require("./apicalls");
const { sendEmail } = require("./email");
var path = require("path");

const clientPath = path.join(__dirname, "..", "client", "dist");

const app = express();
app.use(express.static(clientPath));

app.use(express.json());

app.get("/*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.post("/checkout", (req, res) => {
  const receiptMsg = assembleString(req.body);
  sendEmail("deshspo@gmail.com", receiptMsg);
  apiCalls.runApi(apiCalls.receipts.bind(this, receiptMsg));
  res.redirect("/");
});

app.post("/createAccount", async (req, res) => {
  const verified = await apiCalls.verifyAccount(req.body);
  console.log(verified);
  if (verified) {
    apiCalls.createAccountDBEntry(req.body);
    res.json({ alreadyExists: false });
  } else {
    res.json({ alreadyExists: true });
  }
});

app.post("/login", (req, res) => {
  console.log(req.body.username, req.body.password);
  apiCalls.runApi(apiCalls.login.bind(this, req.body));
});

function assembleString(body) {
  const result = ["Receipt"];
  for (item in body) {
    result.push(item + " has a quantity of " + body[item]);
  }
  return result.join("\n");
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
