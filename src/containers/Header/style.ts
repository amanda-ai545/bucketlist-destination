import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  header: {
    padding: '20px 0',
    borderBottom: '1px solid #ddd',
  },
  header__link: {
    display: 'block',
    color: '#000',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    textAlign: 'center',
    textDecoration: 'none',

    '&:hover': {
      opacity: '0.6',
    }
  }
});