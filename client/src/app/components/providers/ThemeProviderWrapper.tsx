import React, { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { settingsStore } from "@/store/settingsStore";
import useTranslation from "next-translate/useTranslation";
import { createTheme } from "@/theme";

interface ThemeProviderWrapperProps {
  children: JSX.Element;
}

export const ThemeProviderWrapper = ({
  children,
}: ThemeProviderWrapperProps) => {
  const { lang } = useTranslation();
  const [mode] = settingsStore((state) => [state.mode]);

  const theme = useMemo(
    () =>
      createTheme({
        direction: lang === "ar" ? "rtl" : "ltr",
        mode,
      }),
    [mode, lang]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
