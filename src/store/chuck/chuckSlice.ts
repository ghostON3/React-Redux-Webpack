import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChuckNorrisJoke } from "@/api/requests/ChuckNorrisApi";

import { fetchCategories, fetchJoke, searchJokes } from "./chuckActions";

export const RANDOM_CATEGORY = {
	id: "randomId",
	label: "Random",
};

export enum JokeMode {
	SEARCHED = "SEARCHED",
	SELECTED = "SELECTED",
}
export type ChuckState = {
	categories: string[];
	categoriesLoading: boolean;
	error: string | null;
	joke: ChuckNorrisJoke | null;
	jokeMode: JokeMode;
	loading: boolean;
	searchNoResults: boolean;
	searchQuery: string;
	selectedCategory: string;
};

const initialState: ChuckState = {
	joke: null,
	categories: [],
	selectedCategory: RANDOM_CATEGORY.id,
	loading: false,
	categoriesLoading: false,
	error: null,
	searchQuery: "",
	searchNoResults: false,
	jokeMode: JokeMode.SELECTED,
};

const chuckSlice = createSlice({
	name: "chuck",
	initialState,
	reducers: {
		setSelectedCategory(state, action: PayloadAction<string>) {
			state.selectedCategory = action.payload;
			state.searchQuery = "";
			state.searchNoResults = false;
		},
		setSearchQuery(state, action: PayloadAction<string>) {
			state.searchQuery = action.payload;
		},
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchJoke.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.searchNoResults = false;
			})
			.addCase(fetchJoke.fulfilled, (state, action) => {
				const { joke, category } = action.payload;
				state.loading = false;
				state.joke = joke;
				state.selectedCategory = category;
				state.jokeMode = JokeMode.SELECTED;
				state.error = null;
			})
			.addCase(fetchJoke.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Failed to load joke";
				state.jokeMode = JokeMode.SELECTED;
			})

			.addCase(fetchCategories.pending, (state) => {
				state.categoriesLoading = true;
				state.error = null;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categoriesLoading = false;
				state.categories = action.payload;
				state.error = null;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.categoriesLoading = false;
				state.error = action.payload ?? "Failed to load categories";
			})

			.addCase(searchJokes.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.searchNoResults = false;
			})
			.addCase(searchJokes.fulfilled, (state, action) => {
				state.loading = false;
				state.joke = action.payload;
				state.error = null;
				state.searchNoResults = false;
				state.jokeMode = JokeMode.SEARCHED;
			})
			.addCase(searchJokes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Search failed";
				state.searchNoResults = true;
				state.jokeMode = JokeMode.SEARCHED;
			});
	},
});

export const { setSelectedCategory, setSearchQuery, clearError } =
	chuckSlice.actions;
export default chuckSlice.reducer;
