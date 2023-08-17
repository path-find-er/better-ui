import React, { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";

type ControlComponentProps = {
  element: HTMLElement;
  children: React.ReactNode;
};
const ControlComponent: React.FC<ControlComponentProps> = ({ element, children }) => {
  element.style.marginBottom = "40px";
  const [elementDimensions, setElementDimensions] = useState(element.getBoundingClientRect());

  const handleChange = useCallback(
    throttle(() => {
      setElementDimensions(element.getBoundingClientRect());
    }, 200),
    [element]
  );

  useEffect(() => {
    const observer = new MutationObserver(handleChange);
    const parent = element.parentElement;
    if (parent) observer.observe(element.parentElement as Node, { childList: true, subtree: true });
    else observer.observe(element, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [element, handleChange]);

  useEffect(() => {
    setElementDimensions(element.getBoundingClientRect());
  }, [element]);

  return (
    <div
      style={{
        top: `${elementDimensions.top + elementDimensions.height}px`,
        left: `${elementDimensions.left}px`,
        width: `${elementDimensions.width}px`,
        height: `1px`,
      }}
      className="absolute isolate z-1 flex flex-row justify-start gap-2 items-start px-2"
    >
      {children}
    </div>
  );
};

export default ControlComponent;
