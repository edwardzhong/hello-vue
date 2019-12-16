import { TItem, TList, ListState } from "@/types/context";

export default {
    state: {
        list: []
    },
    actions: {

    },
    getters: {
        list: (state:ListState) => state.list
    },
    mutations: {
        init(state:ListState, list:TList) {
            state.list = list;
        },
        add(state:ListState, item:TItem) {
            state.list.unshift(item);
        },
        remove(state:ListState, id:number) {
            for (var i = 0; i < state.list.length; i++) {
                if (state.list[i].id == id) {
                    state.list.splice(i--, 1);
                }
            }
        },
        update(state:ListState, item:TItem) {
            let sel = state.list.filter(i => i.id == item.id)[0];
            if (sel) {
                Object.assign(sel, item);
            }
        }
    }
};