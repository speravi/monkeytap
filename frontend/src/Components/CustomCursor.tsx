import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../GameContext";
import { getCursorSvg } from "../utils/cursors";

interface CustomCursorProps {
  targetRef: React.RefObject<HTMLElement>;
}

function CustomCursor({ targetRef }: CustomCursorProps) {
  const { state } = useGame();
  const { activeCursor, cursorSize = 24, cursorColor = "#FFFFFF" } = state;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement || activeCursor === "default") return;

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      // Hide native cursor on the target element and all its children
      targetElement.style.cursor = "none";
      // Apply cursor: none to all child elements to prevent default cursor on buttons
      const childElements = targetElement.querySelectorAll("*");
      childElements.forEach((child) => {
        (child as HTMLElement).style.cursor = "none";
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      // Restore native cursor
      targetElement.style.cursor = "default";
      // Restore cursor on all child elements
      const childElements = targetElement.querySelectorAll("*");
      childElements.forEach((child) => {
        (child as HTMLElement).style.cursor = "";
      });
    };

    // Add event listeners
    targetElement.addEventListener("mousemove", handleMouseMove);
    targetElement.addEventListener("mouseenter", handleMouseEnter);
    targetElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      targetElement.removeEventListener("mousemove", handleMouseMove);
      targetElement.removeEventListener("mouseenter", handleMouseEnter);
      targetElement.removeEventListener("mouseleave", handleMouseLeave);
      // Clean up styles
      targetElement.style.cursor = "default";
      const childElements = targetElement.querySelectorAll("*");
      childElements.forEach((child) => {
        (child as HTMLElement).style.cursor = "";
      });
      setIsVisible(false);
    };
  }, [activeCursor, targetRef, cursorSize]);

  // Don't render if default cursor or not visible
  if (activeCursor === "default" || !isVisible) {
    return null;
  }

  const currentSvg = getCursorSvg(activeCursor, cursorSize);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed", // Fixed positioning relative to viewport
        left: cursorPosition.x,
        top: cursorPosition.y,
        transform: "translate(-50%, -50%)", // Center the cursor on the mouse position
        pointerEvents: "none",
        zIndex: 9999,
        color: cursorColor,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
      }}
      dangerouslySetInnerHTML={{ __html: currentSvg }}
    />
  );
}

export default CustomCursor;
