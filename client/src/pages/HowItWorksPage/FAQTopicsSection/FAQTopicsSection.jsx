import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Accordion from '../../../components/Accordion/Accordion';
import pageStyles from '../HowItWorksPage.module.sass';
import styles from './FAQTopicsSection.module.sass';

const FAQTopicsSection = ({ content }) => {
  const [refsArray, setRefsArray] = useState([]);

  useEffect(() => {
    setRefsArray(content.map(() => React.createRef()));
  }, [content]);

  const onClickHandler = (topicIndex) => {
    if (refsArray[topicIndex].current) {
      refsArray[topicIndex].current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const renderTopicsList = () => {
    return content.map((topic, topicIndex) => (
      <li key={topic.id}>
        <div className={styles.link} onClick={() => onClickHandler(topicIndex)}>
          {topic.title}
        </div>
      </li>
    ));
  };

  const renderAccordion = () => {
    return content.map((topic, topicIndex) => {
      return (
        <div key={topic.id} className={styles.topic}>
          <hr ref={refsArray[topicIndex]} />
          <h3 className={styles.topicTitle}>{topic.title}</h3>
          <Accordion key={topic.id} items={topic.faqs} />
        </div>
      );
    });
  };

  return (
    <div className={classNames(pageStyles.container, styles.topicsContainer)}>
      <ul className={styles.topicsList}>{renderTopicsList()}</ul>
      <div className={styles.topics}>{renderAccordion()}</div>
    </div>
  );
};

export default FAQTopicsSection;
