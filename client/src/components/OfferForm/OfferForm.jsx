import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as contestByIdActionCreators from '../../store/slices/contestByIdSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik';
import CONSTANTS from '../../constants';
import styles from './OfferForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schemes from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

const OfferForm = ({ contestId, contestType, customerId }) => {
  const { addOfferError } = useSelector((state) => state.contestByIdStore);
  const { addOffer: setNewOffer, clearAddOfferError: clearOfferError } =
    bindActionCreators({ ...contestByIdActionCreators }, useDispatch());
  const renderOfferInput = () => {
    if (contestType === CONSTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    clearOfferError();
    const data = new FormData();
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    setNewOffer(data);
    resetForm();
  };

  const validationSchema =
    contestType === CONSTANTS.LOGO_CONTEST
      ? Schemes.LogoOfferSchema
      : Schemes.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}

          <button type="submit" className={styles.btnOffer}>
            Send Offer
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default OfferForm;
