import { FC } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useStyles } from './style';

const FooterArea: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Typography component="p">Copyright © 2022 Bucket List, Inc.</Typography>
      </Container>
    </Box>
  )
}

export default FooterArea;