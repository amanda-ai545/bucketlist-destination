import * as yup from "yup";

export const SelectOptionSchema = {
  value: yup.string().required(),
  label: yup.string().required(),
};

export const DestinationSchema = yup.object({
  country: yup.object().shape(SelectOptionSchema).required('This is required.'),
  state: yup.object().shape(SelectOptionSchema),
  city: yup.object().shape(SelectOptionSchema),
  image: yup.string().required('This is required.'),
  isBookmark: yup.boolean().required('This is required.'),
}).defined();