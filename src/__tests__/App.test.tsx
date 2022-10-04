import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener: function () {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeListener: function () {},
    };
  };

test('renders app', () => {
  render(<App />);
});
