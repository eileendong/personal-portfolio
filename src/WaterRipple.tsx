import { useEffect, useRef } from "react";

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("🌊 WaterRipple mounted ✅");

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // track active ripples
    const ripples: { x: number; y: number; radius: number; alpha: number }[] = [];

    // helper: add ripple
    const addRipple = (x: number, y: number) => {
      ripples.push({ x, y, radius: 0, alpha: 1 });
    };

    // create an ocean gradient
    const createOceanGradient = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#003366");   // deep navy top
      grad.addColorStop(0.5, "#005577"); // rich cyan
      grad.addColorStop(1, "#000c1f");   // deep abyss
      return grad;
    };

    // draw loop
    const draw = () => {
      ctx.fillStyle = createOceanGradient();
      ctx.fillRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3;
        r.alpha *= 0.97;

        if (r.alpha <= 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        g.addColorStop(0, `rgba(80,200,255,${r.alpha * 0.9})`);
        g.addColorStop(0.3, `rgba(0,150,255,${r.alpha * 0.5})`);
        g.addColorStop(1, "transparent");

        ctx.globalCompositeOperation = "lighter"; // ensures glow
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // gentle automatic random ripples
      if (Math.random() < 0.04) {
        addRipple(Math.random() * width, Math.random() * height);
      }

      requestAnimationFrame(draw);
    };

    // listen for mouse moves
    const handleMouseMove = (e: MouseEvent) => addRipple(e.clientX, e.clientY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        width: "100vw",
        height: "100vh",
        filter: "blur(6px) brightness(1.7) saturate(1.6)",
      }}
    ></canvas>
  );
}
