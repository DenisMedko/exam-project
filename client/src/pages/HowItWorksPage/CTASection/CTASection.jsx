import classNames from 'classnames';
import CONSTANTS from '../../../constants';
import { Link } from 'react-router-dom';
import styles from './CTASection.module.sass';
import pageStyles from '../HowItWorksPage.module.sass';

const CTASection = ({ content }) => {
  const { title, text, picStart, picEnd } = content;
  return (
    <div className={styles.container}>
      <img
        className={classNames(styles.ctaImg, styles.ctaImgStart)}
        src={`${CONSTANTS.STATIC_IMAGES_PATH}${picStart}`}
        alt="ctaImgStart"
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
        <Link
          className={classNames(
            pageStyles.btn,
            pageStyles.btnWhite,
            pageStyles.btnWide,
            pageStyles.transition3dHover
          )}
          to={'/startContest'}
        >
          Start A Contest
        </Link>
      </div>
      <img
        className={classNames(styles.ctaImg, styles.ctaImgEnd)}
        src={`${CONSTANTS.STATIC_IMAGES_PATH}${picEnd}`}
        alt="ctaImgEnd"
      />
    </div>
  );
};

export default CTASection;
