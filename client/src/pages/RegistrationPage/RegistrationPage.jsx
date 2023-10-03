import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as authActionCreators from '../../store/slices/authSlice';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import HeaderSignUp from '../../components/HeaderSignUp/HeaderSignUp';
import CONSTANTS from '../../constants';

const RegistrationPage = ({ history }) => {
  const { clearAuthError: clearError } = bindActionCreators(
    { ...authActionCreators },
    useDispatch()
  );
  const renderArticles = (column) => {
    return column.articles.map((article) => (
      <Fragment key={article.id}>
        <div className={styles.headerArticle}>{article.headerArticle}</div>
        <div
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: article.htmlArticle }}
        />
      </Fragment>
    ));
  };
  const renderArticlesContainer = () => {
    return CONSTANTS.REGISTRATION_PAGE_ITEMS.columns.map((column) => (
      <div className={styles.ColumnContainer} key={column.id}>
        {renderArticles(column)}
      </div>
    ));
  };
  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <HeaderSignUp
          history={history}
          clearError={clearError}
          page={'login'}
        />
        <RegistrationForm history={history} />
      </div>
      <div className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          {renderArticlesContainer()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
