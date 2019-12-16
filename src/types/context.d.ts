interface fn {
    (type: string, arg?:any):void
}

interface Dispatch {
    commit:fn
}

type selfInfo = {
    id:string;
}
interface BaseState {
    selfInfo: selfInfo;
    modal: { visible: boolean };
    infoTip: { visible:boolean; isError:boolean; txt:string; };
    listInfo: {
        height:number; 
        rows:number;
        navIndex:number;
        list:any[]; 
    }
}

type TItem = { id: number; name: string; num:number; };

type TList = Array<TItem>

interface ListState {
    list: TList;
}

export {
    TItem,
    TList,
    ListState,
    BaseState,
    Dispatch
}