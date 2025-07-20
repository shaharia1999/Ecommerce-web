import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      className="relative overflow-hidden rounded-xl bg-gray-100 h-96 w-full"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className={`object-cover h-full w-full transition-transform duration-300 ${
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
