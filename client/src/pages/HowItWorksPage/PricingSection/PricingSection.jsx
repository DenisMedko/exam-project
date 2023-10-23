import CONSTANTS from '../../../constants';
import styles from './PricingSection.module.sass';

const PricingSection = ({ content }) => {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {content.map((item, index) => {
          return (
            <div className={styles.item}>
              <div className={styles.text}>
                <div className={styles.angleRight}>&gt;</div>
                <h4 className={styles.title}>{item.title}</h4>
              </div>
              <p dangerouslySetInnerHTML={{ __html: item.html }}></p>
              {index < content.length - 1 && (
                <div className={styles.horizontalLine}></div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.info}>
        <h4>Questions?</h4>
        <div>
          Speak with a Squadhelp platform expert to learn more and get you
          questions answered.
        </div>
        <button>Schedule Consultation</button>
        <a href="tel:355-3585">
          <div className={styles.numberContainer}>
            <img
              className={styles.phoneImg}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.svg`}
              alt="phone"
            />
            <span>(877)&nbsp;355-3585</span>
          </div>
        </a>
        <span>Call us for assistance</span>
      </div>
    </div>
  );
};
export default PricingSection;
