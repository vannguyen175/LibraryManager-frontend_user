import createApiClient from "./api.service";

class BookService {
	constructor(baseUrl = "/api/book") {
		this.api = createApiClient(baseUrl);
	}
	async getAll() {
		return (await this.api.get("/")).data;
	}
	async getDetail(id) {
		return (await this.api.get(`/${id}`)).data;
	}

	
	// async update(id, data) {
	// 	return (await this.api.put(`/${id}`, data)).data;
	// }
	// async delete(id) {
	// 	return (await this.api.delete(`/${id}`)).data;
	// }
}

export default new BookService();
