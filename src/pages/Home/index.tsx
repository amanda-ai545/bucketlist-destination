import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';
import { useStyles } from './style';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLimitItems } from '../../hooks/useLimitItems';
import { ItemsTypes } from '../../types';

import CardArea from '../../components/Card';

const HomeArea: FC = () => {
  const classes = useStyles();
  const [items, setItems] = useState<ItemsTypes[]>([]);
  const [bucketList, setBucketList] = useLocalStorage("bucketList");
  const { limitItems: destinationItems } = useLimitItems(bucketList, 4);
  const { limitItems: bookmarkItems } = useLimitItems(items, 4);

  const handleBookmark = (id: number) => {
    let updatedItems = bucketList.map((item: ItemsTypes) => {
      if (item.id === id) {
        return {
          ...item,
          isBookmark: !item?.isBookmark,
        }
      } else {
        return item;
      }
    });

    setBucketList(updatedItems);
  };

  useEffect(() => {
    const filterItems = bucketList.filter((item: any) => item.isBookmark === true);
    setItems(filterItems);
  }, [bucketList]);

  return (
    <>
      <Box marginBottom={5}>
        <Typography variant="h2" component="h2">
          Bookmarks
        </Typography>

        <CardArea items={bookmarkItems} toggleBookmark={handleBookmark} />

        {items.length > bookmarkItems.length && <Grid container justifyContent="right">
          <Grid item xs="auto">
            <Link to="/bookmarks" className={classes.home__link}>See More</Link>
          </Grid>
        </Grid>}
      </Box>

      <Box>
        <Typography variant="h2" component="h2">
          Destinations
        </Typography>

        <CardArea items={destinationItems} toggleBookmark={handleBookmark} />

        {bucketList.length > destinationItems.length && <Grid container justifyContent="right">
          <Grid item xs="auto">
            <Link to="/destinations" className={classes.home__link}>See More</Link>
          </Grid>
        </Grid>}
      </Box>
    </>
  )
}

export default HomeArea;