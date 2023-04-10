import FeaturesList from './FeaturesList/FeaturesList';
import pageStyles from '../HowItWorksPage.module.sass';
import styles from './FeaturesSection.module.sass';
import CONSTANTS from '../../../constants';

const FeaturesSection = ({ content }) => {
  const { icon, title, pic, featuresList } = content;
  return (
    <div className={pageStyles.container}>
      <div className={styles.title}>
        <img
          className={styles.cupIcon}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}${icon}`}
          alt="cup"
        />
        <h2 className={styles.fontWeightSemiBold}>{title}</h2>
      </div>

      <div className={styles.row}>
        <img
          className={styles.featuresPic}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}${pic}`}
          alt="feature-user"
        />
        <div className={styles.featuresList}>
          <FeaturesList features={featuresList} />
        </div>
      </div>
    </div>
  );
};
export default FeaturesSection;
