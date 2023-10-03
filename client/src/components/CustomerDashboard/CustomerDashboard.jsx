import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as contestsActionCreators from '../../store/slices/contestsSlice';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const CustomerDashboard = ({ history }) => {
  const { isFetching, error, contests, customerFilter, count } = useSelector(
    (state) => state.contestsList
  );

  const dispatch = useDispatch();
  const {
    getContests,
    clearContestsList,
    setNewCustomerFilter: newFilter,
  } = bindActionCreators({ ...contestsActionCreators }, dispatch);

  const [prevCustomerFilter, setPrevCustomerFilter] = useState(customerFilter);

  const setNewOptions = (startFrom = 0) => {
    return {
      requestData: {
        offset: startFrom,
        limit: CONSTANTS.CONTEST_DISPLAY_LIMIT,
        contestStatus: customerFilter,
      },
      role: CONSTANTS.CUSTOMER,
    };
  };
  useEffect(() => {
    getContests(setNewOptions());
    return () => clearContestsList();
  }, [prevCustomerFilter]);

  const loadMore = (startFrom) => {
    getContests(setNewOptions(startFrom));
  };

  const goToExtended = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    const array = [];
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          count={contests[i].Offers.length}
          goToExtended={goToExtended}
        />
      );
    }
    return array;
  };

  const tryToGetContest = () => {
    clearContestsList();
    getContests(setNewOptions());
  };

  const renderFilterContainer = () => {
    return CONSTANTS.CONTEST_STATUSES.map((status) => (
      <div
        key={status.id}
        onClick={
          status.name !== customerFilter
            ? () => {
                newFilter(status.name);
                setPrevCustomerFilter(status.name);
              }
            : () => {}
        }
        className={classNames({
          [styles.activeFilter]: status.name === customerFilter,
          [styles.filter]: status.name !== customerFilter,
        })}
      >
        {status.title}
      </div>
    ));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>{renderFilterContainer()}</div>
      <div className={styles.contestsContainer}>
        {error && <TryAgain getData={tryToGetContest()} />}
        {!error && (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            history={history}
            count={count}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

export default withRouter(CustomerDashboard);
