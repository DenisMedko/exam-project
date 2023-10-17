import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActionCreators from '../../store/slices/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Form, Formik } from 'formik';
import styles from './LoginForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';
import CONSTANTS from '../../constants';

const LoginForm = ({ history, submitting }) => {
  const { error, isFetching } = useSelector((state) => state.auth);
  const { checkAuth: loginRequest, clearAuth: authClear } = bindActionCreators(
    { ...authActionCreators },
    useDispatch()
  );
  useEffect(() => {
    return () => {
      authClear();
    };
  }, [authClear]);

  const clicked = (values) => {
    loginRequest({
      data: values,
      history: history,
      authMode: CONSTANTS.AUTH_MODE.LOGIN,
    });
  };

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error data={error.data} status={error.status} clearError={authClear} />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={clicked}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
