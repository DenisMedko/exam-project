import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import * as eventActionCreators from '../../../store/slices/eventSlice';
import { Field, Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './InputForm.module.sass';
const InputForm = () => {
  const initialState = {
    title: '',
    eventDate: '',
  };
  const EVENT_ITEM_SCHEMA = yup.object({
    title: yup.string().required('You must enter the title'),
    eventDate: yup.date().required('You must enter the date'),
  });
  const dispatch = useDispatch();

  const { addOnServer } = bindActionCreators(
    { ...eventActionCreators },
    dispatch
  );

  const handleAddBtn = (values, formikBag) => {
    addOnServer(values.title);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleAddBtn}
      validationSchema={EVENT_ITEM_SCHEMA}
    >
      {({ errors }) => {
        const inputClassName = classNames(styles.todoInput, {
          [styles.todoInvalidInput]: errors.title,
        });
        return (
          <Form className={styles.form}>
            <Field
              type="text"
              name="title"
              className={inputClassName}
              placeholder={errors.title ? errors.title : 'Event title'}
            />
            <Field
              type="date"
              name="date"
              className={inputClassName}
              placeholder={errors.eventDate ? errors.eventDate : 'Event date'}
            />
            <button type="submit" className={styles.todoAddBtn}>
              Add
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
