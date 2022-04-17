import Brick from "/src/brick.js";

export function buildLevel(game, level) {
  // get a brick instance to grab width and height
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 75 * brickIndex,
          y: 30 + 25 * rowIndex
        };
        bricks.push(new Brick(game, position));
      }
    });
  });
  return bricks;
}

export const level1 = [
  [1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

export const level2 = [
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1]
];

export const level3 = [
  [0, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0]
];
