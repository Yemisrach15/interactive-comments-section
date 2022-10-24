import React from 'react';
import { ReactComponent as SunIcon } from '../assets/icons/icon-sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/icon-moon.svg';
import { Button } from '../components';
import { useStickystate } from '../hooks';
import { themeState } from '../store';
import { StringDictionary } from '../utils/constants';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useStickystate<string>(themeState, StringDictionary.THEME);

  document.body.dataset.theme = theme;
  return (
    <>
      <Button
        className="btn btn--text-primary fixed fixed--left-center"
        icon={theme === 'dark' ? MoonIcon : SunIcon}
        onClick={() => (theme ? setTheme(theme === 'dark' ? 'light' : 'dark') : null)}
        title={`Change to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <span className="sr-only">{`Change to ${theme === 'dark' ? 'light' : 'dark'} theme`}</span>
      </Button>
      {props.children}
    </>
  );
}

export default ThemeProvider;
