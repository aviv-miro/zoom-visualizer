let frameCount = 0;
let lastTime = performance.now();
let fps = 0;

export function setupFPSCounter(ctx: CanvasRenderingContext2D) {
  requestAnimationFrame(() => updateFPS(ctx));
}

function updateFPS(ctx: CanvasRenderingContext2D) {
  frameCount++;
  const now = performance.now();
  const deltaTime = now - lastTime;

  if (deltaTime >= 150) {
    fps = Math.round((frameCount / deltaTime) * 1000);
    frameCount = 0;
    lastTime = now;
  }

  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height / 2); // Clear the FPS area
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`FPS: ${fps}`, 10, 30);

  requestAnimationFrame(() => updateFPS(ctx));
}
