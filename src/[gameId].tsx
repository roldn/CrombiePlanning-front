import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import useCreateRoom from './helpers/useCreateRoom';
import useCards from './helpers/useCards';

const socket = io('ws://localhost:3000');

type User = {
  clientId: string;
  username: string;
  card: string;
};

type CardVotes = {
  card: string;
  quantity: number;
};

const Game = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>();
  const [average, setAverage] = useState<number | undefined>();
  const [cards, setCards] = useState<CardVotes[]>();
  const [coffee, setCoffee] = useState<boolean>(false);
  const [clientId, setClientId] = useState<string>('');
  const { roomParamId } = useParams();

  const {
    gameStarted,
    allowedReveal,
    allowedNewGame,
    setGameStarted,
    createRoom,
    gameName,
    setGameName
  } = useCreateRoom();

  const {
    reveal,
    setReveal,
    revealCards,
    canReveal,
    handleCardSelect,
    setCanReveal,
    fiboCards
  } = useCards(socket);

  const joinRoom = () => {
    if (clientId) {
      socket.emit('client:join_room', { roomId, username, clientId });
    } else {
      socket.emit('client:join_room', { roomId, username });
    }
  };

  const startNewVoting = () => {
    socket.emit('client:start_new_voting', roomId);
    setReveal(false);
    setCards([]);
    setCoffee(false);
  };

  const setClientInLocalStorage = (username: string, clientId: string) => {
    const clientInfo = JSON.stringify({ username, clientId });
    localStorage.setItem('client', clientInfo);
  };

  const getClientFromLocalStorage = () => {
    const clientInfo = localStorage.getItem('client');

    if (clientInfo) {
      const clientInfoParsed = JSON.parse(clientInfo);

      setUsername(clientInfoParsed.username);
      setClientId(clientInfoParsed.clientId);

      socket.emit('client:client_connected', { username, clientId });
    }
  };

  const addUsername = () => {
    socket.emit('client:add_username', { username, roomId });
  };

  useEffect(() => {
    getClientFromLocalStorage();
    if (roomParamId) {
      setRoomId(roomParamId);
      joinRoom();
    }
  }, [roomId]);

  useEffect(() => {
    socket.on('server:new_room', ({ roomId, users }) => {
      setRoomId(roomId);
      setUsers(users);
      window.history.replaceState(null, `Game ${gameName}`, `${roomId}`);
    });

    socket.on(
      'server:user_joined',
      ({ roomUsers, reveal, gameName, coffeeTime, cardsVotes, average }) => {
        setUsers(roomUsers);
        setReveal(reveal);
        setGameName(gameName);
        setGameStarted(true);
        setCoffee(coffeeTime);
        setCards(cardsVotes);
        setAverage(average);
      }
    );

    socket.on('server:users', ({ roomVoting, reveal }) => {
      setUsers(roomVoting);
      setReveal(reveal);
    });

    socket.on('server:reveal_cards', ({ averageVoting, cardsVotes }) => {
      setCards(cardsVotes);
      setAverage(averageVoting);
      setReveal(true);
    });

    socket.on('server:start_new_voting', ({ roomUsers }) => {
      setReveal(false);
      setUsers(roomUsers);
      setAverage(undefined);
      setCards([]);
      setCoffee(false);
      setCanReveal(false);
      fiboCards.forEach(fibo => (fibo.checked = false));
    });

    socket.on('server:coffee', () => {
      setCoffee(true);
    });

    socket.on('server:client_id', clientId => {
      setClientId(clientId);
      setClientInLocalStorage(username || '', clientId);
    });
  }, [username, users]);

  return (
    <div className='App'>
      {gameStarted && <div className='game-name'>{gameName}</div>}

      <h4>Room ID: {roomId}</h4>
      <h4>Client ID: {clientId}</h4>
      <h4>User: {username}</h4>

      {!roomId && !gameStarted && (
        <>
          <button
            disabled={!username || !gameName}
            onClick={() => createRoom(socket, username, gameName, clientId)}>
            Create Room
          </button>

          <input
            placeholder='Game Name'
            type='text'
            onChange={e => setGameName(e.target.value)}
          />
        </>
      )}

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

      <div>
        {!reveal ? (
          <button
            disabled={
              !allowedReveal ||
              (!canReveal && !users?.some(user => user.card.length > 0))
            }
            onClick={() => revealCards(roomId)}>
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

      {!reveal && gameStarted && (
        <div className='card-container'>
          {fiboCards.map(fibo => (
            <div
              onClick={() => handleCardSelect(fibo.card, roomId, clientId)}
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
      )}
    </div>
  );
};

export default Game;
