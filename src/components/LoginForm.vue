<template>
	<form
		class="container-xl"
		@submit="submitLogin"
		@submit.prevent
		:validation-schema="accountFormSchema"
		style="height: 85vh; background-color: white;"
	>
		<div class="form shadow" style="margin-top: 20px">
			<p class="title text-center">Đăng nhập tài khoản</p>
			<p class="text-center">Điền thông tin để truy cập vào hệ thống</p>

			<label for="tentaikhoan">Tên tài khoản</label>
			<Field
				name="tentaikhoan"
				type="text"
				class="form-control"
				v-model="accountLocal.tentaikhoan"
			/>
			<ErrorMessage name="tentaikhoan" class="error-feedback" />

			<div class="form-group">
				<label for="matkhau">Mật khẩu</label>
				<Field
					name="matkhau"
					type="password"
					class="form-control"
					v-model="accountLocal.matkhau"
				/>
				<ErrorMessage name="matkhau" class="error-feedback" />
			</div>
			<p>
				Chưa đăng ký tài khoản?
				<router-link :to="'/register'" style="color: var(--color-primary); margin: 10px 0"
					>Đăng ký</router-link
				>
			</p>
			<div style="text-align: center">
				<button class="button-style">Đăng nhập</button>
			</div>
		</div>
	</form>
</template>
<script>
	import * as yup from "yup";
	import { Form, Field, ErrorMessage } from "vee-validate";
	export default {
		components: {
			Form,
			Field,
			ErrorMessage,
		},
		emits: ["submit:account"],
		props: {},
		data() {
			const accountFormSchema = yup.object().shape({
				tentaikhoan: yup
					.string()
					.required("Tên phải có giá trị.")
					.min(2, "Tên phải ít nhất 2 ký tự.")
					.max(50, "Tên có nhiều nhất 50 ký tự."),
				matkhau: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
			});
			return {
				accountLocal: {
					// Khởi tạo dữ liệu mặc định cho form đăng ký
					tentaikhoan: "",
					matkhau: "",
				},
				accountFormSchema,
			};
		},
		methods: {
			submitLogin() {
				this.$emit("submit:account", this.accountLocal); //truyền accountLocal lên parent
			},
		},
	};
</script>
<style scoped lang="scss">
	.page {
		margin: 40px auto;
	}
	.form {
		width: 450px;
		height: 400px;
		background-color: antiquewhite;
		border: 1px solid black;
		border-radius: 10px;
		margin: auto;
		padding: 10px 20px;
		input {
			margin-bottom: 10px;
		}
	}
	.button-style {
		width: 300px;
		height: 40px;
		background-color: var(--color-primary);
		border: none;
		border-radius: 10px;
		color: white;
		font-weight: 500;
		margin: auto;
	}
</style>
@/service/contact.service
