import React from 'react';
import { RecoilRoot } from 'recoil';
import { Footer } from './components';
import { Main } from './pages';
import { ThemeProvider } from './layout';
import './stylesheets/style.css';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Main />
        <Footer />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
