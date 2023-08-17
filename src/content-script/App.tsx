import React, { useRef } from "react";
import { FaPython } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import CodeBlockButton from "../components/CodeBlockButton";
import ControlComponent from "../components/ControlComponent";

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