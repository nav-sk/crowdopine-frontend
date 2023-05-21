import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import login_background from '../../assets/svg/login_background.svg';
import {Button, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, useToast} from "@chakra-ui/react";
import {EmailIcon, LockIcon, ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {loginWithEmail, logout, resetPassword} from "../../firebase/auth";
import {request} from "../../utility/utils";

export const LoginAdmin = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const onSubmitForm = (e) => {
        e.preventDefault();
        setError("");
        const _email = email.trim();
        const _password = password.trim();

        if (_email === "" || _password === "") {
            setError("Invalid Fields")
        } else {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_email)) {
                setError("Invalid Email");
            } else {
                setLoading(true);
                logout();
                loginWithEmail(_email, _password, (res, err) => {
                    if (!err) {
                        console.log("success")
                        request.get('authenticate/admin').then(res => {
                            if (res.data.user === "admin") {
                                navigate('/admin/dashboard');
                            } else {
                                setError("Invalid Credentials");
                            }
                        }).catch(err => {
                            console.log("this")
                            setError("An Error Occured");
                        });
                        // window.location.reload();

                    } else {
                        setError(err)
                    }

                    setLoading(false);
                })
            }
        }
    }

    const onPasswordReset = (e) => {
        setError("");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError("Invalid Email");
        } else {
            resetPassword(email, (res, err) => {
                if (!err) {
                    toast({
                        title: "Success",
                        description: "Password reset email sent successfully",
                        variant: "subtle",
                        isClosable: true
                    })
                    navigate('/admin/dashboard')
                } else {
                    toast({
                        title: "Error",
                        description: "An unknown error occured",
                        variant: "subtle",
                        isClosable: true
                    })
                }
            })
        }
    }

    return <section style={{background: `url(${login_background})`}}
                    className="w-full h-full flex justify-center items-center p-4 font-barlow">
        <div
            className="flex w-full sm:w-2/3 max-w-[400px] p-5 backdrop-blur-md border border-white border-opacity-25 bg-white bg-opacity-20 py-5 rounded-lg"
            style={{boxShadow: "0px 10px 40px 10px rgba(0,0,0,0.15)"}}>
            <div className="flex flex-col items-center text-white w-full">
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-bold ">Log In</h2>
                    <p className="text-xs mt-2">Admin</p>
                </div>
                <form className="mt-10 w-full" onSubmit={onSubmitForm}>
                    <FormLabel className="pl-2" htmlFor="email">Login Id</FormLabel>
                    <InputGroup className="flex flex-col w-full">
                        <InputLeftElement pointerEvents="none" children={<EmailIcon/>}/>
                        <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               placeholder="Email or Login Id"
                               _placeholder={{color: "#ffffff88"}} width="full"/>
                    </InputGroup>
                    <FormLabel className="pl-2 mt-4" htmlFor="email">Password</FormLabel>
                    <InputGroup className="flex flex-col w-full">
                        <InputLeftElement pointerEvents="none" children={<LockIcon/>}/>
                        <Input type={showPassword ? "text" : "password"} name="password" value={password}
                               onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                               _placeholder={{color: "#ffffff88"}} width="full"/>
                        <InputRightElement onClick={e => setShowPassword(!showPassword)}
                                           children={showPassword ? <ViewIcon/> : <ViewOffIcon/>}/>
                    </InputGroup>
                    <p className="text-right mt-1 cursor-pointer" onClick={onPasswordReset}>Forgot Password?</p>
                    <p className="bg-red-500 w-fit px-1 rounded-md text-xs bg-opacity-50 text-red-100">{error}</p>
                    <Button width="full" rounded="xl" background="#d36582" _focus={{background: "#d15577"}}
                            _hover={{background: "#d15577"}}
                            type="submit"
                            isLoading={loading}
                            fontSize="xl" size="lg" mt="5">Login</Button>
                </form>
            </div>
        </div>
    </section>
}