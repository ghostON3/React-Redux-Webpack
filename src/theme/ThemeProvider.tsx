import { CssBaseline } from "@mui/material";
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React, { ReactNode } from "react";

import { useAppSelector } from "@/store/hooks";

type ThemeProviderProps = {
	children: ReactNode;
};
const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const themeMode = useAppSelector((state) => state.globalStore.mode);

	const theme = React.useMemo(() => {
		return createTheme({
			palette: {
				mode: themeMode,

				...(themeMode === "dark"
					? {
							background: {
								default: "#121212",
								paper: "#1e1e1e",
							},
						}
					: {
							background: {
								default: "#F5F5F5",
								paper: "#ffffff",
							},
						}),
			},
			cssVariables: true,
		});
	}, [themeMode]);

	return (
		<MuiThemeProvider theme={theme} defaultMode="dark">
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
};

export default ThemeProvider;
