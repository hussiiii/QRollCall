import { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(setCurrentUser);
        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    const signIn = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            throw error;
        }
    };

    const signUp = async (email, password) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
