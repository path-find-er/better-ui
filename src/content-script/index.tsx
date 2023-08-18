// src/content-script/index.tsx
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BsFiletypeHtml } from "react-icons/bs";
import { FaPython, FaMarkdown, FaJava } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiC, SiCplusplus } from "react-icons/si";
import CodeBlockButton from "../components/CodeBlockButton";
import renderToDom from "../components/ControlComponent";

const textArea = document.getElementById("prompt-textarea") as HTMLTextAreaElement | null;

if (textArea) {
  const children = (
    <div className="max-w-[400px] rounded-md p-2 gap-x-2 overflow-x-scroll flex flex-row justify-between">
      <CodeBlockButton textArea={textArea} icon={<FaPython />} language="python" />
      <CodeBlockButton textArea={textArea} icon={<SiTypescript />} language="typeScript" />
      <CodeBlockButton textArea={textArea} icon={<FaMarkdown />} language="markdown" />
      <CodeBlockButton textArea={textArea} icon={<BsFiletypeHtml />} language="html" />
      <CodeBlockButton textArea={textArea} icon={<SiJavascript />} language="javaScript" />
      <CodeBlockButton textArea={textArea} icon={<FaJava />} language="java" />
      <CodeBlockButton textArea={textArea} icon={<SiC />} language="c" />
      <CodeBlockButton textArea={textArea} icon={<SiCplusplus />} language="c++" />
    </div>
  );

  const parent = textArea.parentElement?.parentElement;

  if (!parent) {
    throw new Error("Parent element not found");
  }

  // add a div to the parent element
  const div = document.createElement("div");
  div.id = "code-block-button-container";
  parent.appendChild(div);

  // render the app
  const root = ReactDOM.createRoot(div);
  root.render(children);
}
