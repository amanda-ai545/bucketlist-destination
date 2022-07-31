import React from 'react';
import { Routes, Route } from "react-router-dom";

import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

import HeaderArea from './containers/Header';
import FooterArea from './containers/Footer';
import HomeArea from './pages/Home';
import DestinationsArea from './pages/Destinations';
import BookmarksArea from './pages/Bookmarks';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',

    h1: {
      fontFamily: '"Lobster", cursive',
      fontSize: '24px',
    },
    h2: {
      marginBottom: '20px',
      fontSize: '38px',
      fontWeight: '400',
    }
  },
});

const useStyles = makeStyles({
  main: {
    paddingTop: '24px',
    paddingBottom: '82px',
  },
});


function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <HeaderArea />

      <Container maxWidth="lg" className={classes.main}>
        <Routes>
          <Route path="/" element={<HomeArea />} />
          <Route path="destinations" element={<DestinationsArea />} />
          <Route path="bookmarks" element={<BookmarksArea />} />
        </Routes>
      </Container>

      <FooterArea />
    </ThemeProvider>
  );
}

export default App;