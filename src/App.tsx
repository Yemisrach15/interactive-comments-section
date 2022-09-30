import React from 'react';
import { Footer } from './components';
import { Main } from './pages';
import './stylesheets/style.css';
import { getInitialColorMode } from './utils';

export const ThemeContext = React.createContext<{
  colorMode?: string;
  setColorMode?: (value: string) => void;
}>({});

function App() {
  const [colorMode, rawSetColorMode] = React.useState(getInitialColorMode);

  const setColorMode = (value: string) => {
    rawSetColorMode(value);
    // Persist it on update
    window.localStorage.setItem('theme', value);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}

export default App;
