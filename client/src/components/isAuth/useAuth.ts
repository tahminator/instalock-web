import React, { createContext, useContext, useState, useEffect } from 'react';
import isAuth from './isAuth';

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    isAuth().then(setAuthenticated);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
