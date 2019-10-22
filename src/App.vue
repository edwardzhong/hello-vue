<template lang="pug">
	#app
		Modal
		img(alt="Vue logo" src="./assets/logo.png")
		router-view
</template>
<script>
	import Modal from "./components/common/Modal.vue";
	export default {
		name: "app",
		components: { Modal }
	};
</script>
<style type="text/css">
#app {
  height: 100%;
  width: 100%;
  min-width: 1000px;
}
</style>
