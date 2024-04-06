<template>
	<div style="background-color: white">
		<form
			class="form shadow"
			@submit="submitRegister"
			@submit.prevent
			:validation-schema="accountFormSchema"
			style="margin-top: 20px"
		>
			<p class="title text-center">Đăng ký tài khoản</p>
			<p class="text-center">
				{{ message ? message : "Điền thông tin để đăng ký tài khoản" }}
			</p>

			<div class="form-group">
				<label for="tentaikhoan">Tên tài khoản</label>
				<Field
					name="tentaikhoan"
					type="text"
					class="form-control"
					v-model="accountLocal.tentaikhoan"
				/>
				<ErrorMessage name="tentaikhoan" class="error-feedback" />
			</div>
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
			<div class="form-group">
				<label for="holot">Họ lót</label>
				<Field name="holot" type="text" class="form-control" v-model="accountLocal.holot" />
				<ErrorMessage name="holot" class="error-feedback" />
			</div>
			<div class="form-group">
				<label for="ten">Tên</label>
				<Field name="ten" type="text" class="form-control" v-model="accountLocal.ten" />
				<ErrorMessage name="ten" class="error-feedback" />
			</div>
			<div class="form-group">
				<label for="dienthoai">Số điện thoại</label>
				<Field
					name="dienthoai"
					type="text"
					class="form-control"
					v-model="accountLocal.dienthoai"
				/>
				<ErrorMessage name="dienthoai" class="error-feedback" />
			</div>
			<div class="form-group">
				<label for="diachi">Địa chỉ</label>
				<Field
					name="diachi"
					type="text"
					class="form-control"
					v-model="accountLocal.diachi"
				/>
				<ErrorMessage name="diachi" class="error-feedback" />
			</div>
			<p>
				Đã có tài khoản?
				<router-link :to="'/login'" style="color: var(--color-primary); margin-top: 20px"
					>Đăng nhập</router-link
				>
			</p>
			<div style="text-align: center">
				<button class="button-style">Đăng nhập</button>
			</div>
		</form>
	</div>
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
				holot: yup
					.string()
					.required("Họ lót phải có giá trị.")
					.min(2, "Họ lót phải ít nhất 2 ký tự.")
					.max(50, "Họ lót có nhiều nhất 50 ký tự."),
				ten: yup
					.string()
					.required("Tên phải có giá trị.")
					.min(2, "Tên phải ít nhất 2 ký tự.")
					.max(50, "Tên có nhiều nhất 50 ký tự."),
				matkhau: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
				diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
				dienthoai: yup
					.string()
					.matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
			});
			return {
				accountLocal: {
					// Khởi tạo dữ liệu mặc định cho form đăng ký
					tentaikhoan: "",
					holot: "",
					ten: "",
					matkhau: "",
					dienthoai: "",
					diachi: "",
				},
				accountFormSchema,
			};
		},
		methods: {
			submitRegister() {
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
		height: 750px;
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
