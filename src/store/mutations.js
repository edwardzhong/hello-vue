let selfInfo = {};
const info = localStorage.getItem('selfInfo');
if (!info || info === 'undefined') {
    localStorage.clear();
} else {
    selfInfo = JSON.parse(info) || {};
}

export const state = {
    selfInfo: selfInfo,
    modal: { visible: false },
    infoTip: { visible:false, isError:false, txt:'' },
    listInfo: {
        height:0, 
        rows:2,
        navIndex :0,
        list:[] 
    }
}

export const mutations = {
    logout(){
        state.selfInfo = {};
        localStorage.removeItem('selfInfo');
    },
    setListInfo(state, payload){
        state.listInfo = Object.assign(state.listInfo,payload);
    },
    setSelfInfo(state, payload) {
        state.selfInfo = payload;
        localStorage.setItem("selfInfo", JSON.stringify(payload));
    },
    updateSelfInfo(state, payload) {
        state.selfInfo = Object.assign(state.selfInfo, payload);
        localStorage.setItem("selfInfo", JSON.stringify(state.selfInfo));
    },
    showModal() {
        state.modal.visible = true;
    },
    closeModal() {
        state.modal.visible = false;
    },
    showError(state,txt){
        state.infoTip = { visible:true, isError:true, txt:txt } 
        setTimeout(() => {
            state.infoTip.visible = false;
        }, 2000);
    },
    showSucc(state,txt){
        state.infoTip = { visible:true, isError:false, txt:txt }; 
        setTimeout(() => {
            state.infoTip.visible = false;
        }, 2000);
    }
}