<template lang="pug">
.content
    Dialog(:visible="showDailog" v-on="{confirm:confirmDialog,close:closeDialog}") 
        p delete data ?
    Popup(:show="showPop")
        .head 
            p edit data
        .form
            .control-group
                input(type='text' placeholder='name' v-model="editItem.name")
            .control-group
                input(type='text' placeholder='amount' maxlength='12' v-model="editItem.num")
            .foot
                button(class='button' v-on:click="closePop") cancal
                button(class='button button-primary' v-on:click="update(editItem)") confirm
    h1
        router-link(to="/") Go to home
    table(class="table table-striped table-justified")
        thead 
            tr 
                th name
                th amount
                th operate
        tbody
            tr(v-for="i in list") 
                td {{i.name}}
                td {{i.num}}
                td
                    button(class="button button-primary" v-on:click="openPop(i)") edit 
                    button(class="button button-success" v-on:click="openDialog(i.id)") delete
</template>
<script lang="ts">
import { TItem, TList } from "@/types/context";
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Dialog from "./common/dialog.vue";
import Popup from "./common/popup.vue";

@Component({
    components: {
        Dialog,
        Popup
    }
})
export default class List extends Vue {
    showDailog = false
    showPop = false
    delID = 0
    editItem = {}

    @Getter list:TList
    // @Getter('list') getterList:TList
    // get list(){
    //     return this.getterList
    // }

    created() {
        if (this.list.length) return;
        this.$store.commit("init", [
            { id: 1, name: "Chuck Norris", num: 10000 },
            { id: 2, name: "Bruce Lee", num: 9000 },
            { id: 3, name: "Jackie Chan", num: 7000 },
            { id: 4, name: "Jet Li", num: 8000 }
        ]);
    }

    // @Emit('showModal')
    openDialog(id:number) {
        this.$store.commit("showModal");
        this.showDailog = true;
        this.delID = id;
    }

    confirmDialog() {
        this.$store.commit("remove", this.delID);
        this.closeDialog();
    }

    closeDialog() {
        this.$store.commit("closeModal");
        this.showDailog = false;
    }

    // @Emit('showModal')
    openPop(item:TItem) {
        this.$store.commit("showModal");
        this.showPop = true;
        this.editItem = Object.assign({},item);//将数据复制一份，而不是引用原数据
    }

    update(item:TItem) {
        this.$store.commit("update", item);
        this.closePop();
    }

    closePop() {
        this.showPop = false;
        setTimeout(() => {
            this.$store.commit("closeModal");
        }, 300);
    }
}
</script>
<style lang="scss" scoped>
.content {
    width: 600px;
    margin: 50px auto;
}
button:not(:last-child) {
    margin-right: 10px;
}
.head {
    background: #0077e6;
    p {
        margin:0;
        padding-left:20px;
        line-height: 3;
        color: #fff;
        font-size: 18px;
        @include nowrap;
    }
}
.form {
    background: #fff;
    text-align: center;
    .control-group {
        padding: 10px 20px 0;
    }
    input {
        width: 100%;
    }
    .foot {
        padding: 14px 20px;
        text-align: right;
    }
    button {
        font-size: 12px;
        padding: 8px 20px;
    }
}
</style>

