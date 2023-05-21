import {
    browserLocalPersistence,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import app from "./config";
import {setAxiosHeader} from "../utility/utils";


const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).then().catch();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("signed in")
        setAxiosHeader(auth.currentUser).then(res => {

        }).catch();
    } else {
        console.log("Not signed in")

    }
})

export const authListener = (callback) => {
    onAuthStateChanged(auth, callback);
}
export const loginWithEmail = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password).then(result => {
        console.log(result);
        callback(result, null);
    }).catch(err => {
        let msg = "";
        switch (err.code) {
            case 'auth/wrong-password':
                msg = "Invalid Credentials";
                break;
            default:
                msg = "An Error Occured";
        }
        callback(null, msg);
    })
}


export const resetPassword = (email, callback) => {
    sendPasswordResetEmail(auth, email).then(res => callback(1, null)).catch(err => {
        callback(null, 1)
        console.log(err)
    });
}

export const logout = () => {
    signOut(auth).then().catch();
}