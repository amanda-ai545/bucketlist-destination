import { FC } from 'react';

import { Grid, Typography, IconButton, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { LocationOn, TurnedInNot, TurnedIn } from '@mui/icons-material';
import { useStyles } from './style';

import { CardTypes, ItemsTypes } from '../../types';

const CardArea: FC<CardTypes> = ({ items, toggleBookmark }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={5}>
        {items?.map((item: ItemsTypes) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                height="300"
                image={item.image}
              />
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid container item xs={8} alignItems="center">
                    <Grid item xs={2}>
                      <LocationOn />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography component="p" className={classes.card__location}>
                        {item.country.label}, {item.state.label}, {item.city.label}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs="auto">
                    <IconButton onClick={() => toggleBookmark(item.id)} className={classes.card__ico_bookmark}>
                      {item.isBookmark ? <TurnedIn /> : <TurnedInNot />}
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CardArea;