import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {authListener} from "../firebase/auth";


export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        authListener(currentUser => {
            if (!currentUser) {
                console.log("current user: ", currentUser)
                navigate('/login');
            }
        })
        console.log("called here")
    })

    return children;
}