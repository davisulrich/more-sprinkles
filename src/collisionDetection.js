export function detectCollision(ball, gameObject) {
  //check for collision with the paddle
    let bottomOfBall = ball.position.y + ball.size.height;
    let topOfBall = ball.position.y;
    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if (bottomOfBall >= topOfObject && 
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideOfObject && 
        ball.position.x + ball.size.width <= rightSideOfObject) {
      return true;
    } else {
      return false;
    }
}