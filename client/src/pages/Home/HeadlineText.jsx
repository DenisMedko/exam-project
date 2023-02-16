import React, { useState, useEffect } from 'react';
import styles from './Home.module.sass';
import CONSTANTS from '../../constants';

const HeadlineText = () => {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  let timeout;

  useEffect(() => {
    timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);

    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  });

  const text =
    CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ];

  return <span className={styleName}>{text}</span>;
};

export default HeadlineText;
