import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Provide a custom hook for easier usage
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken');
  });

  const signIn = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const signOut = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, authToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
