<template lang="pug">
	mixin Icon(id, classname)
		svg.icon(class=classname aria-hidden="true")
			use(xlink:href="#icon-"+id)
	.home
		img(alt="Vue logo" src="../assets/logo.png")
		div
			+Icon('Logo','logo')
		h1  
			router-link(to="/users") Go to user list
		h2 Welcome to Your Vue.js App
		p For a guide and recipes on how to configure / customize this project, check out
		h3 Essential Links
		ul
			li
				a(href="https://vuejs.org" target="_blank" rel="noopener") Core Docs
			li
				a(href="https://forum.vuejs.org" target="_blank" rel="noopener") Forum
			li
				a(href="https://chat.vuejs.org" target="_blank" rel="noopener") Community Chat
			li
				a(href="https://twitter.com/vuejs" target="_blank" rel="noopener") Twitter
			li
				a(href="https://news.vuejs.org" target="_blank" rel="noopener") News
		h3 Ecosystem
		ul
			li
				a(href="https://router.vuejs.org" target="_blank" rel="noopener") vue-router
			li
				a(href="https://vuex.vuejs.org" target="_blank" rel="noopener") vuex
			li
				a(href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener") vue-devtools
			li
				a(href="https://vue-loader.vuejs.org" target="_blank" rel="noopener") vue-loader
			li
				a(href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener") awesome-vue
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
	text-align: center;
}
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
	li {
		display: inline-block;
		margin: 0 10px;
	}
}
a {
	color: hsl(204, 73%, 46%);
}
</style>
