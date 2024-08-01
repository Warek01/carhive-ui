import { PaletteMode, Theme, ThemeOptions, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren, createContext, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { StorageKey } from '@faf-cars/lib/storage';
import { APP_THEME_OPTIONS } from '@faf-cars/lib/themes';

export interface ThemeContextProps {
  themeMode: PaletteMode;
  setThemeMode(value: PaletteMode): void;
}

export const ThemeContext = createContext<ThemeContextProps>(null!);

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeMode, setThemeMode] = useLocalStorage<PaletteMode>(
    StorageKey.Theme,
    () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
  );

  const theme = useMemo<Theme>(() => {
    const themeOptions: ThemeOptions = { ...APP_THEME_OPTIONS };
    themeOptions.palette!.mode = themeMode;
    return createTheme(themeOptions);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
