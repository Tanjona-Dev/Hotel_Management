import { createContext, useState } from "react";

export const LiensContext = createContext();

export const LiensProvider = ({ children }) => {
  const [liens, setLiens] = useState('');

  return (
    <LiensContext.Provider value={{ liens, setLiens }}>
      {children}
    </LiensContext.Provider>
  );
};
