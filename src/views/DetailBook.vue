<template>
	<div class="container d-flex justify-content-between" style="padding: 0; min-height: 100vh">
		<div class="left">
			<div class="inner-content" style="padding: 20px 30px">
				<p class="title">Thông tin chi tiết sách</p>
				<div class="detail-book">
					<img :src="detailBook.anhbia" alt="anhbia" />
					<div>
						<p class="tensach">{{ detailBook.tensach }}</p>
						<p class="tacgia">Tác giả: {{ detailBook.tacgia }}</p>
						<p class="namxuatban">Năm xuất bản: {{ detailBook.namxuatban }}</p>
						<p
							class="soquyen"
							:style="{
								color:
									detailBook.soquyen - detailBook.dangmuon <= 0
										? 'red'
										: 'inherit',
							}"
						>
							{{
								detailBook.soquyen - detailBook.dangmuon > 0
									? "Số sách còn trong kho: " +
									  (detailBook.soquyen - detailBook.dangmuon)
									: "Hết hàng"
							}}
						</p>

						<p class="dongia">{{ formatPrice(detailBook.dongia) }}đ</p>
					</div>
				</div>
			</div>
			<div class="inner-content" style="padding: 20px 30px">
				<p class="title">Mô tả</p>
				<p class="mt-3">
					Tháng Một năm 1995, trận động đất đã phá hủy tất cả trong chớp mắt. Thế rồi đến
					tháng Hai, thế giới bắt đầu xảy ra những cộng hưởng lặng lẽ, trên bờ biển mùa
					đông có đống củi rều đang cháy, ở Kushiro - đích đến cảu ngwòi đàn ông mang theo
					chiếc hộp nhỏ, ở Tokyo nơi Ếch chiến đấu vói Giun trong lòng đất... Trái đất
					rách toạc. Chúa có thể không tồn tại. Nhưng, có lẽ, đã từ rất lâu trước trận
					động đất đó, chúng ta đã mang theo những đống đổ nát bên trong mình...
				</p>
			</div>
		</div>

		<div class="right">
			<div
				class="modal fade"
				id="myModal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
				ref="my-modal"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body" style="height: 100px">
							Thực hiện thành công, vui lòng chờ quản trị viên duyệt yêu cầu.
						</div>
						<div class="modal-footer">
							<a href="/account" class="btn-ok">OK</a>
						</div>
					</div>
				</div>
			</div>
			<div class="inner-content" style="padding: 20px 30px">
				<div v-if="detailBook.soquyen - detailBook.dangmuon === 0">
					<p style="font-size: 25px; color: red;">Hết hàng</p>
				</div>
				<div v-else-if="!idUser">
					<p>Vui lòng đăng nhập để thực hiện chức năng mượn sách.</p>
					<router-link class="nav-link login-btn" :to="'/login'">Đăng nhập</router-link>
				</div>
				<div v-else="idUser">
					<form @submit.prevent>
						<label for="tentaikhoan">Tên</label>
						<Field
							name="tentaikhoan"
							type="text"
							class="form-control"
							v-model="detailUser.ten"
						/>
						<label for="tentaikhoan">Số điện thoại</label>
						<Field
							name="dienthoai"
							type="text"
							class="form-control"
							v-model="detailUser.dienthoai"
						/>
						<label for="tentaikhoan">Địa chỉ</label>
						<Field
							name="diachi"
							type="text"
							class="form-control"
							v-model="detailUser.diachi"
						/>
						<label for="tentaikhoan">Số lượng mượn</label>
						<Field
							name="soluong"
							type="number"
							min="1"
							:max="maxSachMuon"
							class="form-control"
							v-model="detailBorrow.soluong"
							@change="changeSoLuong"
						/>
						<label for="tentaikhoan">Ngày mượn sách</label>
						<Field
							name="ngaymuon"
							type="date"
							class="form-control"
							v-model="detailBorrow.ngayMuon"
							readonly
							style="pointer-events: none"
						/>
						<label for="tentaikhoan">Ngày trả sách</label>
						<Field
							name="ngaytra"
							type="date"
							class="form-control"
							v-model="detailBorrow.ngayTra"
							@change="changeNgayTra"
						/>

						<span style="text-align: center; color: red">{{ messageError }}</span>
						<span style="text-align: center; color: green">{{ messageSuccess }}</span>
					</form>
					<div class="action">
						<button
							@click="handleSubmit"
							:class="{ 'btn-action': true, activeBtn: activeBtn }"
						>
							Mượn sách
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bookService from "@/services/book.service";
	import accountService from "@/services/account.service";
	import { Form, Field, ErrorMessage } from "vee-validate";
	import managerService from "@/services/manager.service";
	import { Modal } from "bootstrap";
	const idUser = localStorage.getItem("id_user");

	export default {
		data() {
			return {
				detailBook: {},
				detailUser: {},
				detailBorrow: {
					ngayMuon: this.getCurrentDate(),
					ngayTra: "",
					soluong: 1,
				},
				messageError: null,
				messageSuccess: null,
				idUser,
				activeBtn: false,
				maxSachMuon: 5,
			};
		},
		components: {
			Form,
			Field,
			ErrorMessage,
		},
		methods: {
			async getDetailBook() {
				try {
					const id = this.$route.params.id;
					const detail = await bookService.getDetail(id);
					this.detailBook = detail;
				} catch (error) {
					console.log(error);
				}
			},
			async getDetailUser() {
				try {
					const idUser = localStorage.getItem("id_user");
					const detail = await accountService.getDetailUser(idUser);
					this.detailUser = detail;
				} catch (error) {
					console.log(error);
				}
			},
			formatPrice(price) {
				price = String(price);
				return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			},

			getCurrentDate() {
				const currentDate = new Date();
				return currentDate.toISOString().split("T")[0];
			},
			changeNgayTra(event) {
				this.detailBorrow.ngayTra = event.target.value;
				this.totalDay();
			},

			changeSoLuong(event) {
				this.detailBorrow.soLuong = event.target.value;
			},

			totalDay() {
				const date2 = new Date(this.detailBorrow.ngayMuon);
				const date1 = new Date(this.detailBorrow.ngayTra);

				const time1 = date1.getTime();
				const time2 = date2.getTime();

				// Tính hiệu của hai thời điểm (kết quả là số lượng milliseconds)
				const differenceInMilliseconds = time1 - time2;

				// Chuyển đổi hiệu thành số ngày (1 ngày = 24 * 60 * 60 * 1000 milliseconds)
				const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
				if (differenceInDays > 10) {
					this.messageSuccess = "";
					this.messageError = "Tổng số ngày mượn sách không được vượt quá 10.";
					this.activeBtn = false;
				} else if (differenceInDays < 0) {
					this.messageSuccess = "";
					this.messageError = "Ngày trả sách phải sau ngày mượn.";
					this.activeBtn = false;
				} else if (differenceInDays <= 10 && differenceInDays > 0) {
					this.messageError = "";
					this.messageSuccess = "Tổng số ngày mượn sách là " + differenceInDays + " ngày";
					this.activeBtn = true;
				} else {
					this.messageSuccess = "";
					this.messageError = "";
					activeBtn = false;
				}
			},

			showModal() {
				const myModal = new Modal(document.getElementById("myModal"));
				const modalToggle = document.getElementById("toggleMyModal");
				myModal.show(modalToggle);
			},

			async handleSubmit() {
				const result = await managerService.muonSach({
					madocgia: idUser,
					masach: this.detailBook._id,
					soluong: this.detailBorrow.soluong,
					ngaymuon: this.detailBorrow.ngayMuon,
					ngaytra: this.detailBorrow.ngayTra,
				});
				this.showModal();
				if (result) {
					console.log("Muon sach thanh cong");
				}
			},
		},
		mounted() {
			this.getDetailBook();
			this.getDetailUser();
			if (this.detailBook.soquyen - this.detailBook.dangmuon < 5) {
				this.maxSachMuon = this.detailBook.soquyen - this.detailBook.dangmuon;
			}
		},
	};
