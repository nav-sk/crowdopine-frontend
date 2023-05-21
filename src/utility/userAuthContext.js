import {createContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const AuthContext = createContext(null);


export const UserAuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), currentUser => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
}