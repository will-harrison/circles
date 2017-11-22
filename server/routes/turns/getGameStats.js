const avg = (array) => {
  const sum = array.reduce((accumulator, current) => {
    return (accumulator + current);
  });
  return sum / array.length;
}

const max = (array) => {
  return array.reduce((accumulator, current) => {
    return Math.max(accumulator, current)
  });
}

const min = (array) => {
  return array.reduce((accumulator, current) => {
    return Math.min(accumulator, current)
  });
}

module.exports = {
  method: "POST",
  path: "/api/games/turns/stats",
  config: {
    auth: { mode: "optional" },
    handler: function (request, reply) {
      let { gameId } = request.payload;
      console.log(gameId)
      this.models.Turn
        .filter({ gameId })
        .run()
        .then(turns => {
          console.log(turns)
          if (turns.length === 0) {
            return reply(turns)
          }
          turns
            .group("gameId")
            .then(res => {
              console.log(res)
              let turns = {
                gameId: res[0].group,
                avgDuration: avg(res[0].reduction.map(i => i.duration)),
                maxDuration: max(res[0].reduction.map(i => i.duration)),
                minDuration: min(res[0].reduction.map(i => i.duration))
              }
              reply(turns)
            })
        })
        .catch(err => {
          console.log(err)
          reply(err)
        })
    }
  }
}