import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import HeaderSignUp from '../../components/HeaderSignUp/HeaderSignUp';
import mocks from '../../utils/mocks/registrationPageMocks';

const RegistrationPage = (props) => {
  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <HeaderSignUp {...props} page={'login'} />
        <RegistrationForm history={props.history} />
      </div>
      <div className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          {mocks.columns.map((column) => (
            <div className={styles.ColumnContainer} key={column.id}>
              {column.articles.map((article) => (
                <Fragment key={article.id}>
                  <div className={styles.headerArticle}>
                    {article.headerArticle}
                  </div>
                  <div
                    className={styles.article}
                    dangerouslySetInnerHTML={{ __html: article.htmlArticle }}
                  />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
