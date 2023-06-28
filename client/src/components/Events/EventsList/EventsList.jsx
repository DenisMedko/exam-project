import EventItem from '../EventItem/EventItem';
import styles from './EventsList.module.sass';

const EventsList = ({ events }) => {
  return (
    <div className={styles.eventsList}>
      {events?.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
