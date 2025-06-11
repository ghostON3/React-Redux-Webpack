import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import {
	fetchCategories,
	fetchJoke,
	searchJokes,
} from "@/store/chuck/chuckActions";
import { RANDOM_CATEGORY } from "@/store/chuck/chuckSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import ChuckPageHeader from "./components/ChuckPageHeader/ChuckPageHeader";
import ControlsCard from "./components/ControlsCard/ControlsCard";
import JokeCard from "./components/JokeCard/JokeCard";

export default function ChuckPage() {
	const dispatch = useAppDispatch();
	const [searchText, setSearchText] = useState("");

	const { categories, joke, loading, error, selectedCategory, jokeMode } =
		useAppSelector((state) => state.chuckStore);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchJoke(RANDOM_CATEGORY.id));
	}, [dispatch]);

	const handleCategoryChange = (category: string) => {
		dispatch(fetchJoke(category));
	};

	const handleSearchTextChange = (text: string) => {
		setSearchText(text);
	};

	const performSearch = () => {
		if (searchText.length >= 3) {
			dispatch(searchJokes(searchText));
		} else if (searchText.length === 0) {
			dispatch(fetchJoke(selectedCategory));
		} else {
			// FIXME:
			alert("Required length of searched text is 3 and more characters");
		}
	};

	return (
		<Layout>
			<ChuckPageHeader />

			<ControlsCard
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={handleCategoryChange}
				searchText={searchText}
				onSearchTextChange={handleSearchTextChange}
				onSearch={performSearch}
				loading={loading}
			/>

			<JokeCard
				jokeText={joke?.value}
				loading={loading}
				error={error}
				category={selectedCategory}
				jokeMode={jokeMode}
			/>
		</Layout>
	);
}
