import { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');

  const contextValue = {};
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
