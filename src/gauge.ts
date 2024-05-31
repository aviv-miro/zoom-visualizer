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
  }, 25) as unknown as number; // Reduce debounce time for snappier responsiveness
}

function drawGauge(ctx: CanvasRenderingContext2D) {
  const gaugeX = ctx.canvas.width / 2;

  // Smoothly transition to the target height
  currentHeight += (targetHeight - currentHeight) * 0.2; // Increase speed of transition
  //
  // ctx.clearRect(
  //   0,
  //   ctx.canvas.height / 2,
  //   ctx.canvas.width,
  //   ctx.canvas.height / 2,
  // ); // Clear the gauge area

  ctx.fillStyle = "green";
  const gaugeHeight = (Math.abs(currentHeight - 50) * ctx.canvas.height) / 100;
  const startY =
    currentHeight < 50
      ? ctx.canvas.height / 2 - gaugeHeight
      : ctx.canvas.height / 2;
  ctx.fillRect(gaugeX - 20, startY, 40, gaugeHeight);

  requestAnimationFrame(() => drawGauge(ctx));
}
