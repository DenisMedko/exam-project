import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as chatActionCreators from '../../store/slices/chatSlice';
import * as contestByIdActionCreators from '../../store/slices/contestByIdSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBox = ({ offer, needButtons, setOfferStatus, contestType }) => {
  const { id: userId, role } = useSelector((state) => state.userStore.data);
  const { messagesPreview } = useSelector((state) => state.chatStore);
  const {
    goToExpandedDialog,
    changeMark: setMark,
    clearChangeMarkError: clearError,
    changeShowImage,
  } = bindActionCreators(
    { ...contestByIdActionCreators, ...chatActionCreators },
    useDispatch()
  );
  const findConversationInfo = () => {
    const participants = [userId, offer.User.id];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus(offer.User.id, offer.id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus(offer.User.id, offer.id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMark = (value) => {
    clearError();
    setMark({
      mark: value,
      offerId: offer.id,
      isFirst: !offer.mark,
      creatorId: offer.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = offer;
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }
    if (status === CONSTANTS.OFFER_STATUS_WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }
    return null;
  };

  const goChat = () => {
    goToExpandedDialog({
      interlocutor: offer.User,
      conversationData: findConversationInfo(),
    });
  };

  const { firstName, lastName, email, rating } = offer.User;
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                offer.User?.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${offer.User?.avatar}`
              }
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              }
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestType === CONSTANTS.LOGO_CONTEST ? (
            <img
              onClick={() =>
                changeShowImage({
                  imagePath: offer.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.publicURL}${offer.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{offer.text}</span>
          )}
          {offer.User.id !== userId && (
            <Rating
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star"
                />
              }
              onClick={changeMark}
              placeholderRating={offer.mark}
            />
          )}
        </div>
        {role !== CONSTANTS.CREATOR && (
          <i onClick={goChat} className="fas fa-comments" />
        )}
      </div>
      {needButtons(offer.status) && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(OfferBox);
