import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    padding: '20px 0',
    backgroundColor: '#222',

    '& p': {
      color: '#fff',
      fontSize: '12px',
      textAlign: 'center',
    }
  },
});