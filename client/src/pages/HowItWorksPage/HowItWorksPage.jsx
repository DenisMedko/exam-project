import Header from '../../components/Header/Header';
import HeroSection from './HeroSection/HeroSection';
import ServicesSection from './ServicesSection/ServicesSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import Footer from '../../components/Footer/Footer';
import styles from './HowItWorksPage.module.sass';
import howItWorksPageMocks from '../../utils/mocks/howItWorksPageMocks';

const HowItWorksPage = () => {
  const { hero, services, features } = howItWorksPageMocks;
  return (
    <>
      <Header />
      <main className={styles.content}>
        <section>
          <div className={styles.container}>
            <HeroSection content={hero} />
          </div>
        </section>
        <section>
          <div className={styles.container}>
            <ServicesSection content={services} />
          </div>
        </section>
        <section>
          <div className={styles.container}>
            <FeaturesSection content={features} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default HowItWorksPage;
