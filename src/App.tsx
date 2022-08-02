import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { AppProvider } from './contexts';

import HeaderArea from './components/Header';
import FooterArea from './components/Footer';

import HomeArea from './pages/Home';
import DestinationsArea from './pages/Destinations';
import BookmarksArea from './pages/Bookmarks';

import { useStyles, theme } from './style';

function App() {
  const classes = useStyles();

  return (
    <AppProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <HeaderArea />

          <Container maxWidth="lg" className={classes.main}>
            <Routes>
              <Route path="/" element={<HomeArea />} />
              <Route path="/destinations" element={<DestinationsArea />} />
              <Route path="/bookmarks" element={<BookmarksArea />} />
            </Routes>
          </Container>

          <FooterArea />
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;