import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { updateBundle } from '../../store/slices/bundleSlice';
import BundleBox from '../../components/BundleBox/BundleBox';
import CONSTANTS from '../../constants';
import styles from './StartContestPage.module.sass';
import Footer from '../../components/Footer/Footer';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Header from '../../components/Header/Header';

const StartContestPage = ({ history }) => {
  const { role } = useSelector((state) => state.userStore.data || {});
  if (role !== CONSTANTS.CUSTOMER) {
    history.replace('/');
  }
  const choseBundle = bindActionCreators(updateBundle, useDispatch());

  const setBundle = (bundleStr) => {
    const array = bundleStr.toLowerCase().split('+');
    const bundleList = {};
    bundleList.first = array[0];
    for (let i = 0; i < array.length; i++) {
      bundleList[array[i]] = i === array.length - 1 ? 'payment' : array[i + 1];
    }
    choseBundle(bundleList);
    history.push(`/startContest/${bundleList.first}Contest`);
  };

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>START A CONTEST</h2>
          <span>
            Launching a contest on Squadhelp is very simple. Select the type of
            contest you would like to launch from the list below. Provide a
            detailed brief and select a pricing package. Begin receiving
            submissions instantly!
          </span>
        </div>
        <ProgressBar currentStep={1} />
      </div>
      <div className={styles.baseBundleContainer}>
        <div className={styles.infoBaseBundles}>
          <span className={styles.headerInfo}>
            Our Most Popular
            <span>Categories</span>
          </span>
          <span className={styles.info}>
            Pick from our most popular categories, launch a contest and begin
            receiving submissions right away
          </span>
          <hr />
        </div>
        <div className={styles.baseBundles}>
          {CONSTANTS.START_CONTEST_PAGE_ITEMS.baseBundles.map((bundle) => (
            <BundleBox
              path={bundle.path}
              header={bundle.header}
              describe={bundle.describe}
              setBundle={setBundle}
              key={bundle.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.combinedBundles}>
        <div className={styles.infoCombinedBundles}>
          <span className={styles.headerInfo}>
            Save With Our Bundle Packages
          </span>
          <span className={styles.info}>
            Launch multiple contests and pay a discounted bundle price
          </span>
          <hr />
        </div>
        <div className={styles.baseBundles}>
          {CONSTANTS.START_CONTEST_PAGE_ITEMS.combinedBundles.map((bundle) => (
            <BundleBox
              path={bundle.path}
              header={bundle.header}
              describe={bundle.describe}
              setBundle={setBundle}
              key={bundle.id}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartContestPage;
