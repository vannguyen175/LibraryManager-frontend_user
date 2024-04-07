<template>
	<div>
		<div class="inner-content" style="padding: 30px">
			<p class="title">
				Thông tin tài khoản
				<a href="#">Chỉnh sửa</a>
			</p>
			<div class="row">
				<p class="col"><strong>Họ lót: </strong>{{ detailUser.holot }}</p>
				<p class="col"><strong>Tên: </strong>{{ detailUser.ten }}</p>
				<p class="col"><strong>Phai: </strong>{{ detailUser.phai || "chưa có" }}</p>
			</div>
			<div class="row">
				<p class="col"><strong>Số điện thoại: </strong>{{ detailUser.dienthoai }}</p>
				<p class="col"><strong>Địa chỉ: </strong>{{ detailUser.diachi }}</p>
				<p class="col">
					<strong>Ngày sinh: </strong>{{ detailUser.ngaysinh || "chưa có" }}
				</p>
			</div>
		</div>
		<div class="inner-content" style="padding: 30px">
			<p class="title">Sách đang mượn</p>
			<table class="table">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Tên sách</th>
						<th scope="col">Số lượng</th>
						<th scope="col">Ngày mượn</th>
						<th scope="col">Ngày trả</th>
						<th scope="col">Trạng thái</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(book, index) in sachDangMuon" :key="index">
						<th scope="row">{{ index + 1 }}</th>
						<td>{{ book.tensach }}</td>
						<td>{{ book.soluong }}</td>
						<td>{{ book.ngaymuon }}</td>
						<td>{{ book.ngaytra }}</td>
						<td>
							<span v-if="soNgayConLai(book.ngaytra) > 1" class="dangmuon">
								Đang mượn (Còn {{ soNgayConLai(book.ngaytra) }} ngày)
							</span>
							<span v-else class="muontre">
								Chưa trả (Trễ {{ - soNgayConLai(book.ngaytra) }} ngày)
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="inner-content" style="padding: 30px">
			<p class="title">Sách đang chờ duyệt</p>
			<table class="table">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Tên sách</th>
						<th scope="col">Số lượng</th>
						<th scope="col">Ngày mượn</th>
						<th scope="col">Ngày trả</th>
						<th scope="col">Trạng thái</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(book, index) in sachChoDuyet" :key="index">
						<th scope="row">{{ index + 1 }}</th>
						<td>{{ book.tensach }}</td>
						<td>{{ book.soluong }}</td>
						<td>{{ book.ngaymuon }}</td>
						<td>{{ book.ngaytra }}</td>
						<td><span class="choduyet">Đang chờ duyệt</span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="inner-content" style="padding: 30px">
			<p class="title">Sách đã mượn</p>
		</div>
	</div>
</template>
<script>
	import accountService from "@/services/account.service";
	import managerService from "@/services/manager.service";

	export default {
		data() {
			return {
				detailUser: {},
				sachChoDuyet: [],
				sachDangMuon: [],
				sachDaMuon: [],
			};
		},
		methods: {
			async getDetailUser() {
				try {
					const idUser = localStorage.getItem("id_user");
					const detail = await accountService.getDetailUser(idUser);
					this.detailUser = detail;
				} catch (error) {
					console.log(error);
				}
			},
			async listSachChoDuyet() {
				try {
					const idUser = localStorage.getItem("id_user");
					const detail = await managerService.lichSuMuon({
						madocgia: idUser,
						trangthai: "chờ duyệt",
					});
					this.sachChoDuyet = detail;
				} catch (error) {
					console.log(error);
				}
			},
			async listSachDangMuon() {
				try {
					const idUser = localStorage.getItem("id_user");
					const detail = await managerService.lichSuMuon({
						madocgia: idUser,
						trangthai: "đang mượn",
					});

					this.sachDangMuon = detail;
				} catch (error) {
					console.log(error);
				}
			},
			async listSachDaMuon() {
				try {
					const idUser = localStorage.getItem("id_user");
					const detail = await managerService.lichSuMuon({
						madocgia: idUser,
						trangthai: "đã mượn",
					});
					this.sachDaMuon = detail;
				} catch (error) {
					console.log(error);
				}
			},
			soNgayConLai(ngaytra) {
				const start = new Date();
				const end = new Date(ngaytra);

				const timeDiff = end - start;
				const soNgay = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

				return soNgay;
			},
		},
		mounted() {
			this.getDetailUser();
			this.listSachChoDuyet();
			this.listSachDangMuon();
			this.listSachDaMuon();
		},
	};
</script>

<style lang="scss">
	.choduyet {
		border: 1px solid rgb(255, 204, 0);
		padding: 3px 5px;
		border-radius: 5px;
		color: rgb(214, 144, 12);
	}
	.dangmuon {
		border: 1px solid rgb(0, 197, 0);
		padding: 3px 5px;
		border-radius: 5px;
		color: rgb(0, 185, 0);
	}
	.muontre {
		border: 1px solid red;
		padding: 3px 5px;
		border-radius: 5px;
		color: red;
	}
</style>
