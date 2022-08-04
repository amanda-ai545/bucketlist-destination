import { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ItemsTypes } from '../../types';
import CardArea from '../../components/Card';

const BookmarksArea: FC = () => {
  const [bucketList, setBucketList] = useLocalStorage("bucketList");
  const [bookmarkItems, setBookmarkItems] = useState<ItemsTypes[]>([]);

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
    setBookmarkItems(filterItems);
  }, [bucketList]);

  return (
    <Box>
      <Typography variant="h2" component="h2">
        Bookmarks
      </Typography>

      <CardArea items={bookmarkItems} toggleBookmark={handleBookmark} />
    </Box>
  )
}

export default BookmarksArea;