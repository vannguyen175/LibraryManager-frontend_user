<template>
	<div style="margin-bottom: 30px">
		<div id="carouselExampleIndicators" class="carousel slide" style="margin-top: 5px">
			<div class="carousel-indicators">
				<button
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide-to="0"
					class="active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide-to="1"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide-to="2"
					aria-label="Slide 3"
				></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img src="../assets/SlideHome2.jpg" class="d-block w-100" alt="..." />
				</div>
				<div class="carousel-item">
					<img src="../assets/SlideHome1.jpg" class="d-block w-100" alt="..." />
				</div>
				<div class="carousel-item">
					<img src="../assets/SlideHome3.jpg" class="d-block w-100" alt="..." />
				</div>
				<div class="carousel-item">
					<img src="../assets/SlideHome4.jpg" class="d-block w-100" alt="..." />
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleIndicators"
				data-bs-slide="prev"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleIndicators"
				data-bs-slide="next"
			>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
		<div class="inner-content">
			<p class="title ps-3">Sách mới thêm</p>
			<div class="d-flex">
				<div v-for="(book, index) in books" :key="index">
					<!-- Truyền mỗi cuốn sách vào BookCard -->
					<BookCard :book="book" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BookCard from "@/components/BookCard.vue";
	import bookService from "@/services/book.service";
	export default {
		components: {
			BookCard,
		},
		data() {
			return {
				books: [],
				activeIndex: -1,
			};
		},
		computed: {
			contactStrings() {
				return this.contacts.map((contact) => {
					const { name, email, address, phone } = contact;
					return [name, email, address, phone].join("");
				});
			},
			dataBook() {
				if (this.activeIndex < 0) return null;
				return this.filteredContacts[this.activeIndex];
			},
		},

		methods: {
			async getAllBooks() {
				try {
					const books = await bookService.getAll();
					console.log("getAllBooks", books[0]);
					this.books = books;
				} catch (error) {
					console.log(error);
				}
			},
			refreshList() {
				this.getAllBooks();
				this.activeIndex = -1;
			},
		},
		mounted() {
			console.log("mounted");
			this.refreshList();
		},
	};
</script>

<style lang="scss">
	.banner {
		width: 100%;
		margin-top: 0;
	}
</style>
