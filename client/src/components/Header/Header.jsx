import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as userSliceActionCreator from '../../store/slices/userSlice';
import * as eventSliceActionCreator from '../../store/slices/eventSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';

const Header = ({ history }) => {
  const { data: userData, isFetching } = useSelector(
    (state) => state.userStore
  );
  const { data: events } = useSelector((state) => state.eventStore);
  const { clearUserStore, getEvents, clearEventStore } = bindActionCreators(
    { ...userSliceActionCreator, ...eventSliceActionCreator },
    useDispatch()
  );

  useEffect(() => {
    getEvents();
  }, []);

  const logOut = () => {
    localStorage.clear();
    clearUserStore();
    clearEventStore();
    history.replace('/login');
  };

  const startContests = () => {
    history.push('/startContest');
  };

  const renderLinksList = () => {
    const getCounter = (link) => {
      if (link.showCounter) {
        return events?.length || '';
      }
      return '';
    };
    return CONSTANTS.HEADER_ITEMS.userLinks.map((link) => (
      <li key={link.id}>
        <Link to={link.path}>
          <span>{`${link.title} ${getCounter(link)}`}</span>
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
              userData.avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicURL}${userData.avatar}`
            }
            alt="user"
          />
          <span>{`Hi, ${userData.displayName}`}</span>
          {/* <span>{`Events, ${eventsData.eventsCount}`}</span> */}
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
          {!isFetching && !userData && renderLoginButtons()}
          {!isFetching && userData && renderUserMenu()}
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
          {userData && userData.role === CONSTANTS.CUSTOMER && (
            <div className={styles.startContestBtn} onClick={startContests}>
              <span>START CONTEST</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
