import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  home__link: {
    display: 'block',
    margin: '10px 20px',
    color: '#1a56db',
    textAlign: 'right',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
});