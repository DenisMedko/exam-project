import { useSelector } from 'react-redux';
import EventItem from '../EventItem/EventItem';

const EventsList = () => {
  const { data: events } = useSelector((state) => state.eventStore);
  return (
    <div className="">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
