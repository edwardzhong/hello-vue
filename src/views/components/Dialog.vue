<template lang="pug">
.dialog(v-if="visible")
	.body
		slot title
	.foot
		a(href="javascript:;" @click="close") cancel
		a(href="javascript:;" @click="confirm") yes
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Dialog extends Vue {
  @Prop()
  visible: boolean;

  @Emit()
  close() {}

  @Emit()
  confirm() {}
}
</script>
<style lang="scss" scoped>
.dialog {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  width: 300px;
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px hsla(0, 100%, 0%, 0.1);
  background-color: #fff;
  .body {
    text-align: center;
    font-size: 16px;
    line-height: 4;
    border-bottom: 1px solid #eee;
  }
  .foot {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    a {
      color: hsla(200, 100%, 50%, 1);
      line-height: 4;
      &:hover {
        color: hsla(200, 50%, 50%, 1);
      }
    }
  }
}
</style>
