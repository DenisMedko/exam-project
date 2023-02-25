import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {
  const HocForLoginSignUp = (props) => {
    const { isFetching, data, history } = props;
    return (
      <>
        {isFetching && <Spinner />}
        {!isFetching && !data && <Component history={history} />}
      </>
    );
  };

  const mapStateToProps = (state) => state.userStore;

  return connect(mapStateToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
