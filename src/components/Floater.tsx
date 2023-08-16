import React from "react";
import { useState, useEffect, ReactNode, CSSProperties } from "react";

import { Button } from "../components/ui/button";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../utils";

type FloatingDivProps = {
  initialRight: string;
  initialBottom: string;
  className?: string;
  children: ReactNode;
};

const Floater: React.FC<FloatingDivProps> = ({
  children,
  initialRight,
  initialBottom,
  className,
}) => {
  const [right, setRight] = useState<string>(initialRight);
  const [bottom, setBottom] = useState<string>(initialBottom);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const checkBoundaries = (value: number, max: number): number => {
    if (value < 0) return 0;
    if (value > max) return max;
    return value;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleSelectStart = (e: Event) => {
    if (isDragging) e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newRight = checkBoundaries(
      parseInt(right) + (startX - e.clientX),
      window.innerWidth,
    );
    const newBottom = checkBoundaries(
      parseInt(bottom) + (startY - e.clientY),
      window.innerHeight,
    );
    setRight(`${newRight}px`);
    setBottom(`${newBottom}px`);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("selectstart", handleSelectStart as any);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("selectstart", handleSelectStart as any);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleSelectStart]);

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        `
      flex
      flex-col
      gap-4
      items-center
      justify-center

      absolute
      z-[10000]

      p-2
      shadow-lg
      bg-white
      text-black
      rounded-lg
      
      cursor-move
      
      ${isMinimized ? "opacity-30" : "bg-opacity-80"}
      
      transform
      transition
      duration-500
      ease-in-out
      
      hover:shadow-2xl
      hover:-translate-y-1
      hover:opacity-100
    `,
        className,
      )}
      style={
        {
          bottom,
          right,
        } as CSSProperties
      }
    >
      {isMinimized ? (
        <Button onClick={handleToggleMinimize}>Show</Button>
      ) : (
        <>
          <Button
            variant="destructive"
            className="absolute -top-4 -right-4"
            size="icon"
            onClick={handleToggleMinimize}
            aria-label="Close the floating panel"
          >
            <CrossCircledIcon />
          </Button>
          {children}
        </>
      )}
    </div>
  );
};

export default Floater;
