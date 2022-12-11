import './styles.css';
import Ball from './ball';

window.onload = function() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = 1200;
  canvas.height = 600;

  const ctx = canvas.getContext('2d')!;

  const acceleration = 0.098;

  const ball = new Ball(600, 100, 25, ctx);
  const balls = createBalls(ctx, 10);
  let selectedBall: Ball | null = null;

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;

    if (selectedBall) {
      selectedBall.cx = event.offsetX;
      selectedBall.cy = event.offsetY;
    }
  });

  window.addEventListener('mouseup', (event) => {
    selectedBall = null;
  });

  window.addEventListener('mousedown', (event) => {
    // click detection
    const ballsReversed = balls.slice(0).reverse();
    const hits: Ball[] = [];
    for (const ball of ballsReversed) {
      if (isBallHit(ball, event.offsetX, event.offsetY)) {
        hits.push(ball);
      }
    }
    selectedBall = hits.length === 0 ? null: hits[0];


    if ((event.metaKey || event.ctrlKey) && event.button === 0) {
      console.log('cmd + left click')
    }

    if (event.altKey && event.shiftKey && event.button === 0) {
      console.log('alt + shift + left click')
    }
  });


  animate();



  let lastBounceTime: number | null = null;
  function animate() {
    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ball.dy += acceleration;
      ball.cy += ball.dy;

      const timeToLastBounceOk = !lastBounceTime ||  ((+ new Date()) - lastBounceTime) > 1000;
      if (timeToLastBounceOk && distanceToBall(ball, mouseX, mouseY) <= ball.r) {
        // bounce the ball
        lastBounceTime = +new Date();
        ball.dy *= -1;
      }

      ball.draw();

      for (let ball of balls) {
        ball.draw();
      }

      animate();
    });
  }


}

function isBallHit(ball: Ball, mouseX: number, mouseY: number) {
  return distanceToBall(ball, mouseX, mouseY) < ball.r;
}

function distanceToBall(ball: Ball, mouseX: number, mouseY: number) {
  return Math.sqrt((ball.cx - mouseX) ** 2 + (ball.cy - mouseY) ** 2);
}

function createBalls(ctx: CanvasRenderingContext2D, n: number): Ball[] {
  const balls: Ball[] = [];
  for (let i=0; i<n; i++) {
    const cx = getRandomInt(100, 1100);
    const cy = getRandomInt(100, 500);
    const radius = getRandomInt(25, 100);
    const ball = new Ball(cx, cy, radius, ctx);
    ball.fillStyle = getRandomColor();
    balls.push(ball);
  }
  return balls;
}


function getRandomInt(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

function getRandomColor() {
  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);

  return `rgba(${r}, ${g}, ${b}, 1)`
}
