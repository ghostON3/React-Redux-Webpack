import {
	FormControl,
	InputLabel as MuiInputLabel,
	MenuItem,
	Select,
} from "@mui/material";

import { RANDOM_CATEGORY } from "@/store/chuck/chuckSlice";

type CategorySelectProps = {
	categories: string[];
	onChange: (category: string) => void;
	selectedCategory: string;
};

const inputLabelText = "Category";

export default function CategorySelect({
	categories,
	selectedCategory,
	onChange,
}: CategorySelectProps) {
	return (
		<FormControl fullWidth size="medium">
			<MuiInputLabel
				id="category-label"
				sx={{ fontSize: "1rem", fontWeight: 500 }}
			>
				{inputLabelText}
			</MuiInputLabel>
			<Select
				labelId="category-label"
				value={selectedCategory}
				label={inputLabelText}
				onChange={(e) => onChange(e.target.value)}
				sx={{
					textAlign: "left",
					borderRadius: 2,
					"& .MuiOutlinedInput-root": { borderRadius: 2 },
				}}
			>
				<MenuItem value={RANDOM_CATEGORY.id}>{RANDOM_CATEGORY.label} </MenuItem>
				{categories.map((category) => (
					<MenuItem key={category} value={category}>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
