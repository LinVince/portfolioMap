import { Button } from "@mui/material";
import { useState, useEffect } from "react";

interface ResizeButtonProps {
  target: number; // The current width state
  setTarget: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
}

const ResizeButton: React.FC<ResizeButtonProps> = ({
  target,
  setTarget,
  max,
  min,
}) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [startTarget, setStartTarget] = useState<number | null>(null);

  // Event handler for mouse down event on the button
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsResizing(true);
    setStartX(e.clientX);
    setStartTarget(target);
  };

  // useEffect to handle resizing when the mouse moves
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && startX !== null && startTarget !== null) {
        const newWidth = startTarget + (e.clientX - startX);
        if (min <= newWidth && newWidth <= max) {
          setTarget(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners when resizing starts
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Clean up event listeners when the effect runs again or component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startX, startTarget]);

  return (
    <Button onMouseDown={handleMouseDown} style={{ cursor: "ew-resize" }}>
      {"< - >"}
    </Button>
  );
};

export default ResizeButton;
