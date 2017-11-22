module.exports = {
  method: "POST",
  path: "/api/games/create",
  config: {
    auth: { mode: "optional" },
    handler: function (request, reply) {
      let game = new this.models.Game(request.payload);
      game
        .save()
        .then(res => reply(res))
        .catch(err => reply(err));
    }
  }
}