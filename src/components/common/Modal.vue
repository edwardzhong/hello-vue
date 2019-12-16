<template lang="pug">
  .modal(v-if="visible")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Modal extends Vue {
    @Getter visible:boolean
}
</script>
<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 100%, 0%, 0.5);
    z-index: 99;
}
</style>

