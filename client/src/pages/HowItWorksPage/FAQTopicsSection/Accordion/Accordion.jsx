import { useState } from 'react';
import classNames from 'classnames';
import styles from './Accordion.module.sass';
import CONSTANTS from '../../../../constants';

const Accordion = (props) => {
  const { header, text } = props;
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={styles.faqBtn}
      >
        {header}
        <button className={styles.arrowBtn}>
          <img
            className={classNames({
              [styles.arrowPicRotate]: isActive,
              [styles.arrowPicRotateBack]: !isActive,
            })}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow.svg`}
            alt="arrow"
          />
        </button>
      </button>
      {isActive && (
        <div
          className={styles.faqText}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </>
  );
};

export default Accordion;
