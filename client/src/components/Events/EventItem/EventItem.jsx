import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as eventActionCreators from '../../../store/slices/eventSlice';
import { dateInLocalTimezone, getTimeDiffStr } from '../../../utils/functions';
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
        <div className={styles.eventField}>{title}</div>
        <div className={styles.eventField}>
          {dateInLocalTimezone(eventDate)}
        </div>
        <div className={styles.eventField}>
          {dateInLocalTimezone(remainingDate)}
        </div>
        <div className={styles.eventField}>{getTimeDiffStr(remainingDate)}</div>
      </div>

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
  );
};

export default EventItem;
