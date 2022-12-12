import './styles.css';

window.onload = function() {
  const canvas = document.getElementById('paint-canvas') as HTMLCanvasElement;
  canvas.width = 1200;
  canvas.height = 600;
  const ctx = canvas.getContext('2d')!;

  // common states
  let mouseX = 0;
  let mouseY = 0;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  let isDrawing = false;

  // Handle Colors
  const colors = document.getElementsByClassName('colors')[0];
  colors.addEventListener('click', function(event: Event) {
    const target = event.target as HTMLButtonElement;
    ctx.strokeStyle = target.value;

  });

  // Handle Brushes
  const brushes = document.getElementsByClassName('brushes')[0];
  brushes.addEventListener('click', function(event) {
    const target = event.target as HTMLButtonElement;
    ctx.lineWidth = +target.value;
  });

  // Actions
  const clearButton = document.getElementById('clear') as HTMLButtonElement;
  const saveButton = document.getElementById('save') as HTMLButtonElement;

  clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  saveButton.addEventListener('click', () => {
    const canvasData = canvas.toDataURL();

    const a = document.createElement('a');
    a.href = canvasData;
    a.download = prompt('Enter the file name') ?? 'my-paint';
    a.click();
  });


  /**
   * Mouse Events
   */
  canvas.addEventListener('mousedown', function(event) {
    updateMouseCoordinates(event);
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  });

  canvas.addEventListener('mouseup', function(event) {
    updateMouseCoordinates(event);
    isDrawing = false;
  });

  canvas.addEventListener('mousemove', function(event) {
    updateMouseCoordinates(event);

    if (isDrawing) {
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }
  });

  function updateMouseCoordinates(event: MouseEvent) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  }

};


