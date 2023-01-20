import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../styles';
import { User } from '../types/User';
import { useMemo } from 'react';

type Board = {
  revealing: boolean;
  users: User[] | undefined;
  allowedReveal: boolean;
  revealCards: (roomId: string) => void;
  startNewVoting: (roomId: string) => void;
  roomId: string;
  revealingTime: number;
};

const Board: React.FC<Board> = ({
  users,
  revealing,
  allowedReveal,
  revealCards,
  startNewVoting,
  roomId,
  revealingTime
}) => {
  const boardContent = useMemo(() => {
    if (!revealing) {
      if (allowedReveal) {
        if (users && users.some(user => user.card.length > 0)) {
          return (
            <StyledButton
              sx={{
                width: 160,
                fontSize: 20
              }}
              variant='contained'
              color='primary'
              onClick={() => {
                revealCards(roomId);
              }}>
              Reveal cards
            </StyledButton>
          );
        }
      } else {
        return (
          <Typography sx={{ fontSize: 18 }}>Voting in progress</Typography>
        );
      }
    } else if (revealingTime <= 0) {
      if (allowedReveal) {
        return (
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
        );
      } else {
        return <Typography sx={{ fontSize: 18 }}>Voting finished</Typography>;
      }
    } else {
      return (
        <Typography
          sx={{ fontSize: 25, fontWeight: 700, color: 'text.secondary' }}>
          {revealingTime}
        </Typography>
      );
    }
    return <Typography sx={{ fontSize: 18 }}>Pick your cards!</Typography>;
  }, [allowedReveal, users, revealing, revealingTime]);

  return (
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
      {boardContent}
    </Box>
  );
};

export default Board;
