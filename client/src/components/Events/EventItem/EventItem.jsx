import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as eventActionCreators from '../../../store/slices/eventSlice';
import { dateInLocalTimezone, getTimeDiffStr } from '../../../utils/functions';
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
          <div className={styles.eventField}>
            {dateInLocalTimezone(eventDate)}
          </div>
          <img
            className={classNames(styles.eventImg, styles.remain)}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
            alt="clock"
          />
          <div className={styles.eventField}>
            {dateInLocalTimezone(remainingDate)}
          </div>
        </div>
      </div>
      <div className={styles.buttonAndTimeContainer}>
        <span>{getTimeDiffStr(remainingDate)}</span>

        <button
          className={styles.eventBtn}
          type="button"
          onClick={() => {
            removeEvent(id);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EventItem;
