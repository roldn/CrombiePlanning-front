import Room from './components/room/features';
import { io } from 'socket.io-client';

export const socket = io(`http://localhost:3000`);

function App() {
  return <Room />;
}

export default App;
