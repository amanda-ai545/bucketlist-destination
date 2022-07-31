import React, { FC } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import Card from '../../components/Card';

const BookmarksArea: FC = () => {
  return (
    <Box marginBottom={5}>
      <Typography variant="h2" component="h2">
        Bookmarks
      </Typography>

      <Typography variant="body1" component="p">
        No data found.
      </Typography>
    </Box>
  )
}

export default BookmarksArea;