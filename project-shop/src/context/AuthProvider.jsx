import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  loginWithEmail,
  signUpWithEmail,
  loginWithGoogle,
  logout as fbLogout,
} from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginEmail = async (email, password) => {
    setLoading(true);
    try {
      const cred = await loginWithEmail(email, password);
      setUser(cred.user);
      return cred;
    } finally {
      setLoading(false);
    }
  };

  const signUpEmail = async (email, password) => {
    setLoading(true);
    try {
      const cred = await signUpWithEmail(email, password);
      setUser(cred.user);
      return cred;
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const cred = await loginWithGoogle();
      setUser(cred.user);
      return cred;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await fbLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail: loginEmail,
        signUpWithEmail: signUpEmail,
        loginWithGoogle: loginGoogle,
        logout: logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
