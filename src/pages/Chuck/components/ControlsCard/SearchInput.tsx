import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

type SearchInputProps = {
	loading: boolean;
	onChange: (text: string) => void;
	onSearch: () => void;
	searchText: string;
};

const searchPlaceholder = "Search for jokes...";
const searchLabel = "Search";

export default function SearchInput({
	searchText,
	onChange,
	onSearch,
	loading,
}: SearchInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch();
		}
	};

	return (
		<Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
			<TextField
				fullWidth
				label={searchLabel}
				placeholder={searchPlaceholder}
				size="medium"
				variant="outlined"
				value={searchText}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: 2,
					},
				}}
			/>
			<Button
				size="large"
				variant="contained"
				onClick={onSearch}
				disabled={loading}
				aria-label="search"
				sx={{
					height: 56,
					borderRadius: 2,
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
					"&:hover": {
						background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
						boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
					},
					"&:disabled": {
						background: "rgba(0, 0, 0, 0.12)",
						boxShadow: "none",
					},
				}}
			>
				<SearchIcon />
			</Button>
		</Box>
	);
}
