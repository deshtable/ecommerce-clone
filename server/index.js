const express = require("express");
const apiCalls = require("./apicalls");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { sendEmail } = require("./email");
const { gmail } = require("googleapis/build/src/apis/gmail");
var path = require("path");

const clientPath = path.join(__dirname, "..", "client", "dist");

const app = express();
app.use(express.static(clientPath));

app.use(express.json());
app.use(passport.initialize());
app.use(session({ secret: "Cats" }));
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await apiCalls.verifyLogin({
      email: username,
      password: password,
    });
    done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const user = await apiCalls.getUser({ email });
  done(null, user);
});

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

app.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log(req.body.username, req.body.password);
  //make sure email i
  console.log(req.user);
  res.json(req.user);
  // apiCalls.runApi(apiCalls.login.bind(this, req.body));
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
