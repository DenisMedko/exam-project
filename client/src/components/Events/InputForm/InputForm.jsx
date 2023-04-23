import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import * as eventActionCreators from '../../../store/slices/eventSlice';
import { Field, Form, Formik } from 'formik';
import classNames from 'classnames';
import styles from './InputForm.module.sass';
const InputForm = () => {
  const initialState = {
    title: '',
    eventDate: '',
    remainingDate: '',
    isDone: false,
  };
  const EVENT_ITEM_SCHEMA = yup.object({
    title: yup.string().required('You must enter the title'),
    eventDate: yup
      .date()
      .min(new Date(), 'Event date is less than current date')
      .required('You must enter the date'),
    remainingDate: yup
      .date()
      .min(new Date(), 'Remaining date is less than current date')
      .required('You must enter the remaining date'),
  });

  const { addEvent } = bindActionCreators(
    { ...eventActionCreators },
    useDispatch()
  );

  const handleAddBtn = (values, formikBag) => {
    addEvent(values);
    formikBag.resetForm();
  };
  return (
    <>
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
                type="datetime-local"
                name="eventDate"
                className={inputClassName}
                placeholder={errors.eventDate ? errors.eventDate : 'Event date'}
              />
              <Field
                type="datetime-local"
                name="remainingDate"
                className={inputClassName}
                placeholder={
                  errors.remainingDate ? errors.remainingDate : 'Remaining date'
                }
              />
              <button type="submit" className={styles.eventAddBtn}>
                Add
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default InputForm;
