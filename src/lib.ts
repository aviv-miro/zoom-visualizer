import { setupFPSCounter } from "./fpsCounter";
import { setupGauge, updateGauge } from "./gauge";

// Create and setup canvas
const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.id = "visualization-canvas";
canvas.width = 100; // Set the width of the canvas
canvas.height = 300; // Set the height of the canvas
canvas.style.position = "fixed";
canvas.style.right = "0";
canvas.style.top = "50%";
canvas.style.transform = "translateY(-50%)";
canvas.style.backgroundColor = "#184357"; // Dark background
canvas.style.border = "1px solid #2f6e8c";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Unable to get canvas rendering context");

// setup clear rect with requestAnimationFrame
function clearRectSetup(ctx: CanvasRenderingContext2D) {
  requestAnimationFrame(() => clearReact(ctx));
}
function clearReact(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(() => clearReact(ctx));
}

clearRectSetup(ctx);
setupGauge(ctx);
setupFPSCounter(ctx);

window.addEventListener(
  "wheel",
  (event: WheelEvent) => {
    event.preventDefault();
    console.log("wheel event", event.deltaY);
    updateGauge(event.deltaY);
  },
  { passive: false },
);
