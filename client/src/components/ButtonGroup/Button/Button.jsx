import classNames from 'classnames';
import styles from './Button.module.sass';

const Button = ({ button, selectedButtonValue, setSelected }) => {
  return (
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
  );
};
export default Button;
