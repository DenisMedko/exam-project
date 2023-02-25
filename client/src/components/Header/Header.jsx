import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';

const Header = (props) => {
  const logOut = () => {
    localStorage.clear();
    props.clearUserStore();
    props.history.replace('/login');
  };

  const startContests = () => {
    props.history.push('/startContest');
  };

  const renderLinksList = () => {
    return CONSTANTS.HEADER_ITEMS.userLinks.map((link) => (
      <li key={link.id}>
        <Link to={link.path}>
          <span>{link.title}</span>
        </Link>
      </li>
    ));
  };

  const renderUserMenu = () => {
    return (
      <>
        <div className={styles.userInfo}>
          <img
            src={
              props.data.avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicURL}${props.data.avatar}`
            }
            alt="user"
          />
          <span>{`Hi, ${props.data.displayName}`}</span>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
            alt="menu"
          />
          <ul>
            {renderLinksList()}
            <li>
              <span onClick={logOut}>Logout</span>
            </li>
          </ul>
        </div>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
          className={styles.emailIcon}
          alt="email"
        />
      </>
    );
  };
  const renderLoginButtons = () => {
    return (
      <>
        <Link to="/login">
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration">
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };
  const renderLinks = (column) => {
    return column.navLinks.map((link) => (
      <li key={link.id}>
        <a href={link.path}>
          <span>{link.title}</span>
        </a>
      </li>
    ));
  };
  const renderNavContainer = () => {
    return (
      <div className={styles.nav}>
        <ul>
          {CONSTANTS.HEADER_ITEMS.columns.map((column) => (
            <ul key={column.id}>
              <li>
                <span>{column.title}</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>{renderLinks(column)}</ul>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignUpHeaders}>
        <a href="tel:355-3585">
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>(877)&nbsp;355-3585</span>
          </div>
        </a>
        <div className={styles.userButtonsContainer}>
          {!props.isFetching && !props.data && renderLoginButtons()}
          {!props.isFetching && props.data && renderUserMenu()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Link to="/">
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>
        <div className={styles.leftNav}>
          {renderNavContainer()}
          {props.data && props.data.role === CONSTANTS.CUSTOMER && (
            <div className={styles.startContestBtn} onClick={startContests}>
              <span>START CONTEST</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
