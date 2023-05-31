const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const cors = require('cors')

const playerRecord = {
  wins: 0,
  losses: 0,
};
const app = express();

app.use(express.json());
app.use(express.static('./public'));
// app.use(express.static('./src'));
// app.use(shuffle());
app.use(cors());

// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
      )
      .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res, next) => {
  try {
    rollbar.log('Got Robots!')
    res.status(200).send(botsArr);
  } catch (error) {
    rollbar.error("ERROR GETTING BOTS", error)
    console.error("ERROR GETTING BOTS", error);
    res.sendStatus(400);
    next();
  }
});

app.get("/api/robots/shuffled", (req, res, next) => {
  try {
    rollbar.log('Shuffling Robots.')
    let shuffled = shuffle(bots);
    res.status(200).send(shuffled);
  } catch (error) {
    rollbar.error("ERROR GETTING SHUFFLED BOTS", error)
    console.error("ERROR GETTING SHUFFLED BOTS", error);
    res.sendStatus(400);
    next();
  }
});

app.post("/api/duel", (req, res) => {
  try {
    const { compDuo, playerDuo } = req.body;
    
    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });
    
    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      rollbar.log('Player One Duel.')
      playerRecord.losses += 1;
      res.status(200).send("You lost!");
    } else {
      rollbar.log('Player One Duel.')
      playerRecord.losses += 1;
      res.status(200).send("You won!");
    }
  } catch (error) {
    rollbar.error("ERROR DUELING", error);
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
    next();
  } 
});

app.get("/api/player", (req, res) => {
  try {
    rollbar.log('Message Four.')
    res.status(200).send(playerRecord);
  } catch (error) {
    rollbar.error("ERROR GETTING PLAYER STATS", error);
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
    next();
  }
});

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '5a791c93d15f4fffb1436e7a05138aaf',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.listen(8000, () => {
  console.log(`Listening on 8000`);
});