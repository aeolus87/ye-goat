import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children, requireAuth = false }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful", result.user);
      setCurrentUser(result.user);
      // Wait for the currentUser to be set
      await new Promise((resolve) => setTimeout(resolve, 500));
      return result.user;
    } catch (error) {
      console.error("Google login error", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (requireAuth && !currentUser) {
    return <div>Please authenticate to submit your vote</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
