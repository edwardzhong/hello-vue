<template lang="pug">
	#app
		Modal
		router-view
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Modal from "@/components/common/Modal.vue";

@Component({
  components: { Modal }
})
export default class App extends Vue{ }
</script>
<style type="text/css">
#app {
  height: 100%;
  width: 100%;
}
</style>
