import { FC } from 'react';
import { Link } from "react-router-dom";

import { Container, Box, Grid, Typography } from '@mui/material';
import { useStyles } from './style';

const HeaderArea: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={4} xs={12} marginBottom={{ xs: 3, md: '0' }} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h1" component="h1">
              mybucketlist.io
            </Typography>
          </Grid>
          <Grid item md="auto" xs={12}>
            <Grid container columnSpacing={5} justifyContent={{ xs: 'center', md: 'right' }}>
              <Grid item xs="auto">
                <Link to="/" className={classes.header__link}>Home</Link>
              </Grid>
              <Grid item xs="auto">
                <Link to="/destinations" className={classes.header__link}>Destinations</Link>
              </Grid>
              <Grid item xs="auto">
                <Link to="/bookmarks" className={classes.header__link}>Bookmarks</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box >
  )
}

export default HeaderArea;