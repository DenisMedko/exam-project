import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as offersActionCreators from '../../store/slices/offersSlice';
import * as contestByIdActionCreators from '../../store/slices/contestByIdSlice';
import OffersContainer from '../OffersContainer/OffersContainer';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import styles from './ModeratorDashboard.module.sass';

const useStatuses = () => {
  const [statuses, setStatuses] = useState([]);

  const getStatuses = () => {
    setStatuses(CONSTANTS.OFFER_STATUSES || []);
  };
  useEffect(() => {
    getStatuses();
  }, []);
  return { statuses };
};

const FilterItem = (props) => {
  const { status, moderatorFilter, newFilter, setPrevModeratorFilter } = props;
  const { name, title } = status;
  const onClickHandler = () => {
    if (name !== moderatorFilter) {
      newFilter(name);
      setPrevModeratorFilter(name);
    }
  };
  return (
    <div
      onClick={onClickHandler}
      className={classNames({
        [styles.activeFilter]: name === moderatorFilter,
        [styles.filter]: name !== moderatorFilter,
      })}
    >
      {title}
    </div>
  );
};

const FilterContainer = (props) => {
  const { statuses, moderatorFilter, newFilter, setPrevModeratorFilter } =
    props;
  return (
    <div className={styles.filterContainer}>
      {statuses.map((status) => (
        <FilterItem
          key={status.id}
          status={status}
          moderatorFilter={moderatorFilter}
          newFilter={newFilter}
          setPrevModeratorFilter={setPrevModeratorFilter}
        />
      ))}
    </div>
  );
};
const ModeratorDashboard = () => {
  const { statuses } = useStatuses();
  const { error, offers, moderatorFilter, count } = useSelector(
    (state) => state.offersList
  );
  const {
    setNewModeratorFilter: newFilter,
    getModeratorOffers: getOffers,
    clearOffersList,
    setOfferStatusModerator,
  } = bindActionCreators(
    { ...offersActionCreators, ...contestByIdActionCreators },
    useDispatch()
  );

  const [prevModeratorFilter, setPrevModeratorFilter] =
    useState(moderatorFilter);

  return (
    <div className={styles.mainContainer}>
      {
        <FilterContainer
          statuses={statuses}
          moderatorFilter={moderatorFilter}
          newFilter={newFilter}
          setPrevModeratorFilter={setPrevModeratorFilter}
        />
      }

      {!error && (
        <OffersContainer
          moderatorFilter={prevModeratorFilter}
          error={error}
          offers={offers}
          count={count}
          getOffers={getOffers}
          clearOffersList={clearOffersList}
          setOfferStatusModerator={setOfferStatusModerator}
        />
      )}
    </div>
  );
};
export default withRouter(ModeratorDashboard);
