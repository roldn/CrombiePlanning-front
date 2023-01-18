import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './[gameId]';
import { appTheme } from './Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/:roomParamId',
    element: <Game />
  },
  {
    path: '/',
    element: <Game />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
