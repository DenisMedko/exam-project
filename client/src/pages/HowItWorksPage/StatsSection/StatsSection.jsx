import { Fragment } from 'react';
import CONSTANTS from '../../../constants';
import styles from './StatsSection.module.sass';

const StatsSection = ({ content }) => {
  return (
    <div className={styles.container}>
      {content.map((item, index) => {
        return (
          <Fragment key={item.id}>
            <div className={styles.item}>
              <img
                className={styles.statsImg}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}${item.pic}`}
                alt={item.alt}
              />
              <p dangerouslySetInnerHTML={{ __html: item.html }}></p>
            </div>
            {index < content.length - 1 && (
              <div className={styles.verticalLine}></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
export default StatsSection;
