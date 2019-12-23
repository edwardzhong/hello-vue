
type LoginInfo = {
    id: string;
}
type SelfInfo = {
    id: string;
}
interface RootState {
    loginInfo: LoginInfo;
    selfInfo: SelfInfo;
    modal: { visible: boolean };
    msgInfo: { visible: boolean; isError: boolean; txt: string; };
}

type UserItem = {
    id: number;
    name: string;
    num: number;
};

type UserList = Array<UserItem>

interface UserState {
    list: UserList;
}

type Fn = (arg?: any) => void

type ResData = {
    code: number;
    data: any;
    msg: string;
}
interface AxiosFun {
    (url: string, param?: any): Promise<ResData>
}

export {
    Fn,
    AxiosFun,
    UserItem,
    UserList,
    UserState,
    RootState,
}