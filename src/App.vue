<template lang="pug">
	#app
		Modal
		img(alt="Vue logo" src="./assets/logo.png")
		svg.icon.logo(aria-hidden="true")
			use(xlink:href="#icon-LOGO")
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
  min-width: 1000px;
}
.logo{
	width: 100px;
	height: 100px;
	color: #000;
}
</style>
