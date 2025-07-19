import * as Yup from 'yup';

export interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
}

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddContactSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().url('Must be a valid URL').required('Image is required'),
  description: Yup.string().required('Description is required'),
});

export const EditContactSchema = AddContactSchema;

export const AddNoteSchema = Yup.object({
  note: Yup.string().required('Note is required'),
  contactId: Yup.number().required('Contact ID is required'),
  owner: Yup.string().required('Owner is required'),
});
