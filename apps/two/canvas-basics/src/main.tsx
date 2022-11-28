window.onload = function() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = 1200;
  canvas.height = 600;

  const ctx = canvas.getContext('2d')!;

  // draw rectangle
  ctx.fillStyle = 'salmon';
  ctx.fillRect(0, 0, 50, 100);

  // draw simple line
  drawSimpleLine(ctx, 'tomato', 100, 100, 'butt');
  drawSimpleLine(ctx, 'dodgerblue', 100, 150, 'square');
  drawSimpleLine(ctx, 'green', 100, 200, 'round');

  // draw line with joins
  drawLineWithJoin(ctx, 'tomato', 250, 50, 'miter');
  drawLineWithJoin(ctx, 'dodgerblue', 275, 75, 'bevel');
  drawLineWithJoin(ctx, 'green', 300, 100, 'round');

  // draw arc
  drawSimpleArc(ctx);

  // draw quadratic curve
  drawQuadraticCurve(ctx);

  // draw bezier curve
  drawBezierCurve(ctx);

  // shapes
  drawRectangle(ctx);
  drawCircle(ctx);
  drawPolygon(ctx, Math.PI / 10, 5);
};

function drawPolygon(ctx: CanvasRenderingContext2D, startAngle: number = 0, edgeCount = 5) {
  const cx = 600;
  const cy = 400;
  const radius = 100;

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'sandyBrown';
  ctx.lineWidth = 5;
  ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();

  const deltaAngle = Math.PI * 2 / edgeCount;
  ctx.strokeStyle = 'crimson';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(deltaAngle * 0 + startAngle) * radius, cy - Math.sin(deltaAngle * 0 + startAngle) * radius);
  for (let i = 1; i <= edgeCount; i++) {
    const numOfDelta = i % (edgeCount);
    ctx.lineTo(cx + Math.cos(deltaAngle * numOfDelta + startAngle) * radius, cy - Math.sin(deltaAngle * numOfDelta + startAngle) * radius);
  }
  ctx.stroke();
}


function drawCircle(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'orange';
  ctx.lineWidth = 5;
  ctx.arc(500, 250, 50, 0, Math.PI * 5 / 4, false);
  ctx.fill();
  ctx.stroke();
}

function drawRectangle(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.strokeStyle = 'Teal';
  ctx.fillStyle = 'silver';
  // ctx.strokeRect(500, 100, 50, 50);
  ctx.rect(500, 100, 50, 50);
  ctx.stroke();
  ctx.fill();
}

function drawBezierCurve(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'LightSeaGreen';
  ctx.moveTo(150, 400);
  ctx.bezierCurveTo(200, 600, 250, 300, 400, 450); // two control points
  ctx.stroke();
}

function drawQuadraticCurve(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'orange';
  ctx.moveTo(150, 300);
  ctx.quadraticCurveTo(400, 500, 450, 275); // one control point
  ctx.stroke();
}

function drawSimpleArc(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 10;
  ctx.arc(300, 300, 50, 0, Math.PI * 3 / 4, false);
  ctx.stroke();
}

function drawSimpleLine(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, lineCap: CanvasLineCap) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineCap = lineCap;
  ctx.lineWidth = 10;
  // ctx.shadowBlur = 5;
  // ctx.shadowColor = 'grey';
  // ctx.shadowOffsetX = 3;
  // ctx.shadowOffsetY = 3;
  ctx.moveTo(x, y);
  ctx.lineTo(x + 50, y);
  ctx.stroke();
}

function drawLineWithJoin(
  ctx: CanvasRenderingContext2D, color: string, x: number, y: number, lineJoin: CanvasLineJoin
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 20;
  ctx.lineJoin = lineJoin;
  ctx.moveTo(x, y);
  ctx.lineTo(x + 100, y);
  ctx.lineTo(x + 100, y + 100);
  ctx.stroke();
}
