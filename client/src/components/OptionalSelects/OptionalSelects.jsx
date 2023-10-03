import React, { Fragment } from 'react';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import styles from '../ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import CONSTANTS from '../../constants';

const OptionalSelects = ({ isFetching, contestType, dataForContest }) => {
  const variableOptions = {
    [CONSTANTS.CONTESTS.nameContest.type]: CONSTANTS.CONTESTS.nameContest,
    [CONSTANTS.CONTESTS.logoContest.type]: CONSTANTS.CONTESTS.logoContest,
    [CONSTANTS.CONTESTS.taglineContest.type]: CONSTANTS.CONTESTS.taglineContest,
  };
  const renderContestForm = () => {
    return (
      <div className={styles.inputContainer}>
        {variableOptions[contestType].formInputs.map((formInput) => (
          <Fragment key={formInput.name}>
            <span className={styles.inputHeader}>{formInput.title}</span>
            <FormInput
              name={formInput.name}
              type={formInput.type}
              label={formInput.label}
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </Fragment>
        ))}
        {variableOptions[contestType].selectInputs.map((selectInput) => (
          <SelectInput
            key={selectInput.name}
            name={selectInput.name}
            header={selectInput.header}
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={dataForContest.data[selectInput.name]}
          />
        ))}
      </div>
    );
  };
  return (
    <>
      {isFetching && <Spinner />}
      {!isFetching && renderContestForm()}
    </>
  );
};

export default OptionalSelects;
