import { Grid, Skeleton } from '@mui/material';
import { FC, memo } from 'react';

import { ListingItem } from '@faf-cars/components';
import { ListingDto } from '@faf-cars/lib/listing';

interface Props {
  items?: ListingDto[];
  skeletonCount: number;
}

const ListingsList: FC<Props> = ({ items, skeletonCount }) => {
  const arr = items ?? new Array(skeletonCount).fill(null);

  return (
    <Grid spacing={3} container alignItems="stretch">
      {arr.map((car, index) => (
        <Grid
          xs={4}
          lg={3}
          key={index}
          item
          sx={{ aspectRatio: { xs: '9/16', lg: '9/12' } }}
        >
          {items ? (
            <ListingItem listing={car} />
          ) : (
            <Skeleton height="100%" variant="rectangular" width="100%" />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(ListingsList);
