module.exports = (db) => {
  let Turn = db.createModel("Turn", {
    xOffset: db.type.number(),
    yOffset: db.type.number(),
    duration: db.type.number(),
    gameId: db.type.string()
  });

  return Turn;
}