import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, memo } from 'react';

import { CreateListingDto } from '@faf-cars/lib/listings';

const AdditionalSection: FC = () => {
  const formik = useFormikContext<CreateListingDto>();

  return <Grid container gap={1}></Grid>;
};

export default memo(AdditionalSection);
