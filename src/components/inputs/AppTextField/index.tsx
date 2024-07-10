import { TextField, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, memo } from 'react';

/** Must be placed in Formik context */
const AppTextField: FC<TextFieldProps> = ({ name, ...props }) => {
  const formik = useFormikContext<any>();

  return (
    <TextField
      variant="filled"
      autoComplete="off"
      name={name}
      value={formik.values[name!] ?? ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name!] && Boolean(formik.errors[name!])}
      helperText={formik.touched[name!] && (formik.errors[name!] as string)}
      {...props}
    />
  );
};

export default memo(AppTextField);
