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
  modal__box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: '40px',
  }
});