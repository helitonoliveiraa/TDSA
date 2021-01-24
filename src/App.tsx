import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';

import { DataProvider } from './Context/index';

import Dashboard from './pages/Dashboard';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </StylesProvider>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
