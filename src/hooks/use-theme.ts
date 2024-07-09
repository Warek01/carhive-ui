import { Theme } from '@mui/material/styles';
import { useMemo } from 'react';

import { useIsDarkTheme } from '@faf-cars/hooks/index';
import { DARK_THEME, LIGHT_THEME } from '@faf-cars/lib/themes';

export default function useTheme() {
  const [isDarkTheme] = useIsDarkTheme();

  return useMemo<Theme>(
    () => (isDarkTheme ? DARK_THEME : LIGHT_THEME),
    [isDarkTheme],
  );
}
