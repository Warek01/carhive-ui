import { TextField, TextFieldProps } from '@mui/material';
import type { FormikProps } from 'formik';
import { FC, memo } from 'react';

interface Props {
  formik: FormikProps<any>;
  name: string;
}

const FormikTextField: FC<Props & TextFieldProps> = ({
  formik,
  name,
  ...props
}) => {
  return (
    <TextField
      variant="filled"
      autoComplete="off"
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && (formik.errors[name] as string)}
      {...props}
    />
  );
};

export default memo(FormikTextField);
