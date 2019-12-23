import { get } from './common/request'

const logout = () => get('entrance/logout');
const getUserInfo = (arg:string) => get('user/loginInfo',{Authorization:arg});

export {
    logout,
    getUserInfo,
}