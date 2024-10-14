import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Auth context to provide user data to the rest of the app
const AuthContext = createContext();

// Login function
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout function
export const logout = async () => {
  return await signOut(auth);
};

// Hook to provide the current user
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a better loading component
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
