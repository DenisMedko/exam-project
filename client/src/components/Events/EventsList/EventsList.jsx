import EventItem from '../EventItem/EventItem';

const EventsList = ({ events }) => {
  return (
    <div>
      {events?.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
