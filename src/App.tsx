import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000');

type User = {
  clientId: string;
  username: string;
  card: string | null;
};

function App() {
  const [room, setRoom] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [users, setUsers] = useState<User[]>();

  const handleCardSelect = (card: number) => {
    socket.emit('card', { card, username, room });
  };

  const createRoom = () => {
    socket.emit('create_room', username);
  };

  useEffect(() => {
    socket.on('new_room', newRoom => {
      setRoom(newRoom);
    });

    socket.on('users', users => {
      setUsers(users);
    });
  }, []);

  const joinRoom = () => {
    socket.emit('join_room', { room, username });
  };

  const fiboCards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  return (
    <div className='App'>
      <h1>{room}</h1>

      <button
        disabled={!username}
        onClick={createRoom}>
        Create Room
      </button>

      <input
        placeholder='Username'
        type='text'
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder='Room Number'
        type='text'
        onChange={e => setRoom(e.target.value)}
      />
      <button
        disabled={!room || !username}
        onClick={joinRoom}>
        Join Room
      </button>

      <div className='card-container'>
        {users?.length &&
          users.map(user => (
            <div key={user.clientId}>
              <div className='card received-card'>{user.card}</div>
              <div className='user'>{user.username}</div>
            </div>
          ))}
      </div>

      <div className='card-container'>
        {fiboCards.map(card => (
          <div
            onClick={() => handleCardSelect(card)}
            className='card'
            key={card}>
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
