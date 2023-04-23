const EventItem = (props) => {
  const {
    event: { id, title, eventDate, remainingDate },
  } = props;
  return (
    <div className="">
      <div className="">{title}</div>
      <div className="">{eventDate}</div>
      <div className="">{remainingDate}</div>
      <button type="button" name={id} onClick={() => {}} className="">
        Done
      </button>
    </div>
  );
};

export default EventItem;
