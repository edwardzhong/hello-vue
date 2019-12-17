import { UserItem, UserList, userState, RootState } from "@/types/context";
import { MutationTree, GetterTree, Module } from 'vuex';

const state:userState = {
    list:[]
};

const getters:GetterTree<userState,RootState> = {
    list: (state) => state.list
};

const mutations: MutationTree<userState> = {
    init(state, list:UserList) {
        state.list = list;
    },
    add(state, item:UserItem) {
        state.list.unshift(item);
    },
    remove(state, id:number) {
        for (var i = 0; i < state.list.length; i++) {
            if (state.list[i].id == id) {
                state.list.splice(i--, 1);
            }
        }
    },
    update(state, item:UserItem) {
        let sel = state.list.filter(i => i.id == item.id)[0];
        if (sel) {
            Object.assign(sel, item);
        }
    }
}


const user: Module<userState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
}

export default user