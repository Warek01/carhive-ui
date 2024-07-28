import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import { FC, ReactElement, memo, useCallback, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useHttp, useWatchLoading } from '@faf-cars/hooks';
import { CreateListingDto } from '@faf-cars/lib/listings';
import { QueryKey } from '@faf-cars/lib/query';
import { ToastId } from '@faf-cars/lib/toast';

import AdditionalSection from './AdditionalSection';
import PrimarySection from './PrimarySection';
import SecondarySection from './SecondarySection';
import {
  createListingInitialValues,
  createListingValidationSchema,
} from './constants';

interface FormSection {
  element: ReactElement;
  caption: string;
}

const NewListingForm: FC = () => {
  const http = useHttp();
  const queryClient = useQueryClient();

  // resets sections
  const [formKey, setFormKey] = useState(0);

  const [openedSections, setOpenedSections] = useState([true, false, false]);

  const createListingMutation = useMutation((formData: CreateListingDto) =>
    http.listing.create(formData),
  );

  useWatchLoading(createListingMutation.isLoading);

  const handleSubmit = useCallback(
    async (
      objectFormData: CreateListingDto,
      helpers: FormikHelpers<CreateListingDto>,
    ) => {
      try {
        await createListingMutation.mutateAsync(objectFormData, {
          onSuccess: () => queryClient.invalidateQueries(QueryKey.ListingList),
        });
        helpers.resetForm();
        toast('Listing created successfully.', {
          toastId: ToastId.ListingCreate,
        });
        setFormKey((k) => k + 1);
      } catch (err) {
        if (err instanceof AxiosError) {
          switch (err.response?.status) {
            case 400:
              toast('Validation error.', {
                type: 'error',
                toastId: ToastId.ListingCreate,
              });
              break;
            case 401:
              toast('Unauthorized.', {
                type: 'error',
                toastId: ToastId.ListingCreate,
              });
              break;
            case 403:
              toast('Not allowed.', {
                type: 'error',
                toastId: ToastId.ListingCreate,
              });
              break;
            default:
              toast('Not allowed.', {
                type: 'error',
                toastId: ToastId.ListingCreate,
              });
              break;
          }
        }
      }
    },
    [],
  );

  const formik = useFormik({
    initialValues: createListingInitialValues,
    onSubmit: handleSubmit,
    validationSchema: createListingValidationSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
  });

  const sections = useMemo<FormSection[]>(
    () => [
      {
        element: <PrimarySection key={formKey} />,
        caption: 'Primary data',
      },
      {
        element: <SecondarySection key={formKey} />,
        caption: 'Secondary data',
      },
      {
        element: <AdditionalSection key={formKey} />,
        caption: 'Additional data',
      },
    ],
    [formKey],
  );

  console.log(formKey);

  return (
    <Card component="form" onSubmit={formik.handleSubmit}>
      <List>
        {sections.map(({ caption, element }, index) => (
          <ListItem key={caption}>
            <Stack spacing={1} sx={{ width: '100%' }}>
              <ListItemButton
                onClick={() =>
                  setOpenedSections((v) =>
                    v.map((item, i) => (i === index ? !item : item)),
                  )
                }
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>{caption}</Typography>
                {openedSections[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openedSections[index]}>
                <FormikProvider value={formik}>{element}</FormikProvider>
              </Collapse>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" pb={3}>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default memo(NewListingForm);
