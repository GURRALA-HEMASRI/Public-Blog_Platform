
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = { id: 1, username: "Guest" };
  return (
    <AuthContext.Provider value={{ user, isAuth: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
