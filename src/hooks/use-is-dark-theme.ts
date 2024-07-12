import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { StorageKey } from '@faf-cars/lib/storage';

type ReturnValue = [boolean, Dispatch<SetStateAction<boolean>>];

export const useIsDarkTheme = (): ReturnValue => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>(
    StorageKey.Theme,
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  return [isDarkTheme, setIsDarkTheme];
};
