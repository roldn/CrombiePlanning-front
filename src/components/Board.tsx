import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../styles';
import { User } from '../types/User';

type Board = {
  gameStarted: boolean;
  reveal: boolean;
  users: User[] | undefined;
  allowedReveal: boolean;
  canReveal: boolean;
  revealCards: (roomId: string) => void;
  startNewVoting: (roomId: string) => void;
  roomId: string;
};

const Board: React.FC<Board> = ({
  gameStarted,
  users,
  reveal,
  allowedReveal,
  canReveal,
  revealCards,
  startNewVoting,
  roomId
}) => {
  return (
    <>
      {gameStarted && (
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
          {!reveal && users && !users.some(user => user.card.length > 0) ? (
            <Typography sx={{ fontSize: 18 }}>Pick your cards!</Typography>
          ) : !reveal && allowedReveal && canReveal ? (
            <StyledButton
              sx={{
                width: 160,
                fontSize: 20
              }}
              variant='contained'
              color='primary'
              onClick={() => revealCards(roomId)}>
              Reveal cards
            </StyledButton>
          ) : !reveal && !allowedReveal ? (
            <Typography sx={{ fontSize: 18 }}>Voting in progress</Typography>
          ) : reveal && !allowedReveal ? (
            <Typography sx={{ fontSize: 18 }}>Voting finished</Typography>
          ) : (
            <StyledButton
              sx={{
                width: 160,
                fontSize: 19
              }}
              variant='contained'
              color='primary'
              onClick={() => startNewVoting(roomId)}>
              New Game
            </StyledButton>
          )}
        </Box>
      )}
    </>
  );
};

export default Board;
