import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Game from './[gameId]';

// const socket = io('ws://localhost:3000');

// type User = {
//   clientId: string;
//   username: string;
//   card: string;
// };

// type CardVotes = {
//   card: string;
//   quantity: number;
// };

// const fiboCards = [
//   { card: '0', checked: false },
//   { card: '1', checked: false },
//   { card: '2', checked: false },
//   { card: '3', checked: false },
//   { card: '5', checked: false },
//   { card: '8', checked: false },
//   { card: '13', checked: false },
//   { card: '21', checked: false },
//   { card: '34', checked: false },
//   { card: '55', checked: false },
//   { card: '89', checked: false },
//   { card: '?', checked: false },
//   { card: '☕', checked: false }
// ];

function App() {
  // const [roomId, setRoomId] = useState<string>();
  // const [username, setUsername] = useState<string>();
  // const [users, setUsers] = useState<User[]>();
  // const [reveal, setReveal] = useState<boolean>(false);
  // const [gameName, setGameName] = useState<string>();
  // const [gameStarted, setGameStarted] = useState<boolean>(false);
  // const [cardSelected, setCardSelected] = useState<string>();
  // const [average, setAverage] = useState<number | undefined>();
  // const [cards, setCards] = useState<CardVotes[]>();
  // const [coffee, setCoffee] = useState<boolean>(false);
  // const [clientId, setClientId] = useState<string>('');
  // const [canReveal, setCanReveal] = useState(false);
  // const [allowedReveal, setAllowedReveal] = useState(false);
  // const [allowedNewGame, setAllowedNewGame] = useState(false);

  // const handleCardSelect = (card: string) => {
  //   if (!roomId) {
  //     return;
  //   }

  //   fiboCards.forEach(fibo => (fibo.checked = false));
  //   const cardIndex = fiboCards.findIndex(fibo => fibo.card === card);

  //   if (cardIndex === -1) {
  //     return;
  //   }

  //   if (cardSelected === card) {
  //     setCanReveal(false);
  //     socket.emit('client:card_select', { card: '', roomId, clientId });
  //     setCardSelected('');
  //     fiboCards[cardIndex].checked = false;
  //     return;
  //   } else {
  //     setCanReveal(true);
  //     socket.emit('client:card_select', { card, roomId, clientId });
  //     setCardSelected(card);
  //     fiboCards[cardIndex].checked = true;
  //     return;
  //   }
  // };

  // const createRoom = () => {
  //   if (clientId) {
  //     socket.emit('client:create_room', { username, gameName, clientId });
  //   } else {
  //     socket.emit('client:create_room', { username, gameName });
  //   }
  //   setGameStarted(true);
  //   setAllowedReveal(true);
  //   setAllowedNewGame(true);
  // };

  // const revealCards = () => {
  //   socket.emit('client:reveal_cards', roomId);
  //   setReveal(true);
  //   setCardSelected('');
  //   fiboCards.forEach(fibo => (fibo.checked = false));
  // };

  // const joinRoom = () => {
  //   if (clientId) {
  //     socket.emit('client:join_room', { roomId, username, clientId });
  //   } else {
  //     socket.emit('client:join_room', { roomId, username });
  //   }
  // };

  // const startNewVoting = () => {
  //   socket.emit('client:start_new_voting', roomId);
  //   setReveal(false);
  //   setCardSelected('');
  //   setCards([]);
  //   setCoffee(false);
  // };

  // const setClientInLocalStorage = (username: string, clientId: string) => {
  //   const clientInfo = JSON.stringify({ username, clientId });

  //   localStorage.setItem('client', clientInfo);
  // };

  // const getClientFromLocalStorage = () => {
  //   const clientInfo = localStorage.getItem('client');

  //   if (clientInfo) {
  //     const clientInfoParsed = JSON.parse(clientInfo);

  //     setUsername(clientInfoParsed.username);
  //     setClientId(clientInfoParsed.clientId);

  //     socket.emit('client:client_connected', { username, clientId });
  //   }
  // };

  // const addUsername = () => {
  //   socket.emit('client:add_username', { username, roomId });
  // };

  // useEffect(() => {
  //   getClientFromLocalStorage();
  // }, []);

  // useEffect(() => {
  //   socket.on('server:new_room', ({ roomId, users }) => {
  //     setRoomId(roomId);
  //     setUsers(users);
  //   });

  //   socket.on(
  //     'server:user_joined',
  //     ({ roomUsers, reveal, gameName, coffeeTime, cardsVotes, average }) => {
  //       setUsers(roomUsers);
  //       setReveal(reveal);
  //       setGameName(gameName);
  //       setGameStarted(true);
  //       setCoffee(coffeeTime);
  //       setCards(cardsVotes);
  //       setAverage(average);
  //     }
  //   );

  //   socket.on('server:users', ({ roomVoting, reveal }) => {
  //     setUsers(roomVoting);
  //     setReveal(reveal);
  //   });

  //   socket.on('server:reveal_cards', ({ averageVoting, cardsVotes }) => {
  //     setCards(cardsVotes);
  //     setAverage(averageVoting);
  //     setReveal(true);
  //   });

  //   socket.on('server:start_new_voting', ({ roomUsers }) => {
  //     setReveal(false);
  //     setUsers(roomUsers);
  //     setAverage(undefined);
  //     setCards([]);
  //     setCoffee(false);
  //     setCardSelected('');
  //     setCanReveal(false);
  //     fiboCards.forEach(fibo => (fibo.checked = false));
  //   });

  //   socket.on('server:coffee', () => {
  //     setCoffee(true);
  //   });

  //   socket.on('server:client_id', clientId => {
  //     setClientId(clientId);
  //     setClientInLocalStorage(username || '', clientId);
  //   });
  // }, [username, users]);

  return (
    <div>
      <Game />

      {/* {gameStarted && <div className='game-name'>{gameName}</div>}

      <h4>Room ID: {roomId}</h4>
      <h4>Client ID: {clientId}</h4>
      <h4>User: {username}</h4>

      <button
        disabled={!username || !gameName}
        onClick={createRoom}>
        Create Room
      </button>

      <input
        placeholder='Game Name'
        type='text'
        onChange={e => setGameName(e.target.value)}
      />

      <hr />

      <input
        placeholder='Username'
        type='text'
        onChange={e => setUsername(e.target.value)}
        disabled={clientId !== undefined && clientId.length < 0}
      />

      <button
        disabled={!roomId}
        onClick={addUsername}>
        Continue to game
      </button>

      <hr />

      <input
        placeholder='Room Number'
        type='text'
        onChange={e => setRoomId(e.target.value)}
      />
      <button
        disabled={!roomId}
        onClick={joinRoom}>
        Join Room
      </button>

      <hr />

      <div>
        {!reveal ? (
          <button
            disabled={
              !allowedReveal ||
              (!canReveal && !users?.some(user => user.card.length > 0))
            }
            onClick={revealCards}>
            Reveal
          </button>
        ) : (
          <button
            disabled={!roomId || !allowedNewGame}
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
                <div
                  className={
                    user.card
                      ? 'card-voted received-card'
                      : 'card-voted card-empty'
                  }>
                  {user.card}
                </div>
              ) : (
                <div
                  className={
                    user.card ? 'card-voted back-card' : 'card-voted card-empty'
                  }></div>
              )}
              <div className='user'>{user.username}</div>
            </div>
          ))}
      </div>

      {!reveal && (
        <div className='card-container'>
          {fiboCards.map(fibo => (
            <div
              onClick={() => handleCardSelect(fibo.card)}
              className={fibo.checked ? 'card-checked' : 'card'}
              key={fibo.card}>
              {fibo.card}
            </div>
          ))}
        </div>
      )}

      {reveal && (
        <div className='card-container'>
          {cards &&
            cards.map(card => (
              <div
                key={card.card}
                className='card-vote-container'>
                <div className='card-vote'>{card.card}</div>
                <span className='vote-quantity'>
                  {card.quantity} {card.quantity > 1 ? 'Votes' : 'Vote'}
                </span>
              </div>
            ))}

          <div>
            {average !== undefined && average !== null && (
              <div className='average'>
                <p>Average:</p>
                <p className='average-number'>{average}</p>
              </div>
            )}

            {coffee && (
              <div className='coffee'>
                <p>Coffee time!</p>
                <span>☕</span>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default App;
