import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './Game';
import { appTheme } from './Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import NotFound from './404';

const router = createBrowserRouter([
  {
    path: '/:roomParamId',
    element: <Game />
  },
  {
    path: '/',
    element: <Game />
  },
  {
    path: '404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <NotFound />
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
