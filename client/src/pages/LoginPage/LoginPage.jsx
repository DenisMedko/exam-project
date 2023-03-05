import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as authActionCreators from '../../store/slices/authSlice';
import HeaderSignUp from '../../components/HeaderSignUp/HeaderSignUp';
import styles from './LoginPage.module.sass';

const LoginPage = ({ history }) => {
  const { clearAuthError } = bindActionCreators(
    { ...authActionCreators },
    useDispatch()
  );
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <HeaderSignUp {...clearAuthError} page={'registration'} />
        <div className={styles.loginFormContainer}>
          <LoginForm history={history} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
