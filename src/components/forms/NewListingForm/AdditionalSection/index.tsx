import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, memo } from 'react';

import { AppTextField } from '@faf-cars/components/inputs';
import { CreateListingDto } from '@faf-cars/lib/listings';

const AdditionalSection: FC = () => {
  const formik = useFormikContext<CreateListingDto>();

  return (
    <Stack spacing={1}>
      <AppTextField
        variant="outlined"
        placeholder="Description"
        name="description"
        minRows={3}
        multiline
      />
    </Stack>
  );
};

export default memo(AdditionalSection);
