module.exports = (db) => {
  let Game = db.createModel("Game", {
    avgDuration: db.type.number(),
    avgOffset: db.type.number(),
    userId: db.type.string()
  });

  return Game;
}