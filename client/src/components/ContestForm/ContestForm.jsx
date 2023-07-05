import React, { useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as dataForContestActionCreator from '../../store/slices/dataForContestSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';
import styles from './ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import Schemes from '../../utils/validators/validationSchems';
import OptionalSelects from '../OptionalSelects/OptionalSelects';
import CONSTANTS from '../../constants';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

const variableOptions = {
  [CONSTANTS.CONTESTS.nameContest.type]: {
    styleName: '',
    typeOfName: '',
    characteristics: {
      characteristic1: 'nameStyle',
      characteristic2: 'typeOfName',
    },
    buttons: CONSTANTS.CONTESTS.nameContest.formButtons,
  },
  [CONSTANTS.CONTESTS.logoContest.type]: {
    nameVenture: '',
    brandStyle: '',
    characteristics: { characteristic1: 'brandStyle' },
  },
  [CONSTANTS.CONTESTS.taglineContest.type]: {
    nameVenture: '',
    typeOfTagline: '',
    characteristics: { characteristic1: 'typeOfTagline' },
  },
};

const ContestForm = ({ contestType, defaultData, handleSubmit, formRef }) => {
  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const dataForContest = useSelector((state) => state.dataForContest);
  const { getDataForContest: getData } = bindActionCreators(
    { ...dataForContestActionCreator },
    useDispatch()
  );
  useEffect(() => {
    getPreference();
  }, []);
  const getPreference = () => {
    const options = variableOptions[contestType].characteristics;
    getData(options);
  };

  const { isFetching, error } = dataForContest;

  const buttons = variableOptions[contestType].buttons;
  const initialBtnValue =
    buttons?.filter((btn) => btn.selected)[0]?.value ?? null;

  const renderForm = () => {
    return (
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            title: '',
            industry: '',
            focusOfWork: '',
            targetCustomer: '',
            file: '',
            ...variableOptions[contestType],
            ...defaultData,
            selectedButton: initialBtnValue,
          }}
          onSubmit={handleSubmit}
          validationSchema={Schemes.ContestSchem}
          innerRef={formRef}
          enableReinitialize
        >
          <Form>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Title of contest</span>
              <FormInput
                name="title"
                type="text"
                label="Title"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <SelectInput
                name="industry"
                classes={{
                  inputContainer: styles.selectInputContainer,
                  inputHeader: styles.selectHeader,
                  selectInput: styles.select,
                  warning: styles.warning,
                }}
                header="Describe industry associated with your venture"
                optionsArray={dataForContest.data.industry}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What does your company / business do?
              </span>
              <FormTextArea
                name="focusOfWork"
                type="text"
                label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                Tell us about your customers
              </span>
              <FormTextArea
                name="targetCustomer"
                type="text"
                label="customers"
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
              />
            </div>
            <OptionalSelects
              isFetching={isFetching}
              contestType={contestType}
              dataForContest={dataForContest}
            />
            {buttons && (
              <Field name="selectedButton">
                {({ field, form }) => {
                  const handleBtnSelect = (btnValue) => {
                    form.setFieldValue(field.name, btnValue);
                  };
                  return (
                    <ButtonGroup
                      buttons={buttons}
                      initialBtnValue={initialBtnValue}
                      handleBtnSelect={handleBtnSelect}
                    />
                  );
                }}
              </Field>
            )}
            <FieldFileInput
              name="file"
              classes={{
                fileUploadContainer: styles.fileUploadContainer,
                labelClass: styles.label,
                fileNameClass: styles.fileName,
                fileInput: styles.fileInput,
                warning: styles.warning,
              }}
              type="file"
            />
            {isEditContest ? (
              <button type="submit" className={styles.changeData}>
                Set Data
              </button>
            ) : null}
          </Form>
        </Formik>
      </div>
    );
  };
  return (
    <>
      {error && <TryAgain getData={getPreference} />}
      {!error && isFetching && <Spinner />}
      {!error && !isFetching && renderForm()}
    </>
  );
};

export default withRouter(ContestForm);
