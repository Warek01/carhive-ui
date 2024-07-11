import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, ReactNode, memo } from 'react';

type Props = SelectProps<any> & {
  values: any[];
  getItemContent: (value: any) => ReactNode;
};

/** Must be placed in Formik contexts */
const AppSelectField: FC<Props> = ({
  values,
  getItemContent,
  name,
  label,
  ...props
}) => {
  const formik = useFormikContext<any>();

  return (
    <FormControl
      fullWidth
      error={!!(formik.touched[name!] && formik.errors[name!])}
    >
      <InputLabel id={name!}>{label}</InputLabel>
      <Select
        autoComplete="off"
        name={name}
        labelId={name!}
        label={label}
        value={formik.values[name!] ?? ''}
        onChange={(e) => formik.setFieldValue(name!, e.target.value)}
        onBlur={formik.handleBlur}
        error={!!(formik.touched[name!] && formik.errors[name!])}
        {...props}
      >
        {values.map((value, index) => (
          <MenuItem value={value} key={index}>
            {getItemContent(value)}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[name!] && formik.errors[name!] && (
        <FormHelperText>{formik.errors[name!] as string}</FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(AppSelectField);
