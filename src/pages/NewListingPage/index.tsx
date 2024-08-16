import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import { NewListingForm } from '@faf-cars/components/forms';

const NewDealPage: FC = () => {
  return (
    <Box>
      <Typography variant="h3">Create a new listing</Typography>
      <NewListingForm />
    </Box>
  );
};

export default NewDealPage;
