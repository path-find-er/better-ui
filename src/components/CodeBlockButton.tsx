import React from "react";

export type CodeBlockButtonProps = {
  textArea: HTMLTextAreaElement;
  icon: React.ReactNode;
  language: string;
};

const codeTag = "```";
const newline = `
`;

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
        textArea.value = before + codeTag + language + newline + selection + newline + codeTag + after;

        // set the cursor position to the end of the code tag and language
        textArea.selectionStart = selectionStart + codeTag.length + language.length + 1;
        textArea.selectionEnd = selectionStart + codeTag.length + language.length + 1;

        // focus the text area
        textArea.focus();

        // trigger the input event
        textArea.dispatchEvent(new Event("input", { bubbles: true }));
      }}
      className="z-1 mt-4 my-2 rounded-md bg-slate-500 bg-opacity-90 text-slate-100 px-2 py-1"
      aria-label={language}
    >
      {icon}
    </button>
  );
};

export default CodeBlockButton;
