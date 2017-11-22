const bcrypt = require("bcrypt-as-promised");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  let User = db.createModel("User", {
    email: db.type.string().required(),
    password: db.type.string().required()
  });

  User.define("generatePassword", function () {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => Object.assign(this, { password: hash }))
      .catch(err => err)
  });

  User.define("comparePassword", function (password) {
    return bcrypt.compare(password, this.password)
      .then(authed => authed ? this : false)
      .catch(bcrypt.MISMATCH_ERROR, () => "Email and password combination are incorrect.")
      .catch(err => err);
  });

  User.define("generateJWT", function () {
    let user = this;
    delete user.password;
    return jwt.sign(Object.assign({}, user),
      process.env.TOKEN_KEY, { algorithm: "HS256" });
  });

  User.pre("save", function (next) {
    return User.filter({ email: this.email })
      .then(users => {
        if (users.length !== 0) throw "Email and password combination are incorrect."
        return this.generatePassword()
          .then(() => next())
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });

  return User;
}