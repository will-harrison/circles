// Accepts
// userId: db.type.string()

module.exports = {
  method: "POST",
  path: "/api/games/create",
  config: {
    auth: { mode: "optional" },
    handler: function (request, reply) {
      let { userId } = request.payload;
      let game = new this.models.Game(userId);
      console.log(game)
      game
        .save()
        .then(res => reply(res))
        .catch(err => reply(err));
    }
  }
}