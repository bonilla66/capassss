import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(0);
  const URL = 'http://localhost:8080';

  const updateUser = (userData) => {
    setUser(userData);
  };

  const updateRol = (userRol) => {
    setRol(userRol)
  };

  return (
    <UserContext.Provider value={{ user, updateUser, rol, updateRol, URL }}>
      {children}
    </UserContext.Provider>
  );
};