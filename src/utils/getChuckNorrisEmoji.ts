import { JokeMode, RANDOM_CATEGORY } from "@/store/chuck/chuckSlice";

const categoryIcons = {
	[RANDOM_CATEGORY.id]: "🎲",
	animal: "🐾",
	career: "💼",
	celebrity: "🌟",
	dev: "👨‍💻",
	explicit: "🔞",
	fashion: "👗",
	food: "🍔",
	history: "🏺",
	money: "💰",
	movie: "🎬",
	music: "🎵",
	political: "🗳️",
	religion: "✝️",
	science: "🔬",
	sport: "⚽",
	travel: "✈️",
} as const;

export type Category = keyof typeof categoryIcons;

export function getCategoryEmoji(
	jokeMode: JokeMode,
	category?: Category,
): string {
	if (jokeMode === JokeMode.SEARCHED) {
		return "🔎";
	}

	return categoryIcons[category ?? RANDOM_CATEGORY.id];
}
