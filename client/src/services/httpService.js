import axios from "axios";
let axiosInstance = null;

function initializeHttpService(tokenFactory, baseUrl) {
    axiosInstance = axios.create({
        baseURL: baseUrl
    })

    axiosInstance.interceptors.request.use(async (config) => {
        const accessToken = await tokenFactory();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    });

}

export { axiosInstance as api, initializeHttpService };