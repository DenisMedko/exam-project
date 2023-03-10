import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {
  const HocForLoginSignUp = ({ history }) => {
    const { isFetching, data } = useSelector((state) => state.userStore);
    return (
      <>
        {isFetching && <Spinner />}
        {!isFetching && !data && <Component history={history} />}
      </>
    );
  };
  return HocForLoginSignUp;
};

export default OnlyNotAuthorizedUserHoc;
