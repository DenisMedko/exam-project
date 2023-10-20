import { useState } from 'react';
import classNames from 'classnames';
import styles from './Accordion.module.sass';
import CONSTANTS from '../../constants';

const Accordion = ({ items }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const onClickHandler = (itemIndex) => {
    activeItemIndex !== itemIndex
      ? setActiveItemIndex(itemIndex)
      : setActiveItemIndex(null);
  };

  const renderItem = (item, activeItemIndex, itemIndex) => {
    const { id, header, text } = item;
    const isActive = activeItemIndex === itemIndex;
    return (
      <div key={id} className={styles.item}>
        <button
          onClick={() => onClickHandler(itemIndex)}
          className={styles.itemBtn}
        >
          {header}
          <div className={styles.arrowBtn}>
            <img
              className={classNames({
                [styles.arrowPicRotate]: isActive,
                [styles.arrowPicRotateBack]: !isActive,
              })}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow.svg`}
              alt="arrow"
            />
          </div>
        </button>
        {isActive && (
          <div
            className={styles.itemText}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    );
  };
  return (
    <article>
      {items.map((item, itemIndex) =>
        renderItem(item, activeItemIndex, itemIndex)
      )}
    </article>
  );
};

export default Accordion;
