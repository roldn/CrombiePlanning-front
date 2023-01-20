import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledButton } from './styles';

const NotFound = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 25
        }}>
        Ups... Room not found
      </Typography>
      <Link
        to={'/'}
        style={{ textDecoration: 'none' }}>
        <StyledButton
          variant='contained'
          sx={{ width: 300 }}>
          Go Home
        </StyledButton>
      </Link>
    </Box>
  );
};

export default NotFound;
