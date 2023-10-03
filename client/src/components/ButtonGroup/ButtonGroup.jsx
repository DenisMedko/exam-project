import classNames from 'classnames';
import styles from './ButtonGroup.module.sass';
import { useState } from 'react';
import { filterArrayByField } from '../../utils/functions';

const ButtonGroup = ({ buttons, initialBtnValue, handleBtnSelect }) => {
  const [selectedButtonValue, setSelectedButtonValue] =
    useState(initialBtnValue);
  const setSelected = (e) => {
    const btnValue = filterArrayByField(buttons, 'value', e.target.value)[0]
      ?.value;
    setSelectedButtonValue(btnValue);
    handleBtnSelect(btnValue);
  };
  return (
    <div className={styles.buttonGroup}>
      {buttons.map((button) => (
        <div
          key={button.id}
          className={classNames(styles.btn, {
            [styles.selectedBtn]: button.value === selectedButtonValue,
          })}
        >
          <label>
            <div className={styles.isDomainRequired}>
              {button.isDomainRequired ? 'Yes' : 'No'}
            </div>
            <input
              className={styles.radioBtn}
              type="radio"
              name="selectedButton"
              value={button.value}
              checked={selectedButtonValue === button.value}
              onChange={setSelected}
            />
            {button.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
