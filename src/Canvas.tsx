import React, { useEffect, useRef } from "react";

export const MatrixEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const charSize = 10; // Base character size
    let charWidth: number = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Set font and measure character width
      ctx.font = `${charSize}px monospace`;
      charWidth = ctx.measureText("M").width; // Measure a typical character
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cols = Math.floor(canvas.width / charWidth); // Columns based on exact character width
    const ypos = Array.from(
      { length: cols },
      () => Math.random() * canvas.height
    ); // Randomize initial positions

    const drawMatrix = () => {
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${charSize}px monospace`; // Set font size dynamically

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * charWidth; // Use exact character width for column spacing
        ctx.fillText(text, x, y);
        if (y > canvas.height + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + charSize; // Vertical step matches font size
      });
    };

    // Draw an initial frame to pre-fill the screen
    drawMatrix();

    // Start the animation loop
    const intervalId = setInterval(drawMatrix, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", background: "#000", margin: 0, padding: 0 }}
    />
  );
};
