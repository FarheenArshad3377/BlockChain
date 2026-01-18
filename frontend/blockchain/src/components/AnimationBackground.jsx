import React from "react";
import "../assets/Animation.css";

const AnimatedBackground = () => {
  const coins = Array.from({ length: 50 }); // 50 coins

  return (
    <div className="animated-bg">
      {coins.map((_, i) => {
        const left = Math.random() * 100; // random horizontal position
        const size = 15 + Math.random() * 25; // size between 15px and 40px
        const duration = 4 + Math.random() * 6; // float duration between 4s and 10s
        const rotateDuration = 2 + Math.random() * 4; // rotate duration between 2s and 6s

        const style = {
          left: `${left}%`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s, ${rotateDuration}s`,
        };

        return (
          <span key={i} className="coin" style={style}>
            $
          </span>
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