</script>

<style lang="scss">
	.left {
		width: 62%;
		.detail-book {
			margin-top: 20px;
			display: flex;
			img {
				width: 200px;
				height: 290px;
			}
			div {
				margin-left: 40px;
				.tensach {
					font-size: 30px;
					font-weight: 500;
					color: var(--color-primary);
				}
				.tacgia {
					font-size: 20px;
					margin: 10px 0 10px 0;
				}
				.namxuatban,
				.soquyen {
					font-size: 18px;
					margin-top: 5px;
					margin-bottom: 0px;
				}
				.dongia {
					margin-top: 40px;
					font-size: 20px;
					color: red;
				}
			}
		}
	}

	.right {
		width: 37%;
		.btn-ok {
			background-color: var(--color-primary);
			width: 100px;
			color: white;
			border-radius: 8px;
			border: none;
			cursor: pointer;
			text-align: center;
			&:hover {
				background-color: rgb(236, 91, 51);
			}
		}
		form {
			border: 0.5px solid rgb(186, 186, 186);
			border-radius: 8px;
			margin-bottom: 20px;
			padding: 10px 10px 20px 10px;
			label {
				margin: 10px 0 0 10px;
				font-weight: 500;
			}
			input {
				color: gray;
				outline: none;
			}
		}
		.action {
			text-align: center;
			.btn-action {
				border-radius: 5px;
				border: 0.5px solid gray;
				width: 90%;
				margin: 5px auto;
				padding: 7px;
				transition: 0.2s ease;
				background-color: rgb(196, 196, 196);
				color: white;
				font-weight: 500;
				pointer-events: none;
				transition: 0.2s ease-out;
			}
			.activeBtn {
				background-color: var(--color-primary);
				pointer-events: inherit;
				cursor: pointer;
			}
		}

		.login-btn {
			text-decoration: underline;
			color: var(--color-primary);
		}
	}
</style>
