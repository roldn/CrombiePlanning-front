import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  width: 200,
  marginLeft: 'auto',
  marginRight: 'auto'
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: 200
}));
