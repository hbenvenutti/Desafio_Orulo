import React from 'react';

import 'dotenv/config';

import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyles />
    </>
  );
}

export default App;
