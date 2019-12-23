import Vue from 'vue'
import Vuex,{ Store, StoreOptions} from 'vuex'
import { RootState } from '@/type'
import { get, post } from "@/common/request";
import user from './modules/user'

Vue.use(Vuex)

let loginInfo = { id:''};
const info = localStorage.getItem('loginInfo');
if (!info || info === 'undefined') {
    localStorage.clear();
} else {
    loginInfo = JSON.parse(info) || {};
}

const store: StoreOptions<RootState> = {
	state:{
		loginInfo,
		selfInfo:{ id: ''},
		modal: { visible: false },
		msgInfo: { visible:false, isError:false, txt:'' },
	},
	getters:{
		visible: state => state.modal.visible,
		isLogin: state => !!state.selfInfo.id
	},
	mutations:{
		logout(state){
			state.loginInfo = { id:''};
			localStorage.removeItem('loginInfo');
		},
		setLoginInfo(state, payload:{id:string}) {
			state.selfInfo = payload;
			localStorage.setItem("loginInfo", JSON.stringify(payload));
		},
		setSelfInfo(state, payload:{id:string}) {
			state.selfInfo = payload;
			localStorage.setItem("selfInfo", JSON.stringify(payload));
		},
		updateSelfInfo(state, payload:object) {
			state.selfInfo = Object.assign(state.selfInfo, payload);
			localStorage.setItem("selfInfo", JSON.stringify(state.selfInfo));
		},
		showModal(state) {
			state.modal.visible = true;
		},
		closeModal(state) {
			state.modal.visible = false;
		}
	},
	actions:{
		async logout ({ commit }) {
			const data = await get("user/logout", {});
			if (data.code) {
				commit("logout");
			}
			return data;
		},
		async updateUser ({ commit },form:object) {
			const data = await post('user/updateUserInfo', form);
			if (data.code) {
				commit('updateSelfInfo', form);
				return true;
			}
			return false;
		}
	},
	modules: {
		user
	}
}

export default new Store<RootState>(store)