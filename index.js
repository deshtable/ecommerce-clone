const express = require("express");
const apiCalls = require("./apicalls");
const { sendEmail } = require("./email");

const app = express();
app.use(express.static("client"));

app.use(express.json());
var path = require("path");
const { gmail } = require("googleapis/build/src/apis/gmail");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "createAccount.html"));
});
app.get("/login", (req, res) => {
  res.send("Login Page");
});

app.post("/checkout", (req, res) => {
  sendEmail("deshspo@gmail.com", assembleString(req.body));
  apiCalls.runApi(apiCalls.receipts.bind(this, assembleString(req.body)));
  //   apiCalls.runApi(assembleString(req.body), "receipt");
  res.redirect("/");
});

app.post("/createAccount", async (req, res) => {
  // console.log(req.body);
  const verified = await apiCalls.verifyAccount(req.body);
  console.log(verified);
  if (verified) {
    apiCalls.createAccountDBEntry(req.body);
    // res.redirect("/login");
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
