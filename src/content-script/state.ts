import { produce, Draft } from "immer";
import { useEffect, useReducer } from "react";

type MessageNode = {
  message: string;
  children: MessageNode[];
};

type HeaderContentState = {
  userTree: MessageNode | null;
  assistantTree: MessageNode | null;
};

function initializeState(): HeaderContentState {
  return {
    userTree: null,
    assistantTree: null,
  };
}

type StateActions =
  | {
      type: "ADD_USER_MESSAGE";
      payload: string[];
    }
  | {
      type: "ADD_ASSISTANT_MESSAGE";
      payload: string[];
    };

function insertMessage(root: MessageNode | null, messages: string[]): MessageNode {
  if (!root) {
    root = { message: messages[0], children: [] };
  }

  let current = root;
  for (let i = 1; i < messages.length; i++) {
    let found = false;
    for (const child of current.children) {
      if (child.message === messages[i]) {
        current = child;
        found = true;
        break;
      }
    }
    if (!found) {
      const newNode = { message: messages[i], children: [] };
      current.children.push(newNode);
      current = newNode;
    }
  }

  return root;
}

function stateReducer(state: HeaderContentState, action: StateActions): HeaderContentState {
  return produce(state, (draft: Draft<HeaderContentState>) => {
    switch (action.type) {
      case "ADD_USER_MESSAGE":
        draft.userTree = insertMessage(draft.userTree, action.payload);
        break;
      case "ADD_ASSISTANT_MESSAGE":
        draft.assistantTree = insertMessage(draft.assistantTree, action.payload);
        break;
      default:
        break;
    }
  });
}

export function useHeaderContentLogger() {
  const [state, dispatch] = useReducer(stateReducer, initializeState());

  useEffect(() => {
    const interval = setInterval(() => {
      const header = document.querySelector("header");
      const headerParent = header?.parentElement;

      const userMessages: string[] = [];
      const assistantMessages: string[] = [];

      if (headerParent) {
        const divs = headerParent.querySelectorAll("div");
        divs.forEach((div) => {
          const userDiv = div.querySelector("div.empty\\:hidden");
          if (userDiv?.textContent && !userMessages.includes(userDiv.textContent)) {
            userMessages.push(userDiv.textContent);
          }

          const assistantDiv = div.querySelectorAll("div.markdown, div.prose");
          assistantDiv.forEach((nestedDiv) => {
            if (nestedDiv?.textContent && !assistantMessages.includes(nestedDiv.textContent)) {
              assistantMessages.push(nestedDiv.textContent);
            }
          });
        });
      }

      if (userMessages.length) {
        dispatch({ type: "ADD_USER_MESSAGE", payload: userMessages });
      }

      if (assistantMessages.length) {
        dispatch({ type: "ADD_ASSISTANT_MESSAGE", payload: assistantMessages });
      }

      console.log(state.userTree, state.assistantTree); // logging the trees
    }, 5000);

    return () => clearInterval(interval);
  }, [state]);

  return state;
}
