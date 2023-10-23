import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as eventActionCreators from '../../../store/slices/eventSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import styles from './InputForm.module.sass';
import FormInput from '../../FormInput/FormInput';
import Schems from '../../../utils/validators/validationSchems';
import DateView from 'react-datepicker';
import './react-datepicker.css';

const InputForm = () => {
  const initialState = {
    title: '',
    eventDate: null,
    remainingDate: null,
    isDone: false,
  };

  const { addEvent } = bindActionCreators(
    { ...eventActionCreators },
    useDispatch()
  );

  const handleSubmit = (values, formikBag) => {
    addEvent(values);
    formikBag.resetForm();
  };
  const inputClassName = {
    form: styles.form,
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
    datePicker: styles.datePicker,
  };
  const renderDateTimeField = (fieldName, fieldLabel) => {
    return (
      <div className={styles.formControl}>
        <label htmlFor={fieldName}>{fieldLabel}</label>
        <Field name={fieldName}>
          {({
            field: { name, value },
            form: { touched, errors, setFieldValue, setFieldTouched },
          }) => {
            const fieldTouched = touched[name];
            const fieldError = errors[name];
            return (
              <div className={inputClassName.container}>
                <DateView
                  className={classNames(
                    inputClassName.input,
                    inputClassName.customDatepicker,
                    {
                      [inputClassName.notValid]: fieldTouched && fieldError,
                      [inputClassName.valid]: fieldTouched && !fieldError,
                    }
                  )}
                  selected={value}
                  onChange={(date) => setFieldValue(name, date)}
                  onBlur={() => setFieldTouched(name, true)}
                  dateFormat="dd-MM-yyyy HH:mm"
                  timeFormat="HH:mm"
                  showTimeSelect
                  timeIntervals={1}
                  showIcon={false}
                  placeholderText="dd-MM-yyyy HH:mm"
                  minDate={new Date()}
                />
                <ErrorMessage
                  name={fieldName}
                  component="span"
                  className={inputClassName.warning}
                />
              </div>
            );
          }}
        </Field>
      </div>
    );
  };
  return (
    <>
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={Schems.EventSchema}
      >
        <Form className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="title">Event name</label>
            <FormInput
              type="text"
              name="title"
              classes={inputClassName}
              placeholder="Event name"
            />
          </div>
          <div className={styles.dates}>
            {renderDateTimeField('eventDate', 'Event date')}
            {renderDateTimeField('remainingDate', 'Remaining date')}
          </div>

          <button type="submit" className={styles.eventAddBtn}>
            Add
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default InputForm;
