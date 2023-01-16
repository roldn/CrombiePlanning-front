import './App.css';
import { io } from 'socket.io-client';
import useRoom from './helpers/useRoom';
import Cards from './components/Card';
import Votes from './components/Votes';

const socket = io('ws://localhost:3000');

const Game = () => {
  const { room, user } = useRoom(socket);

  return (
    <div className='App'>
      {room.gameStarted && <div className='game-name'>{room.gameName}</div>}

      <h4>Room ID: {room.roomId}</h4>
      <h4>Client ID: {user.clientId}</h4>
      <h4>User: {user.username}</h4>

      {!room.roomId && !room.gameStarted && (
        <>
          <button
            disabled={!user.username || !room.gameName}
            onClick={() =>
              room.createRoom(user.username, room.gameName, user.clientId)
            }>
            Create Room
          </button>

          <input
            placeholder='Game Name'
            type='text'
            onChange={e => room.setGameName(e.target.value)}
          />
        </>
      )}

      <hr />

      <input
        placeholder='Username'
        type='text'
        onChange={e => user.setUsername(e.target.value)}
        disabled={user.clientId !== undefined && user.clientId.length < 0}
      />

      <button
        disabled={!room.roomId}
        onClick={() => user.changeUsername(room.roomId)}>
        Continue to game
      </button>

      <hr />

      <div>
        {!room.reveal ? (
          <button
            disabled={
              !user.allowedReveal ||
              (!user.canReveal &&
                !room.users?.some(user => user.card.length > 0))
            }
            onClick={() => user.revealCards(room.roomId)}>
            Reveal
          </button>
        ) : (
          <button
            disabled={!room.roomId || !user.allowedNewGame}
            onClick={() => user.startNewVoting(room.roomId)}>
            New Game
          </button>
        )}
      </div>

      <Votes
        users={room.users}
        reveal={room.reveal}
      />

      {!room.reveal && room.gameStarted && (
        <Cards
          roomId={room.roomId}
          clientId={user.clientId}
          fiboCards={room.fiboCards}
          handleCardSelect={user.handleCardSelect}
        />
      )}

      {room.reveal && (
        <div className='card-container'>
          {room.cards &&
            room.cards.map(card => (
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
            {room.average !== undefined && room.average !== null && (
              <div className='average'>
                <p>Average:</p>
                <p className='average-number'>{room.average}</p>
              </div>
            )}

            {room.coffee && (
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
