import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as contestsActionCreators from '../../store/slices/contestsSlice';
import * as contestDataActionCreators from '../../store/slices/dataForContestSlice';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const CreatorDashboard = ({ location, history }) => {
  const { contests, count, creatorFilter, error } = useSelector(
    (state) => state.contestsList
  );
  const { isFetching, data: dataForContest } = useSelector(
    (state) => state.dataForContest
  );

  const dispatch = useDispatch();
  const {
    setNewCreatorFilter: newFilter,
    clearContestsList,
    getContests,
    getDataForContest,
  } = bindActionCreators(
    { ...contestsActionCreators, ...contestDataActionCreators },
    dispatch
  );
  const [prevParams, setPrevParams] = useState();
  useEffect(() => {
    getDataForContest();
    if (parseUrlForParams(location.search) && !contests.length)
      renderContests(creatorFilter);
  }, []);
  useEffect(() => {
    clearContestsList();
    if (prevParams && prevParams !== location.search) {
      parseUrlForParams(location.search);
    }
  }, [location.search]);

  const renderContests = (filter) => {
    getContests({
      requestData: {
        ...filter,
        limit: CONSTANTS.CONTEST_DISPLAY_LIMIT,
        offset: filter.offset || 0,
      },
      role: CONSTANTS.CREATOR,
    });
    setPrevParams(filter);
  };
  const renderSelectType = () => {
    const array = [];
    types.forEach(
      (el, i) =>
        !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        )
    );
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  const renderIndustryType = () => {
    const array = [];
    const { industry } = dataForContest;
    array.push(
      <option key={0} value={null}>
        Choose industry
      </option>
    );
    industry.forEach((industry, i) =>
      array.push(
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      )
    );
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    );
  };
  const changePredicate = ({ name, value }) => {
    newFilter({
      [name]: value === 'Choose industry' ? null : value,
    });
    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, location.search)) {
      newFilter(filter);
      clearContestsList();
      renderContests(filter);
      return false;
    }
    return true;
  };

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    renderContests({
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
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

  const goToExtended = (contestId) => {
    history.push(`/contest/${contestId}`);
  };

  const tryLoadAgain = () => {
    clearContestsList();
    renderContests({
      ...getPredicateOfRequest(),
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) =>
                changePredicate({
                  name: 'contestId',
                  value: target.value,
                })
              }
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              {renderIndustryType()}
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      {error && (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
      )}
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
  );
};

export default withRouter(CreatorDashboard);
