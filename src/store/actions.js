import { get, post } from "../common/request";

export const logout = ({ commit }) => {
    return  get("/user/logout").then(res => {
        if (res.data.ret) {
            commit("logout");
        }
    }, err => {
        commit('showError',err.message);
    });
}

export const updateUser = ({commit},form) => {
    return post('/user/updateUserInfo',form).then(res=>{
        if(res.data.ret){
            commit('updateSelfInfo',form);
            return true;
        }
        commit('showError',res.data.msg);
        return false;
    }, err => {
        commit('showError',err.message);
    });
}