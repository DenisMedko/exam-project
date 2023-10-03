import classNames from 'classnames';
import CardDeck from './CardDeck/CardDeck';
import pageStyles from '../HowItWorksPage.module.sass';
import styles from './ServicesSection.module.sass';

const ServicesSection = ({ content }) => {
  const { title, text, cards } = content;

  return (
    <div className={pageStyles.container}>
      <div className={styles.title}>
        <small
          className={classNames(
            pageStyles.btn,
            pageStyles.btnSoftPrimary,
            pageStyles.btnPill,
            pageStyles.btnXs,
            pageStyles.mb2
          )}
        >
          Our Services
        </small>
        <h2 className={styles.fontWeightNormal}>{title}</h2>
        <p className={styles.mb0}>{text}</p>
      </div>
      <div className={styles.cardDeck}>
        <CardDeck cards={cards} />
      </div>
    </div>
  );
};
export default ServicesSection;
