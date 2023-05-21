import React, { useContext, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FiHome, FiLogOut, FiPlus, FiSettings } from "react-icons/fi";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { DashboardAdmin } from "./dashboard_admin";
import { CreatePollAdmin } from "./create_poll_admin";
import { logout } from "../../firebase/auth";
import { AuthContext } from "../../utility/userAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utility/utils";
import { setUserData } from "../../redux/actions/userProfileAction";
import { ViewPollStats } from "./viewPollStats";

export const HomeAdmin = () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const userData = useSelector(state => state.userProfileReducer.user);
    const dispatch = useDispatch();
    const [{ bodyName, email }, setUserD] = useState({});

    useEffect(() => {
        if (user) {
            request.get('authenticate/admin').then(res => {
                if (res.data.user === 'non_admin') {
                    navigate('/home');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    })
    useEffect(() => {
        if (user) {
            request.get('get/user-data').then(res => {
                dispatch(setUserData(res.data));
                setUserD(res.data);
            })
        }
    }, [user]);

    const onPageChangeClick = e => {
        navigate('/admin/' + e.currentTarget.name)
    }
    return <section className="w-full h-full flex flex-row flex-nowrap font-barlow bg-DBlue">
        <div className="h-full w-80 flex-shrink-0 flex flex-col bg-DBlue text-white">
            <h1 className="text-4xl font-bold text-center py-10">CrowdOpine</h1>
            <div className=" flex flex-col flex-grow flex-shrink-0 items-center justify-center">
                <div className="flex flex-col items-center">
                    <h2 className="font-semibold text-xl">{bodyName || ""}</h2>
                    <p>CIT</p>
                    <div className="flex flex-col my-10">
                        <Button variant="solid" size="lg" rounded="full" colorScheme="Sandal"
                            onClick={onPageChangeClick}
                            isActive={window.location.pathname === "/admin/dashboard"} color="black"
                            name="dashboard"
                            leftIcon={<FiHome />}>Dashboard</Button>
                        <Button variant="solid" size="lg" rounded="full" colorScheme="Sandal"
                            onClick={onPageChangeClick}
                            isActive={window.location.pathname === "/admin/create"} mt={3} color="black"
                            name="create"
                            leftIcon={<FiPlus />}>Create Poll</Button>
                        <Button variant="solid" size="lg" rounded="full" colorScheme="Sandal"
                            onClick={onPageChangeClick}
                            isActive={window.location.pathname === "/admin/settings"} mt={3} color="black"
                            name="settings"
                            leftIcon={<FiSettings />}>Settings</Button>
                    </div>
                </div>
            </div>
            <div className="mb-5 flex items-center justify-center">
                <Button variant="solid" size="lg" rounded="full" colorScheme="Sandal" mt={3} color="black" onClick={e => {
                    navigate('/admin/login')
                    logout();
                }}
                    leftIcon={<FiLogOut />}>Logout</Button>
            </div>
        </div>

        <div className="h-full w-full overflow-x-hidden bg-[#f7f7ff] rounded-l-3xl shadow-2xl text-white">
            <Routes>
                <Route path="/dashboard" element={<DashboardAdmin />} />
                <Route path="/create" element={<CreatePollAdmin />} />
                <Route path="/create" element={<CreatePollAdmin />} />
                <Route path="/view/stats/:category/:id" element={<ViewPollStats />} />
            </Routes>
            <Outlet />
        </div>
    </section>
}