import Vue from 'vue'
import Vuex,{ Store, StoreOptions} from 'vuex'
import { RootState } from '@/type'
import { get, post } from "@/common/request";
import user from './modules/user'

Vue.use(Vuex)

let selfInfo = { id:''};
const info = localStorage.getItem('selfInfo');
if (!info || info === 'undefined') {
    localStorage.clear();
} else {
    selfInfo = JSON.parse(info) || {};
}

const store: StoreOptions<RootState> = {
	state:{
		selfInfo: selfInfo,
		modal: { visible: false },
		msgInfo: { visible:false, isError:false, txt:'' },
	},
	getters:{
		visible: state => state.modal.visible,
		isLogin: state => !!state.selfInfo.id
	},
	mutations:{
		logout(state){
			state.selfInfo = { id:''};
			localStorage.removeItem('selfInfo');
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
		},
		showError(state, txt:string){
			state.msgInfo = { visible:true, isError:true, txt:txt } 
			setTimeout(() => {
				state.msgInfo.visible = false;
			}, 2000);
		},
		showSucc(state,txt:string){
			state.msgInfo = { visible:true, isError:false, txt:txt }; 
			setTimeout(() => {
				state.msgInfo.visible = false;
			}, 2000);
		}
	},
	actions:{
		async logout ({ commit }) {
			try {
				const res = await get("/user/logout", {});
				if (res.data.code) {
					commit("logout");
				}
			}
			catch (err) {
				commit('showError', err.message);
			}
		},
		async updateUser ({ commit },form:object) {
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
	},
	modules: {
		user
	}
}

export default new Store<RootState>(store)