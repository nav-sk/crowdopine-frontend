import axios from "axios";


export const request = axios.create({
    baseURL: "http://"+window.location.hostname+":8000"
});
export const setAxiosHeader = async (user) => {
    user.getIdToken().then(token => {
        request.interceptors.request.use((config) => {
            config.headers["Authorization"] = "Bearer " + token;
            return config;
        })
        console.log(user.uid)
    }).catch()
}
