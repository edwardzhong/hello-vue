import axios from "axios";

//全局配置
axios.defaults.baseURL = "https://www.futurevfx.com/api";
axios.defaults.timeout = 10000;
// axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

//request拦截器
axios.interceptors.request.use(config => {
    const info = localStorage.getItem("selfInfo");
    const params = config.method == "get" ? config.params || {} : config.data || {};
    if (info) {
        const obj = JSON.parse(info);
        if (!params.userId && obj && obj.id) {
            Object.assign(params, { userId: obj.id });
        }
    }
    params._t = Math.random();
    return config;
});

export const get = (url, param) => axios.get(url, { params: param });
export const post = (url, param) => axios.post(url, param);
