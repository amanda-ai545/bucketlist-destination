import React, { FC, useEffect } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import CardArea from '../../components/Card';

const HomeArea: FC = () => {
  return (
    <>
      <Box marginBottom={5}>
        <Typography variant="h2" component="h2">
          Bookmarks
        </Typography>

        <Typography variant="body1" component="p">
          No data found.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h2" component="h2">
          Destinations
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CardArea />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CardArea />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CardArea />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default HomeArea;