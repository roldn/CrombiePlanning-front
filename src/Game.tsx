import './App.css';
import { io } from 'socket.io-client';
import useRoom from './helpers/useRoom';
import Cards from './components/Card';
import Votes from './components/Votes';
import { StyledButton, StyledTextField } from './styles';
import { Typography } from '@mui/material';
import Board from './components/Board';

const socket = io('ws://localhost:3000');

const Game = () => {
  const { room, user } = useRoom(socket);

  return (
    <div className='App'>
      {room.gameStarted && <div className='game-name'>{room.gameName}</div>}
      {room.gameStarted && <div className='game-username'>{user.username}</div>}

      {!room.roomId && !room.gameStarted && (
        <>
          <Typography
            sx={{
              fontSize: 21,
              marginBottom: 4,
              marginTop: -15,
              fontWeight: 600
            }}>
            Choose a name for your game.
          </Typography>
          <StyledTextField
            autoComplete='off'
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

      {!room.gameStarted && room.roomId && room.gameName && (
        <>
          <Typography
            sx={{
              fontSize: 21,
              marginBottom: 4,
              marginTop: -15,
              fontWeight: 600
            }}>
            Choose your display name
          </Typography>
          <StyledTextField
            variant='outlined'
            label='Your display name'
            type='text'
            onChange={e => {
              user.setUsername(e.target.value);
            }}
            disabled={user.clientId !== undefined && user.clientId.length < 0}
          />

          <StyledButton
            variant='contained'
            color='primary'
            disabled={!room.roomId || !user.username}
            onClick={room.handleChooseUsername}>
            Continue to game
          </StyledButton>
        </>
      )}

      {room.gameStarted && room.gameName && (
        <Board
          users={room.users}
          roomId={room.roomId}
          allowedReveal={user.allowedReveal}
          revealing={room.revealing}
          revealCards={user.revealCards}
          startNewVoting={user.startNewVoting}
          revealingTime={room.revealingTime}
        />
      )}

      {room.gameStarted && (
        <Votes
          users={room.users}
          reveal={room.revealing && room.revealingTime <= 0}
        />
      )}

      {!room.revealing && room.gameStarted && (
        <Cards
          roomId={room.roomId}
          clientId={user.clientId}
          fiboCards={room.fiboCards}
          handleCardSelect={user.handleCardSelect}
        />
      )}

      {room.revealing && room.revealingTime <= 0 && (
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
