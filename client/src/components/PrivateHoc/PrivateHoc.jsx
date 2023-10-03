import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const Hoc = ({ history, match }) => {
    const { isFetching } = useSelector((state) => state.userStore);
    return (
      <>
        {isFetching ? (
          <Spinner />
        ) : (
          <Component history={history} match={match} {...props} />
        )}
      </>
    );
  };
  return Hoc;
};

export default PrivateHoc;
