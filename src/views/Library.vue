<template>
	<div class="row d-flex justify-content-between">
		<div class="leftt">
			<div class="inner-content">
				<p>Phân loại theo nhà xuất bản</p>
				<div v-for="value in publishers" :key="value._id">
					<button class="filter-btn">{{ value.tenNXB }}</button>
				</div>
			</div>
		</div>
		<div class="rightt">
			<div class="inner-content">
				<div class="search-wrapper">
					<input type="text" v-model="data.search" placeholder="Nhập sách cần tìm.." />
				</div>
				<div class="d-flex flex-wrap" style="padding-left: 15px">
					<div v-for="book in filteredList" :key="book._id">
						<BookCard :book="book" />
					</div>
					<!-- <div v-for="book in data.bookList" :key="book._id">
						<BookCard :book="book" />
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import bookService from "@/services/book.service";
	import BookCard from "@/components/BookCard.vue";
	import publisherService from "@/services/publisher.service";
	export default {
		components: {
			BookCard,
		},
		data() {
			return {
				data: {
					search: "",
					bookList: [],
				},
				filter: "",
				publishers: [],
				filterBtnAction: "",
			};
		},

		methods: {
			async getBookList() {
				try {
					// const detail = await bookService.getAll({ filter: this.filter });
					const detail = await bookService.getAll({ filter: this.filter });
					this.data.bookList = detail;
				} catch (error) {
					console.log(error);
				}
			},

			async getPublisher() {
				try {
					const data = await publisherService.getAll();
					console.log("publishers", data);
					this.publishers = data;
				} catch (error) {}
			},
		},
		computed: {
			filteredList() {
				return this.data.bookList.filter((book) => {
					return book.tensach.toLowerCase().includes(this.data.search.toLowerCase());
				});
			},
		},
		mounted() {
			this.getBookList();
			this.getPublisher();
		},
	};
</script>

<style lang="scss">
	.leftt {
		width: 30%;
		text-align: center;
		p {
			font-weight: 500;
			margin-top: 20px;
		}
		.filter-btn {
			margin: 10px;
			width: 200px;
			background-color: white;
			border: 1px solid gray;
			padding: 3px 0;
			border-radius: 5px;
			transition: 0.2s ease;
			&:hover {
				background-color: var(--color-primary);
				color: white;
			}
		}
	}

	.rightt {
		width: 70%;
		.search-wrapper {
			margin: 20px 30px 30px 60%;
			input {
				padding: 5px 10px;
				border-radius: 5px;
				border: 1px solid gray;
				width: 300px;
			}
		}
	}
</style>
