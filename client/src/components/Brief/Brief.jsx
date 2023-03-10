import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as contestUpdationActionCreators from '../../store/slices/contestUpdationSlice';
import * as contestByIdActionCreators from '../../store/slices/contestByIdSlice';
import ContestForm from '../ContestForm/ContestForm';
import styles from './Brief.module.sass';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import Error from '../Error/Error';

const Brief = ({ contestData, role, goChat }) => {
  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const { error } = useSelector((state) => state.contestUpdationStore);
  const { id: userId } = useSelector((state) => state.userStore.data);

  const {
    updateContest: update,
    changeEditContest,
    clearContestUpdationStore,
  } = bindActionCreators(
    { ...contestUpdationActionCreators, ...contestByIdActionCreators },
    useDispatch()
  );

  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', contestData.id);
    update(data);
  };

  const getContestObjInfo = () => {
    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = contestData;
    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };
    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });
    return defaultData;
  };

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={userId}
        contestData={contestData}
        changeEditContest={changeEditContest}
        role={role}
        goChat={goChat}
      />
    );
  }
  return (
    <div className={styles.contestForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearContestUpdationStore}
        />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default withRouter(Brief);
