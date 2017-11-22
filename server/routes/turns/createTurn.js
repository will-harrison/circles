module.exports = {
  method: "POST",
  path: "/api/games/turns/create",
  config: {
    auth: { mode: "optional" },
    handler: function (request, reply) {
      let turn = this.models.Turn(request.payload);
      turn
        .save()
        .then(res => reply(res))
        .catch(err => reply(err))
    }
  }
}