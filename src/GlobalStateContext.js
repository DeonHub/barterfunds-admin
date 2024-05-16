// GlobalStateProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(() => {
    const storedState = localStorage.getItem('globalState');
    return storedState ? JSON.parse(storedState) : {
      user: null,
      isAuthenticated: false,
      token: "",
      api_url: "http://localhost:8000",
      public_url: "http://localhost:3000",
      authSecretKey: null,
      currencies: []
    };
  });

  useEffect(() => {
    localStorage.setItem('globalState', JSON.stringify(globalState));
  }, [globalState]);

  const updateUser = (userData) => {
    setGlobalState((prevState) => ({
      ...prevState,
      user: userData,
      isAuthenticated: true,
    }));
  };

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
