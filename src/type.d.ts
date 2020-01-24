
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

type ResData<T> = {
    code: number;
    data?: T;
    msg?: string;
}
interface AxiosFn {
    (url: string, param?: any): Promise<ResData<any>>
}

export {
  Fn,
  AxiosFn,
  UserItem,
  UserList,
  UserState,
  RootState,
}