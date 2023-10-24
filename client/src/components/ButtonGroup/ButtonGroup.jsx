import styles from './ButtonGroup.module.sass';
import { useState } from 'react';
import Button from './Button/Button';
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
        <Button
          key={button.id}
          button={button}
          selectedButtonValue={selectedButtonValue}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
