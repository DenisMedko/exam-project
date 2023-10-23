import CONSTANTS from '../../constants';
import styles from './AdvertisementContainer.module.sass';

const AdvertisementContainer = () => {
  return (
    <div className={styles.greyContainer}>
      <div className={styles.adv}>
        <h3>Featured In</h3>
        <div className={styles.images}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`}
            alt="forbes"
          />
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-active.png`}
            alt="forbes"
          />
        </div>
        <div className={styles.images}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`}
            alt="web"
          />
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_active.png`}
            alt="web"
          />
        </div>
        <div className={styles.images}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`}
            alt="mashable"
          />
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-active.png`}
            alt="mashable"
          />
        </div>
      </div>
      <div className={styles.stats}>
        <div>
          <p>{CONSTANTS.HOME_PAGE_ITEMS.creatives.count}</p>
          <span>{CONSTANTS.HOME_PAGE_ITEMS.creatives.title}</span>
        </div>
        <div>
          <p>{CONSTANTS.HOME_PAGE_ITEMS.customers.count}</p>
          <span>{CONSTANTS.HOME_PAGE_ITEMS.customers.title}</span>
        </div>
        <div>
          <p>{CONSTANTS.HOME_PAGE_ITEMS.industries.count}</p>
          <span>{CONSTANTS.HOME_PAGE_ITEMS.industries.title}</span>
        </div>
      </div>
    </div>
  );
};
export default AdvertisementContainer;
