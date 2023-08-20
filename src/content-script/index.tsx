// src/content-script/index.tsx
import ReactDOM from "react-dom/client";
import "./index.css";
import { BsFiletypeHtml } from "react-icons/bs";
import { FaPython, FaMarkdown, FaJava } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiC, SiCplusplus } from "react-icons/si";
import { BiText } from "react-icons/bi";
import CodeBlockButton from "../components/CodeBlockButton";
import { FC, useState } from "react";
import { cn } from "../utils";
import { useHeaderContentLogger } from "./state";

const ToolBar: FC<{ children: React.ReactNode }> = ({ children }) => {
  useHeaderContentLogger();

  return <div className="w-full">{children}</div>;
};

const promptTextArea = document.getElementById("prompt-textarea") as HTMLTextAreaElement | null;

if (promptTextArea) {
  const parent = promptTextArea.parentElement?.parentElement;

  if (!parent) {
    throw new Error("Parent element not found");
  }

  // add a div to the parent element
  const renderDivPromptTextArea = document.createElement("div");
  renderDivPromptTextArea.id = "prompt-textarea-container";
  parent.appendChild(renderDivPromptTextArea);

  // render the app
  const rootPromptTextArea = ReactDOM.createRoot(renderDivPromptTextArea);
  rootPromptTextArea.render(
    <ToolBar>
      <div className="max-w-[400px] rounded-md p-2 gap-x-2 overflow-x-scroll flex flex-row justify-between dark:text-white">
        <CodeBlockButton textArea={promptTextArea} icon={<FaPython />} language="python" />
        <CodeBlockButton textArea={promptTextArea} icon={<SiTypescript />} language="typeScript" />
        <CodeBlockButton textArea={promptTextArea} icon={<BiText />} language="text" />
        <CodeBlockButton textArea={promptTextArea} icon={<FaMarkdown />} language="markdown" />
        <CodeBlockButton textArea={promptTextArea} icon={<BsFiletypeHtml />} language="html" />
        <CodeBlockButton textArea={promptTextArea} icon={<SiJavascript />} language="javaScript" />
        <CodeBlockButton textArea={promptTextArea} icon={<FaJava />} language="java" />
        <CodeBlockButton textArea={promptTextArea} icon={<SiC />} language="c" />
        <CodeBlockButton textArea={promptTextArea} icon={<SiCplusplus />} language="c++" />
      </div>
    </ToolBar>
  );
}

// get the chatHistoryPanel by using the aria-label: Chat history. Its a nav element
const chatHistoryPanel = document.querySelector('[aria-label="Chat history"]') as HTMLDivElement | null;

// boolean toggle to  "enable chat history"

if (chatHistoryPanel) {
  // add a div to the chatHistoryPanel
  const renderDivChatHistoryPanel = document.createElement("div");
  renderDivChatHistoryPanel.id = "chat-history-panel-container";

  // get the second-to-last child of the chatHistoryPanel
  const secondToLastChild =
    chatHistoryPanel.lastElementChild?.previousElementSibling || chatHistoryPanel.lastElementChild;

  // inject into the chatHistoryPanel as the second from last node
  if (secondToLastChild) {
    chatHistoryPanel.insertBefore(renderDivChatHistoryPanel, secondToLastChild.nextSibling);
  } else {
    // If there are no children, just append it
    chatHistoryPanel.appendChild(renderDivChatHistoryPanel);
  }

  // render the app
  const rootChatHistoryPanel = ReactDOM.createRoot(renderDivChatHistoryPanel);
  rootChatHistoryPanel.render(
    // simple hello world in nice looking card
    <div className="h-[50vh] text-white w-full flex flex-col justify-center items-center border-gray-700  border  rounded-xl my-4">
      Offline History
    </div>
  );
}
