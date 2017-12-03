require('dotenv').config();
const thinky = require("thinky");

const db = thinky({
  host: "ec2-54-244-61-151.us-west-2.compute.amazonaws.com",
  db: "CircleGame",
  port: "28015",
  username: "rethinkdb",
  password: process.env.RETHINK_PASSWORD,
});
let User = require("./User")(db);
let Game = require("./Game")(db);
let Turn = require("./Turn")(db);

module.exports = {
  User,
  Game,
  Turn
}