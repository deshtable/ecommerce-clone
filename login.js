const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const user = {
  username: "test-user",
  passwordHash: "bcrypt-hashed-password",
  id: 1,
};

createUser(username, password, (err, user) => {
  app.post;
});
findUser(username, (err, user) => {});
passport.use(new LocalStrategy((username, password, done) => {}));

//
