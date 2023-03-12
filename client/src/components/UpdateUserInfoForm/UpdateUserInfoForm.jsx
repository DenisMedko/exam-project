import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as userActionCreators from '../../store/slices/userSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import styles from './UpdateUserInfoForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schemes from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

const UpdateUserInfoForm = ({ onSubmit, submitting }) => {
  const { clearUserError } = bindActionCreators(
    { ...userActionCreators },
    useDispatch()
  );
  const {
    data: { firstName, lastName, displayName },
    error,
  } = useSelector((state) => state.userStore);
  const initialValues = {
    firstName,
    lastName,
    displayName,
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={Schemes.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearUserError}
          />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="LastName"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateUserInfoForm;
