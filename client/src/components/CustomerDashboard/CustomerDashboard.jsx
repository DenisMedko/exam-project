import { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const CustomerDashboard = (props) => {
  const {
    error,
    haveMore,
    isFetching,
    history,
    contests,
    clearContestsList,
    customerFilter,
    newFilter,
  } = props;

  const getContestsOptions = {
    offset: 0,
    limit: CONSTANTS.CONTEST_DISPLAY_LIMIT,
    contestStatus: customerFilter,
  };

  const getContests = (options) => props.getContests(options);

  const loadMore = (offset) => {
    getContests({ ...getContestsOptions, offset });
  };

  useEffect(() => {
    getContests(getContestsOptions);
    return () => clearContestsList();
  }, [customerFilter]);

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
          goToExtended={goToExtended}
        />
      );
    }
    return array;
  };

  const tryToGetContest = () => {
    clearContestsList();
    getContests(getContestsOptions);
  };

  const renderFilterContainer = () => {
    return CONSTANTS.CONTEST_STATUSES.map((status) => (
      <div
        key={status.id}
        onClick={
          status.name !== customerFilter
            ? () => newFilter(status.name)
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
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
