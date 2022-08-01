import { FC, useContext } from 'react';
import { Link } from "react-router-dom";

import { Box, Grid, Typography } from '@mui/material';
import { useStyles } from './style';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AppContext } from '../../contexts';
import { items } from '../../services/mocks/items.mock';

import CardArea from '../../components/Card';
import { useLimitItems } from '../../hooks/useLimitItems';

const HomeArea: FC = () => {
  const classes = useStyles();
  const [bucketList] = useLocalStorage("bucketList");
  const { limitItems, isLoading } = useLimitItems(bucketList, 3);

  return (
    <>
      <Box marginBottom={5}>
        <Typography variant="h2" component="h2">
          Bookmarks
        </Typography>

        <CardArea items={limitItems} toggleBookmark={(id: number) => console.log(id)} />

        <Grid container justifyContent="right">
          <Grid item xs="auto">
            <Link to="/bookmarks" className={classes.home__link}>See More</Link>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h2" component="h2">
          Destinations
        </Typography>

        <CardArea items={bucketList} toggleBookmark={(id: number) => console.log(id)} />
      </Box>
    </>
  )
}

export default HomeArea;