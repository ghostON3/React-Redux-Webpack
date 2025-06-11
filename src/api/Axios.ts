import axios from "axios";

const API_BASE = "https://api.chucknorris.io/";

const apiClient = axios.create({
	baseURL: API_BASE,
	headers: {
		"Content-Type": "application/json",
	},
});
export default apiClient;
