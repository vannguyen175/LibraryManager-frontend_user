<template>
	<div class="container-xl inner-content" style="height: fit-content">
		<p class="error-msg">
			{{ message }}
		</p>
		<RegisterForm @submit:account="addAccount" />
	</div>
</template>
<script>
	import RegisterForm from "@/components/RegisterForm.vue";
	import AccountService from "@/services/account.service";
	export default {
		components: {
			RegisterForm,
		},
		data() {
			return {
				message: "",
			};
		},
		methods: {
			async addAccount(data) {
				try {
					await AccountService.register(data);
					this.message = "Liên hệ được tạo mới thành công.";
					this.$router.push("/login");
				} catch (error) {
					this.message = error.response.data?.message;
					console.log("addAccount error", error);
				}
			},
		},
	};
</script>
<style lang="scss">
	.error-msg {
		text-align: center;
		background-color: transparent;
		color: red;
	}
</style>
