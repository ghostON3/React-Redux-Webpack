import { Typography } from "@mui/material";

type SuccessStateProps = {
	text: string;
};

export default function SuccessState({ text }: SuccessStateProps) {
	return (
		<Typography
			variant="body1"
			sx={{
				fontSize: "1.3rem",
				lineHeight: 1.7,
				whiteSpace: "pre-line",
				fontWeight: 400,
				maxWidth: "100%",
			}}
		>
			{text}
		</Typography>
	);
}
