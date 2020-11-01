document.body.innerHTML = null;
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const w = 1000 //+prompt('width') || 300;
const h = 1000 //+prompt('height') || 300;

const ctx = canvas.getContext('2d');
let imageData = ctx.createImageData(w, h);

let cells = Array(w * h).fill(1);

cells = cells.map(i => [0, 1][Math.floor(Math.random() * 2)]);

function step(cells, w) {
  let buffer = [];
  for (let i = 0; i < cells.length; i++) {
    let neighbors = 0;
    if (cells[i - 1]) neighbors++
    if (cells[i + 1]) neighbors++
    if (i >= w) {
      if (cells[i - w]) neighbors++
      if (cells[i - w - 1]) neighbors++
      if (cells[i - w + 1]) neighbors++
    }
    if (i + w < cells.length) {
      if (cells[i + w]) neighbors++
      if (cells[i + w - 1]) neighbors++
      if (cells[i + w + 1]) neighbors++
    }
    buffer[i] = +(!cells[i] && neighbors === 3 || cells[i] && (neighbors === 2 || neighbors === 3))
  }
  return buffer;
}

function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Iterate through every pixel
  for (let i = 0; i < cells.length; i++) {
    imageData.data[i * 4 + 0] = cells[i] * 255;
    imageData.data[i * 4 + 1] = cells[i] * 255;
    imageData.data[i * 4 + 2] = cells[i] * 255;
    imageData.data[i * 4 + 3] = 255;

  }

  // Draw image data to the canvas
  ctx.putImageData(imageData, 0, 0);

  cells = step(cells, w);
}

draw();
// canvas.addEventListener('click', draw);