import React, { useCallback, useState } from 'react';

interface BackgroundProps {
  children: React.ReactNode;
}

function Background({ children }: BackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  return (
    <div 
      className="h-screen flex flex-col relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* DAW Background */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="daw-grid"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
          } as React.CSSProperties}
        ></div>
        <div className="waveform-bg"></div>
      </div>
      {children}
    </div>
  );
}

export default Background;