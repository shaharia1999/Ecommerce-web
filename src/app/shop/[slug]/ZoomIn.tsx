import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  // Unified handler for both Mouse and Touch
  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      // DESKTOP EVENTS
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      // MOBILE EVENTS (Adds zoom support for touchscreens)
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchStart={() => setIsZooming(true)}
      onTouchEnd={() => setIsZooming(false)}
      // Changed h-96 to a responsive height so it looks better on small screens
      className="relative overflow-hidden rounded-xl bg-gray-100 h-72 md:h-96 w-full"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        // KEY FIX: object-contain ensures the diagram isn't cut off
        className={`object-contain p-4 transition-transform duration-300 ${
          isZooming ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
      />
    </div>
  );
};

export default ZoomImage;