import { Grid, Skeleton } from '@mui/material';
import { FC, memo, useState } from 'react';

import { ListingItem } from '@faf-cars/components';
import { type ListingDto } from '@faf-cars/lib/listings';

interface Props {
  items?: ListingDto[];
  skeletonCount: number;
}

const ListingsList: FC<Props> = ({ items, skeletonCount }) => {
  const shouldDisplaySkeletons = !items;
  const arr = items ?? Array(skeletonCount).fill(null);
  const [lazyLoadedCount] = useState<number>(6);

  return (
    <Grid spacing={1} container alignItems="stretch">
      {arr.map((car, index) => (
        <Grid
          xs={4}
          lg={3}
          key={index}
          item
          sx={{ aspectRatio: { xs: '9/16', lg: '9/12' } }}
        >
          {shouldDisplaySkeletons ? (
            <Skeleton height="100%" variant="rectangular" width="100%" />
          ) : (
            <ListingItem listing={car} lazy={index > lazyLoadedCount - 1} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(ListingsList);
