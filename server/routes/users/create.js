module.exports = {
  method: "POST",
  path: "/api/users/create",
  config: {
    auth: { mode: "optional" },
    handler: function (request, reply) {
      let user = new this.models.User(request.payload);
      user
        .save()
        .then(res => {
          delete res.password;
          return res;
        })
        .then(user => {
          if (!user) throw "Email and password combination are incorrect.";
          return user.generateJWT();
        })
        .then(user => {
          if (!user) throw "Email and password combination are incorrect.";
          reply(JSON.stringify({ token: user }))
        })

        .catch(err => reply(err))
    }
  }
}