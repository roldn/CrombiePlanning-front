import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './[gameId]';

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
