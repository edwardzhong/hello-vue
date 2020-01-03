import { get } from './common/request'

export const logout = () => get('entrance/logout');
export const getUserInfo = (arg:string) => get('user/loginInfo',{Authorization:arg});

// export const userHomeInfo: (id: string) => ServiceRes<UserHomeInfo> = (id) => get(`other/homepage/${id}/baseinfo`)
// export const userStartActivity = (id: string, type: 0 | 1 | 2, page: number) => get(`other/homepage/${id}/activity/type/${type}/page/${page}`)