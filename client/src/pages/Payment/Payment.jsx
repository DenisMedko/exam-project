import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as paymentActionCreators from '../../store/slices/paymentSlice';
import PayForm from '../../components/PayForm/PayForm';
import styles from './Payment.module.sass';
import CONSTANTS from '../../constants';
import Error from '../../components/Error/Error';

const Payment = ({ history }) => {
  const { payment } = useSelector((state) => state.payment);
  const { contests } = useSelector((state) => state.contestCreationStore);
  const { pay, clearPaymentStore } = bindActionCreators(
    { ...paymentActionCreators },
    useDispatch()
  );
  const wrapPay = (values) => {
    const contestArray = [];
    Object.keys(contests).forEach((key) =>
      contestArray.push({ ...contests[key] })
    );
    const { number, expiry, cvc } = values;
    const data = new FormData();
    for (let i = 0; i < contestArray.length; i++) {
      data.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');
    pay({
      data: {
        formData: data,
      },
      history: history,
    });
  };

  const goBack = () => {
    history.goBack();
  };

  const error = payment?.error;
  if (isEmpty(contests)) {
    history.replace('startContest');
  }
  return (
    <div>
      <div className={styles.header}>
        <Link to="/">
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            alt="blue-logo"
          />
        </Link>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearPaymentStore}
            />
          )}
          <PayForm sendRequest={wrapPay} back={goBack} isPayForOrder />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>$100 USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>$100.00 USD</span>
          </div>
          <a href="http://www.google.com">Have a promo code?</a>
        </div>
      </div>
    </div>
  );
};

export default Payment;
