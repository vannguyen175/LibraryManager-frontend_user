<template>
	<nav
		class="navbar navbar-expand-lg container-xl round"
		style="
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
			border-radius: 5px;
			padding: 0 20px;
		"
	>
		<div class="container-xl" style="background-color: white">
			<router-link class="navbar-brand fw-bold fs-5 text-dark" :to="'/'"
				>Ứng dụng Quản lý mượn sách</router-link
			>
			<form class="d-flex" style="width: 500px">
				<div
					class="navbar-nav d-flex justify-content-between"
					style="width: 500px; padding: 10px 0; background-color: white"
				>
					<p class="nav-item" style="background-color: white">
						<router-link class="nav-link" :to="'/'">Trang chủ</router-link>
					</p>
					<p class="nav-item" style="background-color: white">
						<a class="nav-link" href="#">Thư viện</a>
					</p>
					<p class="nav-item" style="background-color: white">
						<router-link class="nav-link" :to="'/account'">Tài khoản</router-link>
					</p>

					<p v-if="isLoggedIn" class="nav-item" style="background-color: white">
						<a class="nav-link" @click="logout">Đăng xuất</a>
					</p>
					<p v-else class="nav-item" style="background-color: white">
						<router-link class="nav-link" :to="'/login'">Đăng nhập</router-link>
					</p>
				</div>
			</form>
		</div>
	</nav>
</template>
<script>
	export default {
		methods: {
			logout() {
				console.log("logout");
				localStorage.removeItem("id_user");
				if (!localStorage.removeItem("id_user")) {
					this.$router.push("/login");
				}
			},
		},
		computed: {
			isLoggedIn() {
				return localStorage.getItem("id_user") !== null; //đã login
			},
		},
	};
</script>
