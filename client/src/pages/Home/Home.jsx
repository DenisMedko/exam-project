import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';
import SlideBar from '../../components/SlideBar/SlideBar';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.sass';
import carouselConstants from '../../carouselConstants';
import Spinner from '../../components/Spinner/Spinner';
import HeadlineText from './HeadlineText.jsx';
import mocks from '../../utils/mocks/homePageMocks';

const Home = (props) => {
  const { isFetching, role } = props;

  return (
    <>
      <Header />
      {isFetching && <Spinner />}
      {!isFetching && (
        <>
          <div className={styles.container}>
            <div className={styles.headerBar}>
              <div className={styles.headline}>
                <span>{mocks.header.title}</span>
                <HeadlineText />
              </div>
              <p>{mocks.header.text}</p>
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
                  <h3>{mocks.largestNamingCommunity.title}</h3>
                  <p>{mocks.largestNamingCommunity.text}</p>
                </div>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-high-quality-icon.png`}
                    alt="desktop"
                  />
                  <h3>{mocks.highQualityCollaboration.title}</h3>
                  <p>{mocks.highQualityCollaboration.text}</p>
                </div>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-trademark-icon.png`}
                    alt="cards"
                  />
                  <h3>{mocks.agencyLevelFeatures.title}</h3>
                  <p>{mocks.agencyLevelFeatures.text}</p>
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
                  <p>{mocks.creatives.count}</p>
                  <span>{mocks.creatives.title}</span>
                </div>
                <div>
                  <p>{mocks.customers.count}</p>
                  <span>{mocks.customers.title}</span>
                </div>
                <div>
                  <p>{mocks.industries.count}</p>
                  <span>{mocks.industries.title}</span>
                </div>
              </div>
            </div>
            <h2>{mocks.contestSteps.title}</h2>
            {mocks.contestSteps.contestStepsItems.map((step) => (
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
            ))}
            <div className={styles.headerBar}>
              <h3>{mocks.namesForSale.title}</h3>
              <p className={styles.blueUnderline}>{mocks.namesForSale.text}</p>
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

const mapStateToProps = (state) => {
  const { isFetching, data } = state.userStore;
  return { isFetching, role: data?.role || undefined };
};

export default connect(mapStateToProps, null)(Home);
