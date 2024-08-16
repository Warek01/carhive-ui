import { Stack } from '@mui/material';
import { FC, memo } from 'react';

import { AppTextField } from '@carhive/components/inputs';

const AdditionalSection: FC = () => {
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
