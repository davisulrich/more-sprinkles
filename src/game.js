import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1, level2, level3 } from "/src/levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  GAMEWON: 5
};
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAME_STATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = [];
    this.levels = [level1, level2, level3];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAME_STATE.MENU &&
      this.gamestate !== GAME_STATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAME_STATE.GAMEOVER;
    if (
      this.gamestate === GAME_STATE.PAUSED ||
      this.gamestate === GAME_STATE.MENU ||
      this.gamestate === GAME_STATE.GAMEOVER
    )
      return;

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );
    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);

    if (this.bricks.length === 0) {
      if (this.currentLevel === this.levels.length - 1) {
        this.gamestate = GAME_STATE.GAMEWON;
        return;
      }
      this.gamestate = GAME_STATE.NEWLEVEL;
      this.currentLevel++;
      this.start();
    }
  }

  draw(context) {
    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.draw(context)
    );

    if (this.gamestate === GAME_STATE.PAUSED) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(100, 100, 0, 0.5)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAME_STATE.MENU) {
      context.fillStyle = "rgba(0, 0, 255, 0.85)";
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "yellow";
      context.textAlign = "center";
      context.fillText(
        "Welcome to Ice Cream with Extra Sprinkles",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );
      context.font = "24px Arial";
      context.fillStyle = "pink";
      context.fillText(
        "A Game by Davis Ulrich",
        this.gameWidth / 2,
        this.gameHeight / 2 + 100
      );
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2 + 150
      );
      context.drawImage(
        document.getElementById("img_icecream"),
        this.gameWidth / 2 - 30,
        this.gameHeight / 2 - 175,
        80,
        160
      );
    }

    if (this.gamestate === GAME_STATE.GAMEOVER) {
      context.fillStyle = "red";
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        "Jayde Eats Poop",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAME_STATE.GAMEWON) {
      context.fillStyle = "green";
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        "Game Won! So Proud of You!",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  //pause game
  togglePause() {
    if (this.gamestate === GAME_STATE.PAUSED) {
      this.gamestate = GAME_STATE.RUNNING;
    } else {
      this.gamestate = GAME_STATE.PAUSED;
    }
  }
}
