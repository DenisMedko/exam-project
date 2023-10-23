import { useState, useEffect } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as eventActionCreators from '../../../store/slices/eventSlice';
import {
  dateInLocalTimezone,
  getTimeDiffStrRevers,
  getTimeDiffMilliseconds,
} from '../../../utils/functions';
import classNames from 'classnames';
import CONSTANTS from '../../../constants';
import styles from './EventItem.module.sass';

const EventItem = (props) => {
  const { removeEvent } = bindActionCreators(
    { ...eventActionCreators },
    useDispatch()
  );
  const {
    event: { id, title, eventDate, remainingDate },
  } = props;
  const [timeLeft, setTimeLeft] = useState(
    getTimeDiffMilliseconds(remainingDate)
  );
  useEffect(() => {
    const intervalId =
      timeLeft < 0
        ? null
        : setInterval(
            () => setTimeLeft(getTimeDiffMilliseconds(remainingDate)),
            CONSTANTS.EVENT_COUNTER_INTERVAL
          );
    return () => clearInterval(intervalId);
  }, [remainingDate, timeLeft]);

  const localEventDate = dateInLocalTimezone(eventDate);
  const localRemainingDate = dateInLocalTimezone(remainingDate);
  const timeInMilliseconds = getTimeDiffStrRevers(remainingDate);
  const onClickHandler = () => removeEvent(id);

  return (
    <div className={styles.eventItem}>
      <div className={styles.eventFields}>
        <div className={styles.title}>{title}</div>
        <div className={styles.eventDates}>
          <img
            className={classNames(styles.eventImg, styles.starts)}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}check.png`}
            alt="check"
          />
          <div className={styles.eventField}>{localEventDate}</div>
          <img
            className={classNames(styles.eventImg, styles.remain)}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
            alt="clock"
          />
          <div className={styles.eventField}>{localRemainingDate}</div>
        </div>
      </div>
      <div className={styles.buttonAndTimeContainer}>
        <span>{timeInMilliseconds}</span>

        <button
          className={styles.eventBtn}
          type="button"
          onClick={onClickHandler}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EventItem;
