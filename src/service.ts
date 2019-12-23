import { get } from './common/request'

export const logout = () => get('entrance/logout');
export const getUserInfo = (arg:string) => get('user/loginInfo',{Authorization:arg});