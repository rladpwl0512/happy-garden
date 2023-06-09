import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("home");

  const updateActiveMenu = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <MenuContext.Provider
      value={{
        activeMenu,
        updateActiveMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
