// src/content-script/index.tsx
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const EXTENSION_ROOT_ID = "betterUI-extension-root";

function createOrGetRoot(): HTMLElement {
  let root = document.getElementById(EXTENSION_ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = EXTENSION_ROOT_ID;
    document.body?.appendChild(root);
  }
  return root;
}

const rootElement = createOrGetRoot();
const reactRoot = ReactDOM.createRoot(rootElement);
reactRoot.render(<App />);
