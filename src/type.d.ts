import { AxiosResponse } from 'axios';

type selfInfo = {
    id: string;
}
interface RootState {
    selfInfo: selfInfo;
    modal: { visible: boolean };
    msgInfo: { visible: boolean; isError: boolean; txt: string; };
}

type UserItem = {
    id: number;
    name: string;
    num: number;
};

type UserList = Array<UserItem>

interface userState {
    list: UserList;
}

type Fn = (arg?: any) => void

type ResData = {
    code: number;
    data: any;
    msg: string;
}
interface AxiosFun {
    (url: string, param: any): Promise<AxiosResponse<ResData>>
}

export {
    Fn,
    AxiosFun,
    UserItem,
    UserList,
    userState,
    RootState,
}