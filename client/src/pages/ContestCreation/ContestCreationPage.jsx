import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as contestCreationActionCreators from '../../store/slices/contestCreationSlice';
import styles from './ContestCreationPage.module.sass';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const ContestCreationPage = ({ contestType, history, title }) => {
  const { contestCreationStore, bundleStore } = useSelector((state) => state);

  const { saveContestToStore: saveContest } = bindActionCreators(
    { ...contestCreationActionCreators },
    useDispatch()
  );

  const formRef = useRef();
  const contestData = contestCreationStore.contests[contestType]
    ? contestCreationStore.contests[contestType]
    : { contestType: contestType };

  const handleSubmit = (values) => {
    saveContest({ type: contestType, info: values });
    const route =
      bundleStore.bundle[contestType] === 'payment'
        ? '/payment'
        : `${bundleStore.bundle[contestType]}Contest`;
    history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !bundleStore.bundle && history.replace('/startContest');

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestCreationPage;
