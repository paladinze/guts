import './styles.css';
import Ball from './ball';

window.onload = function() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = 1200;
  canvas.height = 600;

  const ctx = canvas.getContext('2d')!;

  const acceleration = 0.098;

  const ball = new Ball(600, 100, 25, ctx);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  });

  animate();

  function distanceToBall(ball: Ball, mouseX: number, mouseY: number) {
    return Math.sqrt((ball.cx - mouseX) ** 2 + (ball.cy - mouseY) ** 2);
  }

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
      animate();
    });
  }


}
