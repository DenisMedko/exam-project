import CONSTANTS from '../../../constants';
import classNames from 'classnames';
import pageStyles from '../HowItWorksPage.module.sass';
import styles from './HeroSection.module.sass';

const HeroSection = ({ content }) => {
  const { title, text, pic } = content;
  return (
    <div className={styles.row}>
      <div className={classNames(styles.col, styles.colText)}>
        <span
          className={classNames(
            pageStyles.btn,
            pageStyles.btnSoftPrimary,
            pageStyles.btnPill,
            pageStyles.btnXs,
            pageStyles.mb2
          )}
        >
          World's #1 Naming Platform
        </span>
        <div className={styles.mb4}>
          <h1 className={styles.fontWeightSemiBold}>{title}</h1>
          <p>{text}</p>
        </div>
        <div className={styles.mb9}>
          <a
            className={classNames(
              pageStyles.btn,
              pageStyles.btnPrimary,
              pageStyles.btnWide,
              pageStyles.btnPill,
              pageStyles.transition3dHover,
              styles.mb2
            )}
            href="https://vimeo.com/368584367"
          >
            <small
              className={classNames(styles.fas, styles.faPlay, styles.mr2)}
            ></small>
            Play Video
          </a>
        </div>
      </div>
      <div className={classNames(styles.col, styles.colFigure)}>
        <img
          className={styles.appUserImg}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}${pic}`}
          alt="app-user"
        />
      </div>
    </div>
  );
};
export default HeroSection;
