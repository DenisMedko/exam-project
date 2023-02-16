import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import styles from './HeaderSignUp.module.sass';
import CONSTANTS from '../../constants';

const HeaderSignUp = (props) => {
  const page = props.page;
  return (
    <div className={styles.headerSignUpPage}>
      <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
      <Link to={`/${page}`} style={{ textDecoration: 'none' }}>
        <div className={styles.linkLoginContainer}>
          <span>{page === 'registration' ? 'Signup' : 'Login'}</span>
        </div>
      </Link>
    </div>
  );
};

export default HeaderSignUp;
