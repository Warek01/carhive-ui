import { Link, LinkProps } from '@mui/material';
import { FC, PropsWithChildren, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppRoute } from '@faf-cars/lib/routing';

interface Props extends PropsWithChildren<LinkProps> {
  to?: AppRoute | string;
}

const AppLink: FC<Props> = (props) => {
  return (
    <Link
      component={RouterLink}
      display="flex"
      alignItems="center"
      justifyContent="start"
      gap={1}
      to=""
      sx={{ textDecoration: 'none' }}
      {...props}
    >
      {props.children}
    </Link>
  );
};

export default memo(AppLink);
