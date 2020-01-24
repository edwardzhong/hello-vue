<template lang="pug">
	mixin Icon(id, classname)
		svg.icon(class=classname aria-hidden="true")
			use(xlink:href="#icon-"+id)
	#app
		Modal
		img(alt="Vue logo" src="./assets/logo.png")
		div
			+Icon('Logo','logo')
			+Icon('Logo2','logo')
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
  text-align: center;
}
.logo{
	width: 100px;
	height: 100px;
}
</style>
