import React from 'react'
import Room from './components/room/features';
import { io } from 'socket.io-client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const socket = io(`http://localhost:3000`);

function App() {
  return (

    <Room/>

  );
}

export default App
