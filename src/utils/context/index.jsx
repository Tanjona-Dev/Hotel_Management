import { createContext, useState } from "react";

export const LiensContext = createContext();
export const LiensProvider = ({ children }) => {
  const [liens, setLiens] = useState("");

  return (
    <LiensContext.Provider value={{ liens, setLiens }}>
      {children}
    </LiensContext.Provider>
  );
};

export const DetailsClientsProfileContext = createContext();
export const DetailsClientsProfileProvider = ({ children }) => {
  const [indexClient, setIndexClient] = useState(null);

  function getIndexDuClient(index) {
    setIndexClient(index);
  }

  return (
    <DetailsClientsProfileContext.Provider
      value={{ indexClient, getIndexDuClient }}
    >
      {children}
    </DetailsClientsProfileContext.Provider>
  );
};
