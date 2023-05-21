import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {Login} from "./pages/user/login";
import {HomeAdmin} from "./pages/admin/home_admin";
import {LoginAdmin} from "./pages/admin/login_admin";
import {ProtectedRoute} from "./utility/protectedRoute";
import {UserAuthContextProvider} from "./utility/userAuthContext";
import { HomeUser } from "./pages/user/home_user";
import { VotePoll } from "./pages/user/votePoll";
import { ViewPollStats } from "./pages/admin/viewPollStats";

function App() {
    return (
        <div className="App w-full h-full">
            <Provider store={store}>
                <UserAuthContextProvider>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/admin/login" element={<LoginAdmin/>}/>
                        <Route path="/admin/*" element={<ProtectedRoute><HomeAdmin/></ProtectedRoute>}/>
                        <Route path="/home" element={<ProtectedRoute><HomeUser/></ProtectedRoute>}/>
                        <Route path="/vote/:id" element={<ProtectedRoute><VotePoll /></ProtectedRoute>} />
                       </Routes>
                </UserAuthContextProvider>
            </Provider>
        </div>
    );
}

export default App;
