const express = require("express");
const apiTest = require("./apicalls");
const {sendEmail} = require("./email");

const app = express();
app.use(express.static("client"));

app.use(express.json());
var path = require("path");
const { gmail } = require("googleapis/build/src/apis/gmail");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "website.html"));
});

app.post("/checkout", (req, res) => {
  sendEmail("deshspo@gmail.com", assembleString(req.body));
  apiTest.runApi(apiTest.receipts.bind(this, assembleString(req.body)));
  //   apiTest.runApi(assembleString(req.body), "receipt");
  res.redirect("/");
});

app.post("/login", (req, res) => {
  console.log(req.body.username, req.body.password);
  apiTest.runApi(apiTest.login.bind(this, req.body));
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
