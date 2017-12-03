module.exports = {
  method: "POST",
  path: "/api/game/turns/game",
  config: {
    handler: function(request, reply) {
      let { gameId } = request.payload;
      this.models.Turn
        .getAll(gameId, {index: "gameId"})
        .then(reply)
    }
  }
}