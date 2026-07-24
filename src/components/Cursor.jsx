import { useRef } from "react";
import useCursor from "../hooks/useCursor";
import "./cursor.css";

export default function Cursor() {
  const canvasRef = useRef(null);
  useCursor(canvasRef);

  return <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />;
}
