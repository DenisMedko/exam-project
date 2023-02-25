import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import HeaderSignUp from '../../components/HeaderSignUp/HeaderSignUp';
import CONSTANTS from '../../constants';

const RegistrationPage = (props) => {
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
        <HeaderSignUp {...props} page={'login'} />
        <RegistrationForm history={props.history} />
      </div>
      <div className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          {renderArticlesContainer()}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
