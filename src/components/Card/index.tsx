import React, { FC } from 'react';

import { Grid, Paper, Typography, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import { LocationOn, TurnedInNot, TurnedIn } from '@mui/icons-material';
import { useStyles } from './style';

type IProps = {
  item?: any,
  toggleBookmark?: any,
}

const CardArea: FC<IProps> = ({ item, toggleBookmark }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        component="img"
        height="250"
        image="https://petapixel.com/assets/uploads/2022/01/paris-photographer-freezes-to-death-800x420.jpg"
      />
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography component="p">
              <LocationOn />
              {/* {item.country.label} */}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <IconButton onClick={() => toggleBookmark(item.id)}>
              {/* {item.isBookmark ? <TurnedIn /> : <TurnedInNot />} */}
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardArea;