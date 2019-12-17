type Fn = (arg?: any) => void

type selfInfo = {
    id: string;
}

interface RootState {
    selfInfo: selfInfo;
    modal: { visible: boolean };
    msgInfo: { visible: boolean; isError: boolean; txt: string; };
}

type UserItem = { id: number; name: string; num: number; };

type UserList = Array<UserItem>

interface userState {
    list: UserList;
}

export {
    Fn,
    UserItem,
    UserList,
    userState,
    RootState,
}