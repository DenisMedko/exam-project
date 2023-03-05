import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';
import SlideBar from '../../components/SlideBar/SlideBar';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.sass';
import carouselConstants from '../../carouselConstants';
import Spinner from '../../components/Spinner/Spinner';
import HeadlineText from './HeadlineText.jsx';

const Home = () => {
  const { isFetching, data } = useSelector((state) => state.userStore);
  const role = data?.role || undefined;

  return (
    <>
      <Header />
      {isFetching && <Spinner />}
      {!isFetching && (
        <>
          <div className={styles.container}>
            <div className={styles.headerBar}>
              <div className={styles.headline}>
                <span>{CONSTANTS.HOME_PAGE_ITEMS.header.title}</span>
                <HeadlineText />
              </div>
              <p>{CONSTANTS.HOME_PAGE_ITEMS.header.text}</p>
              {role && (
                <div className={styles.button}>
                  <Link className={styles.button__link} to="/dashboard">
                    DASHBOARD
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.greyContainer}>
              <SlideBar
                images={carouselConstants.mainSliderImages}
                carouselType={carouselConstants.MAIN_SLIDER}
              />
            </div>
            <div className={styles.container__description}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-world-icon.png`}
                    alt="globe"
                  />
                  <h3>
                    {CONSTANTS.HOME_PAGE_ITEMS.largestNamingCommunity.title}
                  </h3>
                  <p>{CONSTANTS.HOME_PAGE_ITEMS.largestNamingCommunity.text}</p>
                </div>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-high-quality-icon.png`}
                    alt="desktop"
                  />
                  <h3>
                    {CONSTANTS.HOME_PAGE_ITEMS.highQualityCollaboration.title}
                  </h3>
                  <p>
                    {CONSTANTS.HOME_PAGE_ITEMS.highQualityCollaboration.text}
                  </p>
                </div>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-trademark-icon.png`}
                    alt="cards"
                  />
                  <h3>{CONSTANTS.HOME_PAGE_ITEMS.agencyLevelFeatures.title}</h3>
                  <p>{CONSTANTS.HOME_PAGE_ITEMS.agencyLevelFeatures.text}</p>
                </div>
              </div>
            </div>
            <div className={styles.greyContainer}>
              <div className={styles.adv}>
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
            <h2>{CONSTANTS.HOME_PAGE_ITEMS.contestSteps.title}</h2>
            {CONSTANTS.HOME_PAGE_ITEMS.contestSteps.contestStepsItems.map(
              (step) => (
                <div className={styles[step.containerStyle]} key={step.id}>
                  <div className={styles[step.stepStyle]}>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/${step.stepImg}`}
                      alt="compressed"
                    />
                    <div className={styles[step.stepSubStyle]}>
                      <h3>{step.stepTitle}</h3>
                      {step.texts.map((stepText) => (
                        <p key={stepText.id}>
                          <i className="fas fa-check" />
                          <span>{stepText.text}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
            <div className={styles.headerBar}>
              <h3>{CONSTANTS.HOME_PAGE_ITEMS.namesForSale.title}</h3>
              <p className={styles.blueUnderline}>
                {CONSTANTS.HOME_PAGE_ITEMS.namesForSale.text}
              </p>
            </div>
            <SlideBar
              images={carouselConstants.exampleSliderImages}
              carouselType={carouselConstants.EXAMPLE_SLIDER}
            />
            {role && (
              <div className={styles.button}>
                <Link className={styles.button__link} to="/dashboard">
                  DASHBOARD
                </Link>
              </div>
            )}
            <div className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <SlideBar
                images={carouselConstants.feedbackSliderImages}
                carouselType={carouselConstants.FEEDBACK_SLIDER}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
