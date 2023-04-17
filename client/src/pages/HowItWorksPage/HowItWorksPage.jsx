import Header from '../../components/Header/Header';
import HeroSection from './HeroSection/HeroSection';
import ServicesSection from './ServicesSection/ServicesSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import FAQTopicsSection from './FAQTopicsSection/FAQTopicsSection';
import CTASection from './CTASection/CTASection';
import Footer from '../../components/Footer/Footer';
import styles from './HowItWorksPage.module.sass';
import howItWorksPageMocks from '../../utils/mocks/howItWorksPageMocks';

const HowItWorksPage = () => {
  const { hero, services, features, topics, cta } = howItWorksPageMocks;
  return (
    <>
      <Header />
      <main className={styles.content}>
        <section>
          <HeroSection content={hero} />
        </section>
        <hr />
        <section>
          <ServicesSection content={services} />
        </section>
        <hr />
        <section>
          <FeaturesSection content={features} />
        </section>
        <hr />
        <section>
          <FAQTopicsSection content={topics} />
        </section>
        <section>
          <CTASection content={cta} />
        </section>
      </main>
      <Footer />
    </>
  );
};
export default HowItWorksPage;
