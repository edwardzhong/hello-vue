import { get, post } from "@/common/request";
import { Dispatch } from "@/types/context";


export const logout = async ({ commit }:Dispatch) => {
    try {
        const res = await get("/user/logout", {});
        if (res.data.code) {
            commit("logout");
        }
    }
    catch (err) {
        commit('showError', err.message);
    }
}

export const updateUser = async ({ commit }:Dispatch,form:object) => {
    try {
        const res = await post('/user/updateUserInfo', form);
        if (res.data.code) {
            commit('updateSelfInfo', form);
            return true;
        }
        commit('showError', res.data.msg);
        return false;
    }
    catch (err) {
        commit('showError', err.message);
        return false;
    }
}