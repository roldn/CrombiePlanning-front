import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000');

type User = {
  clientId: string;
  username: string;
  card: string | undefined;
};

function App() {
  const [roomId, setRoomId] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [users, setUsers] = useState<User[]>();
  const [reveal, setReveal] = useState<boolean>(false);

  const handleCardSelect = (card: number) => {
    socket.emit('card', { card, username, room: roomId });
  };

  const createRoom = () => {
    socket.emit('create_room', username);
  };

  const revealCards = () => {
    socket.emit('reveal_cards', roomId);
    setReveal(true);
  };

  const joinRoom = () => {
    socket.emit('join_room', { roomId, username });
  };

  const startNewVoting = () => {
    socket.emit('start_new_voting', roomId);
    setReveal(false);
  };

  useEffect(() => {
    socket.on('new_room', newRoom => {
      setRoomId(newRoom);
    });

    socket.on('users', room => {
      setUsers(room.users);
      setReveal(room.reveal);
    });

    socket.on('reveal_cards', () => {
      setReveal(true);
    });

    socket.on('start_new_voting', room => {
      setReveal(false);
      setUsers(room.users);
    });
  }, []);

  const fiboCards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  return (
    <div className='App'>
      <h2>Room ID: {roomId}</h2>

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
        onChange={e => setRoomId(e.target.value)}
      />
      <button
        disabled={!roomId || !username}
        onClick={joinRoom}>
        Join Room
      </button>

      <hr />

      <div>
        {!reveal ? (
          <button
            disabled={!roomId || !username}
            onClick={revealCards}>
            Reveal
          </button>
        ) : (
          <button
            disabled={!roomId || !username}
            onClick={startNewVoting}>
            New Game
          </button>
        )}
      </div>

      <div className='card-container'>
        {users?.length &&
          users.map(user => (
            <div key={user.clientId}>
              {reveal ? (
                <div className='card received-card'>{user.card}</div>
              ) : (
                <div className='card back-card'></div>
              )}
              <div className='user'>{user.username}</div>
            </div>
          ))}
      </div>

      {!reveal && (
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
      )}
    </div>
  );
}

export default App;
