import classNames from 'classnames';
import Accordion from '../../../components/Accordion/Accordion';
import pageStyles from '../HowItWorksPage.module.sass';
import styles from './FAQTopicsSection.module.sass';

const FAQTopicsSection = ({ content }) => {
  const renderTopics = ({ faqs }) => {
    return (
      <article>
        {faqs.map((faq) => (
          <div key={faq.id} className={styles.faq}>
            <Accordion header={faq.header} text={faq.text} />
          </div>
        ))}
      </article>
    );
  };
  return (
    <div className={classNames(pageStyles.container, styles.topicsContainer)}>
      <ul className={styles.topicsList}>
        {content.map((topic) => (
          <li key={topic.id}>
            <a className={styles.link} href={`#${topic.url}`}>
              {topic.title}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.topics}>
        {content.map((topic, i) => (
          <div key={topic.id} id={topic.url} className={styles.topic}>
            <h3 className={styles.topicTitle}>{topic.title}</h3>
            {renderTopics(topic)}
            {content.length - 1 !== i && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQTopicsSection;
