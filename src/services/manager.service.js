import createApiClient from "./api.service";

class ManagerService {
	constructor(baseUrl = "/api/manager") {
		this.api = createApiClient(baseUrl);
	}
	async muonSach(data) {
		return (await this.api.post("/", data)).data;
	}
}

export default new ManagerService();
