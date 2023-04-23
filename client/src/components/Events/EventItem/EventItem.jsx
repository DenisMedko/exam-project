const EventItem = (props) => {
  const {
    event: { id, title, eventDate, remainingDate, isDone },
  } = props;
  return (
    <div className="">
      <div className="">{title}</div>
      <div className="">{eventDate}</div>
      <div className="">{remainingDate}</div>
      <input
        type="checkbox"
        name={id}
        checked={isDone}
        onChange={() => {}}
        className=""
      />
      <button type="button" name={id} onClick={() => {}} className="">
        X
      </button>
    </div>
  );
};

export default EventItem;
