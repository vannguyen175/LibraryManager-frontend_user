<script>
	import AppHeader from "@/components/AppHeader.vue";
	export default {
		components: {
			AppHeader,
		},
	};
</script>

<template>
	<div id="app">
		<AppHeader />
		<div class="container-xl" style="padding: 0 0 20px 0; min-height: 100vh">
			<router-view />
		</div>
	</div>
</template>

<style>
	.page {
		max-width: 400px;
		margin: auto;
	}
</style>
