<template>
	<div class="container-xl inner-content" style="height: fit-content">
		<p class="error-msg">
			{{ message }}
		</p>
		<LoginForm @submit:account="loginAccount" />
	</div>
</template>
<script>
	import LoginForm from "@/components/LoginForm.vue";
	import AccountService from "@/services/account.service";
	export default {
		components: {
			LoginForm,
		},
		data() {
			return {
				message: "",
			};
		},
		methods: {
			async loginAccount(data) {
				try {
					const result = await AccountService.login(data);
					this.message = "Đăng nhập thành công.";
					localStorage.setItem("id_user", result?._id);
					this.$router.push("/");
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
