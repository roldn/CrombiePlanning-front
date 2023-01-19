import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<{ open?: boolean }>(({ theme, open }) => ({
  color: 'grey',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  padding: 18,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    color: 'grey',
    backgroundColor: 'transparent',
    width: `calc(100% - ${450}px)`,
    boxShadow: 'none',
    marginRight: 450,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open'
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  color: 'black',
  fontSize: 35,
  flexGrow: 1,
  marginTop: theme.spacing(10),
  padding: theme.spacing(5),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -450,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));

export const StyledButton = styled(Button)<{
  open?: boolean;
}>(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  borderWidth: '2px',
  minWidth: 40,
  padding: '9px 10px',
  borderRadius: '8px',
  ':hover': {
    borderWidth: '2px',
    backgroundColor: '#ebf4ff'
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
}));
