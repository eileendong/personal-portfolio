import { useEffect, useRef } from 'react';

export function OceanNightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    let waveOffset = 0;

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      radialGradient.addColorStop(0, '#0a0a0a');
      radialGradient.addColorStop(1, '#000000');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 200, ${p.opacity})`;
        ctx.fill();

        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });

      waveOffset += 0.012;

      const drawWave = (
        yBase: number,
        amplitude: number,
        frequency: number,
        offset: number,
        color: string,
        alpha: number,
        secondaryFreq?: number
      ) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 2) {
          const primary = Math.sin(x * frequency + waveOffset + offset) * amplitude;
          const secondary = secondaryFreq
            ? Math.sin(x * secondaryFreq + waveOffset * 0.7 + offset) * (amplitude * 0.3)
            : 0;
          const y = yBase + primary + secondary;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      };

      // Balanced deep-ocean tone — darker, moodier, but still visible beneath glass UI
drawWave(canvas.height * 0.98, 15, 0.002, 0, '#07101c', 0.85, 0.008);
drawWave(canvas.height * 0.95, 22, 0.003, Math.PI / 4, '#091626', 0.75, 0.007);
drawWave(canvas.height * 0.91, 30, 0.004, Math.PI / 2, '#0b1d30', 0.7, 0.009);
drawWave(canvas.height * 0.87, 25, 0.0035, Math.PI, '#0d2338', 0.65, 0.006);
drawWave(canvas.height * 0.82, 38, 0.005, Math.PI * 1.3, '#0e2a42', 0.65, 0.01);
drawWave(canvas.height * 0.77, 20, 0.0045, Math.PI * 1.7, '#102f4b', 0.6, 0.008);
drawWave(canvas.height * 0.72, 26, 0.006, Math.PI / 3, '#113656', 0.55, 0.007);
drawWave(canvas.height * 0.67, 18, 0.0038, Math.PI * 1.9, '#132e45', 0.55, 0.009);

ctx.globalAlpha = 0.25;
const reflectionGradient = ctx.createLinearGradient(0, 0, canvas.width * 0.6, 0);
reflectionGradient.addColorStop(0, "rgba(255, 255, 255, 0.25)");
reflectionGradient.addColorStop(0.15, "rgba(200, 220, 255, 0.08)");
reflectionGradient.addColorStop(0.4, "rgba(150, 180, 255, 0.02)");
reflectionGradient.addColorStop(1, "rgba(255,255,255,0)");
ctx.fillStyle = reflectionGradient;
ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
ctx.globalAlpha = 1;
// === Subtle white crest outline ===
ctx.globalAlpha = 0.15;
ctx.beginPath();
for (let x = 0; x <= canvas.width; x += 2) {
  const y =
    canvas.height * 0.85 +
    Math.sin(x * 0.004 + waveOffset) * 25 +
    Math.sin(x * 0.007 + waveOffset * 0.8) * 10;
  ctx.lineTo(x, y);
}
ctx.strokeStyle = "rgba(255, 255, 255, 0.59)";
ctx.lineWidth = 1;
ctx.shadowBlur = 12;
ctx.shadowColor = "rgba(200, 220, 255, 0.96)";
ctx.stroke();
ctx.shadowBlur = 0;
ctx.globalAlpha = 1;

      ctx.globalAlpha = 0.08;
      for (let i = 0; i < 3; i++) {
        const baseY = canvas.height * (0.87 - i * 0.1);
        const freq = 0.004 + i * 0.001;
        const amp = 25 + i * 5;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = baseY + Math.sin(x * freq + waveOffset + i) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, baseY - amp, 0, baseY + amp);
        gradient.addColorStop(0, 'rgba(100, 150, 180, 0)');
        gradient.addColorStop(0.5, 'rgba(120, 160, 190, 0.4)');
        gradient.addColorStop(1, 'rgba(100, 150, 180, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

   return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />
      {/* Grid overlay - made lighter */}
      <div 
        className="absolute inset-0 opacity-[0.015]" // ↓ was 0.03
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 150, 200, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 150, 200, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Noise texture - much softer */}
      <div 
        className="absolute inset-0 opacity-[0.008]" // ↓ was 0.015
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />
      {/* Vignette - subtle radial fade only at edges */}
      <div 
        className="absolute inset-0 opacity-25" // ↓ was 0.40
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />
    </div>
  );

}
