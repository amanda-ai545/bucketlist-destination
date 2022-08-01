
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',

    h1: {
      fontFamily: '"Lobster", cursive',
      fontSize: '24px',
    },
    h2: {
      marginBottom: '20px',
      fontSize: '38px',
      fontWeight: '400',
    },
    h3: {
      fontSize: '30px',
    }
  },
});

export const useStyles = makeStyles({
  main: {
    paddingTop: '24px',
    paddingBottom: '82px',
  },
});