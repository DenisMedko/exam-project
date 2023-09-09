import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import * as eventSliceActionCreator from '../../../store/slices/eventSlice';
import CONSTANTS from '../../../constants';
import { filterArrayByField } from '../../../utils/functions';
import styles from './EventRemainder.module.sass';

const EventRemainder = () => {
  const { data: events } = useSelector((state) => state.eventStore);
  const { getEvents } = bindActionCreators(
    { ...eventSliceActionCreator },
    useDispatch()
  );
  useEffect(() => {
    getEvents();
  }, []);
  useEffect(() => {
    const timeout = setInterval(() => {
      getEvents();
    }, CONSTANTS.EVENT_COUNTER_INTERVAL);
    return () => {
      clearInterval(timeout);
    };
  });
  const eventsToRemain = filterArrayByField(
    events,
    'remainingDate',
    new Date().toISOString(),
    'lte'
  );
  return (
    <>
      <Link className={styles.remainder} to={CONSTANTS.EVENT_PAGE_LINK}>
        <span>Events:</span>
        <span className={styles.counter}>{eventsToRemain?.length || 0}</span>
      </Link>
    </>
  );
};

export default EventRemainder;
