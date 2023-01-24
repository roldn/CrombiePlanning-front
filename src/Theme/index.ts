import { blue, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: blue[500],
      light: blue[100]
    },
    secondary: {
      main: pink[500]
    },
    text: {
      secondary: blue[500]
    }
  },
  spacing: 10,
  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif'
  }
});
