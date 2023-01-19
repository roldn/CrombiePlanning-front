import './App.css';
import { io } from 'socket.io-client';
import useRoom from './helpers/useRoom';
import Cards from './components/Card';
import Votes from './components/Votes';
import { StyledButton, StyledTextField } from './styles';
import { Box, Typography } from '@mui/material';

const socket = io('ws://localhost:3000');

const Game = () => {
  const { room, user } = useRoom(socket);

  return (
    <div className='App'>
      {room.gameStarted && <div className='game-name'>{room.gameName}</div>}
      {room.gameStarted && <div className='game-username'>{user.username}</div>}

      {/* <h4>Room ID: {room.roomId}</h4> */}

      {!room.roomId && !room.gameStarted && (
        <>
          <Typography
            sx={{
              fontSize: 21,
              marginBottom: 4,
              marginTop: -15,
              fontWeight: 600
            }}>
            Choose a name and a voting system for your game.
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

      {!room.gameStarted && room.roomId && (
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

      {room.gameStarted && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#d7e9ff',
            width: 330,
            height: 150,
            borderRadius: '25px',
            margin: '0 auto'
          }}>
          {!room.reveal &&
          room.users &&
          !room.users.some(user => user.card.length > 0) ? (
            <Typography sx={{ fontSize: 18 }}>Pick your cards!</Typography>
          ) : !room.reveal && user.allowedReveal && user.canReveal ? (
            <StyledButton
              sx={{
                width: 160,
                fontSize: 20
              }}
              variant='contained'
              color='primary'
              onClick={() => user.revealCards(room.roomId)}>
              Reveal cards
            </StyledButton>
          ) : !room.reveal && !user.allowedReveal ? (
            <Typography sx={{ fontSize: 18 }}>Voting in progress</Typography>
          ) : room.reveal && !user.allowedReveal ? (
            <Typography sx={{ fontSize: 18 }}>Voting finished</Typography>
          ) : (
            <StyledButton
              sx={{
                width: 160,
                fontSize: 19
              }}
              variant='contained'
              color='primary'
              disabled={!room.roomId || !user.allowedNewGame}
              onClick={() => user.startNewVoting(room.roomId)}>
              New Game
            </StyledButton>
          )}
        </Box>
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
