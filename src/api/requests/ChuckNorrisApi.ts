// src/api/request/ChuckNorrisApi.ts
import axios, { AxiosResponse } from "axios";

export const API_BASE = "https://api.chucknorris.io/jokes";

export type ChuckNorrisJoke = {
	categories: string[];
	created_at?: string;
	icon_url: string;
	id: string;
	updated_at?: string;
	url: string;
	value: string;
};

export type ChuckNorrisSearchResponse = {
	result: ChuckNorrisJoke[];
	total: number;
};

// FIXME: move to utils
function handleApiError(message: string, error: unknown): never {
	if (error instanceof Error) {
		throw new Error(`${message}: ${error.message}`);
	} else {
		throw new Error(message);
	}
}

export default abstract class ChuckNorrisApi {
	static async getRandom(): Promise<ChuckNorrisJoke> {
		try {
			const response: AxiosResponse<ChuckNorrisJoke> = await axios.get(
				`${API_BASE}/random`,
			);
			return response.data;
		} catch (error: unknown) {
			handleApiError("Failed to fetch random joke", error);
		}
	}

	static async getCategories(): Promise<string[]> {
		try {
			const response: AxiosResponse<string[]> = await axios.get(
				`${API_BASE}/categories`,
			);
			return response.data;
		} catch (error: unknown) {
			handleApiError("Failed to fetch categories", error);
		}
	}

	static async getRandomByCategory(category: string): Promise<ChuckNorrisJoke> {
		try {
			const response: AxiosResponse<ChuckNorrisJoke> = await axios.get(
				`${API_BASE}/random`,
				{
					params: { category },
				},
			);
			return response.data;
		} catch (error: unknown) {
			handleApiError(`Failed to fetch joke by category "${category}"`, error);
		}
	}

	static async searchJokes(query: string): Promise<ChuckNorrisJoke[]> {
		try {
			const response: AxiosResponse<ChuckNorrisSearchResponse> =
				await axios.get(`${API_BASE}/search`, {
					params: { query },
				});
			return response.data.result;
		} catch (error: unknown) {
			handleApiError("Failed to search jokes", error);
		}
	}
}
