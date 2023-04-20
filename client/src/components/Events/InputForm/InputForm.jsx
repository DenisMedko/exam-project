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
    date: '',
    isDone: false,
  };
  const EVENT_ITEM_SCHEMA = yup.object({
    title: yup.string().required('You must enter the title'),
    date: yup.date().required('You must enter the date'),
  });
  const dispatch = useDispatch();

  const { addEvent } = bindActionCreators({ ...eventActionCreators }, dispatch);

  const handleAddBtn = (values, formikBag) => {
    addEvent(values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleAddBtn}
      validationSchema={EVENT_ITEM_SCHEMA}
    >
      {({ errors }) => {
        const inputClassName = classNames(styles.eventInput, {
          [styles.eventInvalidInput]: errors.title,
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
            <button type="submit" className={styles.eventAddBtn}>
              Add
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
