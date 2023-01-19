import { styled } from '@mui/system';
import { Button, inputLabelClasses } from '@mui/material';
import { TextField } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: 640,
  padding: 6,
  borderRadius: '8px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textTransform: 'unset',
  fontSize: 22,
  fontWeight: 600
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label.MuiInputLabel-shrink': {
    padding: '0 0.8rem',
    fontWeight: 500,
    color: '#1a2935 !important',
    top: '-1px',
    left: '-11px'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #cfcfcf80',
      borderRadius: '8px'
    },
    '&:hover fieldset': {
      border: '2px solid #d4d4d4'
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main
    }
  },
  '& label.MuiInputLabel-root': {
    marginLeft: 2,
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    color: '#ababab'
  },
  '& input.MuiOutlinedInput-input': {
    marginLeft: 5
  },
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 640
}));
