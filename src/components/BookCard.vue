<script>
	export default {
		props: {
			book: { type: Object, required: true },
		},
		methods: {
			formatPrice(price) {
				price = String(price);

				// Sử dụng biểu thức chính quy để thêm dấu chấm sau mỗi 3 chữ số
				return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			},
		},
	};
</script>

<template>
	<div class="card">
		<router-link style="padding: 0; width: 100%;" :to="`detail-book/${book._id}`"
			><img :src="book.anhbia" alt="anhbia"
		/></router-link>

		<p class="tensach">{{ book.tensach }}</p>
		<p class="dongia">{{ formatPrice(book.dongia) }}đ</p>
		<router-link class="muonsach-btn" :to="`detail-book/${book._id}`">Mượn sách</router-link>
	</div>
</template>

<style lang="scss">
	.card {
		border: 1px solid gray;
		width: 170px;
		height: 280px;
		border-radius: 8px;
		margin: 10px 20px;
		padding: 5px;
		text-align: center;

		img {
			display: inline-block;
			width: 150px;
			height: 190px;
			border-radius: 8px;
		}

		.tensach {
			color: var(--color-primary);
			font-weight: 500;
			margin: 0px;
		}

		.dongia {
			color: red;
			font-weight: 500;
			margin: 0;
		}

		.muonsach-btn {
			border-radius: 5px;
			font-size: 0.8rem;
			border: 0.5px solid gray;
			width: 140px;
			margin: 5px auto;
			padding: 0;
			transition: 0.2s ease;

			&:hover {
				background-color: rgb(255, 190, 143);
			}
		}
	}
</style>
