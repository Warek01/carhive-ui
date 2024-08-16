import { Unstable_Grid2 as Grid, Skeleton } from '@mui/material';
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
    <Grid container spacing={3}>
      {arr.map((car, index) => (
        <Grid xs={4} lg={3} key={index}>
          {items ? (
            <ListingItem listing={car} />
          ) : (
            <Skeleton
              height="100%"
              variant="rectangular"
              width="100%"
              key={index}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(ListingsList);
