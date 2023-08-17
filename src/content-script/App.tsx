import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { cn } from "../utils";
import { throttle } from "lodash";
import { FaPython } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

// render the children of this component above the element using rect coordinates
type ControlComponentProps = {
  element: HTMLElement;
  children: React.ReactNode;
};
// pass in the children to render above the element
const ControlComponent: React.FC<ControlComponentProps> = ({ element, children }) => {
  // add margin to the bottom of the element
  element.style.marginBottom = "40px";
  const [elementDimensions, setElementDimensions] = useState(element.getBoundingClientRect());

  const handleResize = useCallback(
    throttle(() => {
      setElementDimensions(element.getBoundingClientRect());
    }, 200),
    [element]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setElementDimensions(element.getBoundingClientRect());
  }, [element]);

  // use tailwind to style the component
  return (
    <div
      style={{
        top: `${elementDimensions.top + elementDimensions.height}px`,
        left: `${elementDimensions.left}px`,
        width: `${elementDimensions.width}px`,
        height: `1px`,
      }}
      className="absolute isolate z-[5000] flex flex-row justify-start gap-2 items-start px-2"
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const textArea = document.getElementById("prompt-textarea") as HTMLTextAreaElement | null;

  return (
    <div>
      {textArea && (
        <ControlComponent element={textArea}>
          <CodeBlockButton textArea={textArea} icon={<FaPython />} language="python" />
          {/* TypeScript */}
          <CodeBlockButton textArea={textArea} icon={<SiTypescript />} language="typeScript" />
        </ControlComponent>
      )}
    </div>
  );
};

export default App;

type CodeBlockButtonProps = {
  textArea: HTMLTextAreaElement;
  icon: React.ReactNode;
  language: string;
};

const codeTag = "```";

const CodeBlockButton: React.FC<CodeBlockButtonProps> = ({ textArea, icon, language }) => {
  return (
    <button
      onClick={async () => {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selection = textArea.value.substring(selectionStart, selectionEnd);
        const before = textArea.value.substring(0, selectionStart);
        const after = textArea.value.substring(selectionEnd);

        // set the value to the text before the cursor, the code tag, language, selection, code tag, and the text after the cursor
        textArea.value =
          before +
          codeTag +
          language +
`
` +
          selection +
`
` +
          codeTag +
          after;

        // set the cursor position to the end of the code tag and language
        textArea.selectionStart = selectionStart + codeTag.length + language.length + 1;
        textArea.selectionEnd = selectionStart + codeTag.length + language.length + 1;

        // focus the text area
        textArea.focus();

        // trigger the input event
        textArea.dispatchEvent(new Event("input", { bubbles: true }));
        
      }}
      className="z-[50001] mt-4 my-2 rounded-md bg-slate-500 bg-opacity-90 text-slate-100 px-2 py-1"
      aria-label={language}
    >
      {icon}
    </button>
  );
};
