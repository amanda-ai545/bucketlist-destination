import * as yup from 'yup';

export const SelectOptionSchema = {
  value: yup.string().required('This field is required.'),
  label: yup.string().required('This field is required.'),
};

export const DestinationSchema = yup.object({
  country: yup.object().shape(SelectOptionSchema),
  state: yup.object().nullable(),
  city: yup.object().nullable(),
}).defined();