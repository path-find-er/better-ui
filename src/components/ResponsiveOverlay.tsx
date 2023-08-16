import React, { useState, useEffect, useCallback } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { throttle } from "lodash";

type HtmlElementOverlayProps = {
  element: HTMLElement;
  children: React.ReactNode;
};

const ResponsiveOverlay: React.FC<HtmlElementOverlayProps> = ({
  element,
  children,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const [elementDimensions, setElementDimensions] = useState(element.getBoundingClientRect());

  const handleResize = useCallback(throttle(() => {
    setElementDimensions(element.getBoundingClientRect());
  }, 200), [element]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setElementDimensions(element.getBoundingClientRect());
  }, [element]);

  return (
    <div
      style={{
        position: "absolute",
        top: `${elementDimensions.top}px`,
        left: `${elementDimensions.left}px`,
        width: show ? `${elementDimensions.width}px` : "40px",
        height: show ? `${elementDimensions.height}px` : "40px",
      }}
      className="z-50000 absolute isolate bg-slate-300 bg-opacity-90 flex flex-col justify-center items-center gap-8"
    >
      {show ? (
        <button onClick={toggleShow} className="z-50001 w-40 h-40" aria-label="Hide overlay">
          <EyeOpenIcon />
        </button>
      ) : (
        <button onClick={toggleShow} className="absolute top-1 left-1 w-40 h-40" aria-label="Show overlay">
          <EyeClosedIcon />
        </button>
      )}
      {show && children}
    </div>
  );
};

export default ResponsiveOverlay;