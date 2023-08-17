import React from "react";

type TextAreaControlProps = {
  textAreaElement: HTMLTextAreaElement;
};

const TextAreaControl: React.FC<TextAreaControlProps> = ({ textAreaElement }) => {

  const handlePythonButtonClick = () => {
    const startTag = "```python\n";
    const endTag = "```";
    const value = textAreaElement.value;
    const cursorPosition = textAreaElement.selectionStart;

    textAreaElement.value = value.substring(0, cursorPosition) + startTag + endTag + value.substring(cursorPosition);
    textAreaElement.selectionStart = cursorPosition + startTag.length;
    textAreaElement.selectionEnd = cursorPosition + startTag.length;
  };

  return (
    <div className="toolbar">
      <button onClick={handlePythonButtonClick}>Python</button>
    </div>
  );
};

export default TextAreaControl;
