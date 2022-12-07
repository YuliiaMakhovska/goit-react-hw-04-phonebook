import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {FormField, Input, Label, Button} from './ContactForm.styled'
import { Formik, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';



const schema = Yup.object().shape({
  name: Yup.string().required(),
  number: Yup.number().required().positive().integer(),
});

const FormError = ({ name }) => {
  return <ErrorMessage name={name} render={massege => <p>{massege}</p>} />;
};

const ContactForm = ({ onSubmit }) => {
  const nameId = nanoid();
  const numberId = nanoid();

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);

    resetForm();
  };
  const initialValues = {
    name: '',
    number: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormField>
        <Label htmlFor={nameId}>
          Name
          <Input
            type="text"
            name="name"
            id={nameId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <FormError FormError name="name" />
        </Label>

        <Label htmlFor={numberId}>
          Number
          <Input
            type="tel"
            name="number"
            id={numberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <FormError FormError name="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormField>
    </Formik>
  );
};

ContactForm.propTypes = {
  nameId: PropTypes.string,
  numberId: PropTypes.string,
};

export default ContactForm;