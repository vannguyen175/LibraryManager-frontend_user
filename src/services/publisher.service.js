import createApiClient from "./api.service";

class PublisherService {
	constructor(baseUrl = "/api/publisher") {
		this.api = createApiClient(baseUrl);
	}
	async getAll() {
		return (await this.api.get("/")).data;
	}
	async getDetail(id) {
		return (await this.api.get(`/${id}`)).data;
	}
	async create(data) {
		return (await this.api.post(`/`, data)).data;
	}
	async update(id, data) {
		return (await this.api.put(`/${id}`, data)).data;
	}
	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}
}

export default new PublisherService();