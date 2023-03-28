import pageStyles from '../../HowItWorksPage.module.sass';
import styles from './CardDeck.module.sass';
import classNames from 'classnames';
import CONSTANTS from '../../../../constants';
import { Link } from 'react-router-dom';

const CardDeck = ({ cards }) => {
  return cards.map((card) => (
    <div className={styles.card} key={card.id}>
      <img
        className={styles.cardImg}
        src={`${CONSTANTS.STATIC_IMAGES_PATH}${card.pic}`}
        alt={`card${card.id}`}
      />
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <Link
        className={classNames(
          pageStyles.btn,
          pageStyles.btnPrimary,
          pageStyles.btnWide,
          pageStyles.transition3dHover
        )}
        to={card.btn.link}
      >
        {card.btn.title}
      </Link>
    </div>
  ));
};
export default CardDeck;
