import { Call, Email, Person } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { generatePath } from 'react-router';

import { AppLink } from '@carhive/components';
import { AppRoute } from '@carhive/lib/routing';
import { User } from '@carhive/lib/user';

interface Props {
  user: User;
}

const UserInfo: FC<Props> = ({ user }) => {
  const { username, email, phoneNumber, id } = user;

  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      <Grid item>
        <AppLink to={generatePath(AppRoute.User, { userId: id })}>
          <Person />
          <Typography>{username}</Typography>
        </AppLink>
      </Grid>
      <Grid item display="flex" alignItems="center" gap={1}>
        <AppLink>
          <Email />
          <Typography>{email}</Typography>
        </AppLink>
      </Grid>
      {email && (
        <Grid item xs={12} display="flex" alignItems="center" gap={1}>
          <AppLink>
            <Call />
            <Typography>{phoneNumber}</Typography>
          </AppLink>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(UserInfo);
