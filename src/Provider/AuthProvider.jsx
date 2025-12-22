// AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userState, setUserState] = useState("");

  // ✅ Create user with proper error handling
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error; // IMPORTANT: pass error to Register.jsx
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch role & status
  useEffect(() => {
    if (!user?.email) {
      setRole("");
      setUserState("");
      setRoleLoading(false);
      return;
    }

    setRoleLoading(true);
    axios
      .get(`https://blood-donation-xi-one.vercel.app/users/role/${user.email}`)
      .then((res) => {
        setRole(res.data?.role || "");
        setUserState(res.data?.status || "");
      })
      .catch(() => {
        setRole("");
        setUserState("");
      })
      .finally(() => setRoleLoading(false));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role,
        roleLoading,
        userState,
        createUser,
        signIn,
        googleLogin,
        logout,
        updateUser,
        resetPassword,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
