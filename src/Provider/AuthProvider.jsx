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

  // Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update profile
  const updateUser = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch role & status from backend
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

  const authData = {
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
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
