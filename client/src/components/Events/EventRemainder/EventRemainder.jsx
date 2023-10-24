import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as eventSliceActionCreator from '../../../store/slices/eventSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import { filterArrayByField } from '../../../utils/functions';
import styles from './EventRemainder.module.sass';

const EventRemainder = () => {
  const { getEvents } = bindActionCreators(
    { ...eventSliceActionCreator },
    useDispatch()
  );

  const { data: events } = useSelector((state) => state.eventStore);
  useEffect(() => {
    getEvents();
  }, []);

  const countEvents = useCallback(
    (dateNow) =>
      filterArrayByField(events, 'remainingDate', dateNow, 'lte')?.length || 0,
    [events]
  );

  const [eventCounter, setEventCounter] = useState(
    countEvents(new Date().toISOString())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEventCounter(countEvents(new Date().toISOString()));
    }, CONSTANTS.EVENT_COUNTER_INTERVAL);
    return () => {
      clearInterval(intervalId);
    };
  }, [countEvents]);

  return (
    <>
      <Link className={styles.remainder} to={CONSTANTS.EVENT_PAGE_LINK}>
        <span>Events:</span>
        <span className={styles.counter}>{eventCounter || 0}</span>
      </Link>
    </>
  );
};

export default EventRemainder;
