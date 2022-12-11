
export default class Ball {
   cx;
   cy;
   r;
   ctx;
   dx;
   dy;
  fillStyle: string;

  constructor(cx: number, cy:number, r:number, ctx: CanvasRenderingContext2D) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.ctx = ctx;
    this.dx = 0;
    this.dy = 0;
    this.fillStyle = 'red';
  }

  draw = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    this.ctx.fill();
  }

}
