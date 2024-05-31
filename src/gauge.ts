let currentHeight = 50; // Start at 50% (center)
let targetHeight = 50;
let timeoutId: number | null = null;

export function setupGauge(ctx: CanvasRenderingContext2D) {
  requestAnimationFrame(() => drawGauge(ctx));
}

export function updateGauge(deltaY: number) {
  const maxDelta = 90;
  const minDelta = -90;

  targetHeight += (deltaY / (maxDelta - minDelta)) * 100;
  targetHeight = Math.max(0, Math.min(100, targetHeight)); // Clamp between 0 and 100

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    targetHeight = 50;
  }, 15) as unknown as number; // Reduce debounce time for snappier responsiveness
}

function drawGauge(ctx: CanvasRenderingContext2D) {
  const gaugeX = ctx.canvas.width / 2;
  const middleY = ctx.canvas.height / 2;
  // Draw the middle resting line
  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gaugeX - 30, middleY);
  ctx.lineTo(gaugeX + 30, middleY);
  ctx.stroke();

  // Smoothly transition to the target height
  currentHeight += (targetHeight - currentHeight) * 0.9; // Increase speed of transition

  const gaugeHeight = (Math.abs(currentHeight - 50) * ctx.canvas.height) / 100;

  if (currentHeight < 50) {
    ctx.fillStyle = "#00ff00";
  } else {
    ctx.fillStyle = "#ff0000";
  }

  const startY =
    currentHeight < 50
      ? ctx.canvas.height / 2 - gaugeHeight
      : ctx.canvas.height / 2;
  ctx.fillRect(gaugeX - 20, startY, 40, gaugeHeight);

  // targetHeight = 50;

  requestAnimationFrame(() => drawGauge(ctx));
}
