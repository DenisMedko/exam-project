import { useSelector } from 'react-redux';
import EventsList from './EventsList/EventsList';
import InputForm from './InputForm/InputForm';
import styles from './Events.module.sass';
import eventPageMocks from '../../utils/mocks/eventPageMocks';

const Events = () => {
  const { data: events } = useSelector((state) => state.eventStore);
  const { title, text } = eventPageMocks.header;
  return (
    <>
      <div className={styles.eventsHeader}>
        <h2>{title}</h2>
        <span>{text}</span>
      </div>
      <div className={styles.eventsContainer}>
        <InputForm />
        <EventsList events={events} />
      </div>
    </>
  );
};

export default Events;
