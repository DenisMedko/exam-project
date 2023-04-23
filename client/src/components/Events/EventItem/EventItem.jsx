import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as eventActionCreators from '../../../store/slices/eventSlice';

const EventItem = (props) => {
  const { removeEvent } = bindActionCreators(
    { ...eventActionCreators },
    useDispatch()
  );
  const {
    event: { id, title, eventDate, remainingDate },
  } = props;
  return (
    <div className="">
      <div className="">{title}</div>
      <div className="">{eventDate}</div>
      <div className="">{remainingDate}</div>
      <button
        type="button"
        onClick={() => {
          removeEvent(id);
        }}
        className=""
      >
        Done
      </button>
    </div>
  );
};

export default EventItem;
