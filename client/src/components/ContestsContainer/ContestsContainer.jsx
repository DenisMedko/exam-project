import { useEffect } from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

const ContestsContainer = (props) => {
  const { isFetching, loadMore, children, count } = props;
  const offset = children.length;

  useEffect(() => {
    count > children.length && window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [offset]);

  const scrollHandler = () => {
    window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight && loadMore(offset);
  };

  return (
    <div>
      {!!children.length && children}
      {!children.length && (
        <div className={styles.notFound}>Nothing not found</div>
      )}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ContestsContainer;
