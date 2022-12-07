import React, {useContext, createContext, useEffect, useState} from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './Config';

const AuthCntxt = createContext();

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState({});
  
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth);
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log('User', currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, [])
  
  return (
    <AuthCntxt.Provider value={{ googleSignIn, logOut, user }}> 
      {children}
    </AuthCntxt.Provider>
  )
}

export const UseAuth = () => {

  return useContext(AuthCntxt);
}
