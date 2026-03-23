// src/features/chat/pages/Dashboard.jsx
import React, { useEffect, useRef } from "react";
import { useAuth } from "../../auth/hook/useAuth";

const Dashboard = () => {
  const { handleGetMe } = useAuth();
  const canvasRef = useRef(null);

 useEffect(() => {
  handleGetMe();

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 18;
  const cols = Math.floor(canvas.width / fontSize);
  const rows = Math.floor(canvas.height / fontSize);

  let mouseX = -1000;
  let mouseY = -1000;

  canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.08)"; // low opacity
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const char =
          letters[Math.floor(Math.random() * letters.length)];

        let posX = x * fontSize;
        let posY = y * fontSize;

        // 🎯 distance from mouse
        const dx = posX - mouseX;
        const dy = posY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let scale = 1;

        // 🧠 fish-eye effect
        if (dist < 150) {
          scale = 1 + (150 - dist) / 80;
        }

        ctx.save();
        ctx.translate(posX, posY);
        ctx.scale(scale, scale);

        ctx.fillText(char, 0, 0);

        ctx.restore();
      }
    }

    requestAnimationFrame(draw);
  };

  draw();

  return () => {};
}, []);
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* MATRIX BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10"></div>

      {/* CENTER CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center">
        
        <h1 className="text-6xl font-bold text-red-500 glow-text">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-300 text-lg">
          Welcome to your system
        </p>

      </div>
    </div>
  );
};

export default Dashboard;