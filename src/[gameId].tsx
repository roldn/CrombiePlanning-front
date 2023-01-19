import './App.css';
import { io } from 'socket.io-client';
import useRoom from './helpers/useRoom';
import Cards from './components/Card';
import Votes from './components/Votes';
import { StyledButton, StyledTextField } from './styles';
import { Typography } from '@mui/material';

const socket = io('ws://localhost:3000');

const Game = () => {
  const { room, user } = useRoom(socket);

  return (
    <div className='App'>
      {room.gameStarted && <div className='game-name'>{room.gameName}</div>}
      {room.gameStarted && <h4>User: {user.username}</h4>}

      {/* <h4>Room ID: {room.roomId}</h4> */}

      {!room.roomId && !room.gameStarted && (
        <>
          <Typography
            sx={{
              fontSize: 19.7,
              marginBottom: 4,
              marginTop: -15
            }}>
            Choose a name and a voting system for your game.
          </Typography>
          <StyledTextField
            variant='outlined'
            label="Game's name"
            onChange={e => room.setGameName(e.target.value)}
          />
          <StyledButton
            autoCapitalize='none'
            variant='contained'
            color='primary'
            disabled={!room.gameName}
            onClick={() =>
              room.createRoom(user.username || '', room.gameName, user.clientId)
            }>
            Create game
          </StyledButton>
        </>
      )}

      {!room.gameStarted && room.roomId && (
        <>
          <StyledTextField
            variant='outlined'
            placeholder='Username'
            type='text'
            onChange={e => {
              user.setUsername(e.target.value);
            }}
            disabled={user.clientId !== undefined && user.clientId.length < 0}
          />

          <StyledButton
            variant='contained'
            color='primary'
            disabled={!room.roomId}
            onClick={room.handleChooseUsername}>
            Continue to game
          </StyledButton>
        </>
      )}

      {room.gameStarted && (
        <div>
          {!room.reveal ? (
            <StyledButton
              variant='contained'
              color='primary'
              disabled={
                !user.allowedReveal ||
                (!user.canReveal &&
                  room.users &&
                  !room.users.some(user => user.card.length > 0))
              }
              onClick={() => user.revealCards(room.roomId)}>
              Reveal
            </StyledButton>
          ) : (
            <StyledButton
              variant='contained'
              color='primary'
              disabled={!room.roomId || !user.allowedNewGame}
              onClick={() => user.startNewVoting(room.roomId)}>
              New Game
            </StyledButton>
          )}
        </div>
      )}

      {room.gameStarted && (
        <Votes
          users={room.users}
          reveal={room.reveal}
        />
      )}

      {!room.reveal && room.gameStarted && room.gameName && (
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
