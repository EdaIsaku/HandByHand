import React, { createContext, useState } from "react";

export const InfoContext = createContext(false);

function InfoProvider({ children }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <InfoContext.Provider value={[showInfo, setShowInfo]}>
      {children}
    </InfoContext.Provider>
  );
}

export default InfoProvider;
