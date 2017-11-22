module.exports = {
  method: "POST",
  path: "/api/games/user",
  config: {
    auth: { mode: "optional" },
    handler: function (request, reply) {
      let userId = request.payload;
      console.log(userId)
      this.models.Game
        .filter(userId)
        .then(res => reply(res))
        .catch(err => reply(err));
    }
  }
}