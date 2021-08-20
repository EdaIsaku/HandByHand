import React, { createContext, useState } from "react";

export const SharedStateContext = createContext({});

function GlobalState({ children }) {
  const [sharedState, setSharedState] = useState({
    // userName: "",
    // lName: "",
    // email: "",
    showInfo: false,
    closedModal: true,
  });
  return (
    <SharedStateContext.Provider value={[sharedState, setSharedState]}>
      {children}
    </SharedStateContext.Provider>
  );
}

export default GlobalState;
