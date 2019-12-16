import axios from 'axios'
import configs from '@/config/app'
import { AxiosFun } from '@/types/request'

axios.defaults.baseURL = configs.url;
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(config => {
    const info = localStorage.getItem("selfInfo");
    const params = config.method == "get" ? config.params || {} : config.data || {};
    if (info) {
        const obj = JSON.parse(info);
        // if ( obj && obj.token) {
        //     Object.assign(params, { token: obj.token });
        // }
        if (obj.token) {
            config.headers.Authorization = 'Bearer ' + obj.token;
        }
    }
    params._t = Math.random();
    return config;
});

// axios.interceptors.response.use(res => {
//     if (res.data.code == 200) {
//         if (res.config.url.search(/\/login\/sign/i) > -1 && res.data.data) {
//             // storage.save(res.data.data);
//         }
//         if (res.config.url.search(/\/login\/signout/i) > -1) {
//             // storage.clear();
//         }
//     }
//     return res.data;
// });

export const get: AxiosFun = (url, param) => axios.get(url, { params: param });
export const post: AxiosFun = (url, param) => axios.post(url, param);
export const put: AxiosFun = (url, param) => axios.put(url, param);
export const del: AxiosFun = (url, param) => axios.delete(url, { data: param });
