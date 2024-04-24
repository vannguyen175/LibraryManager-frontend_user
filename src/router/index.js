import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import DetailBook from "@/views/DetailBook.vue";
import Account from "@/views/Account.vue";
import Library from "@/views/Library.vue";
const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/library",
		name: "library",
		component: Library,
	},
	{
		path: "/detail-book/:id",
		name: "detail-book",
		component: DetailBook,
	},
	{
		path: "/account",
		name: "account",
		component: Account,
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
export default router;
