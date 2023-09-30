import { useEffect } from 'react';
import styles from './OffersContainer.module.sass';
import OfferBox from '../OfferBox/OfferBox';
import CONSTANTS from '../../constants';

const OffersContainer = (props) => {
  const {
    error,
    offers,
    moderatorFilter,
    count,
    getOffers,
    clearOffersList,
    setOfferStatusModerator,
  } = props;
  const offset = offers.length;

  const setNewOptions = (startFrom = 0) => {
    return {
      requestData: {
        offset: startFrom,
        limit: CONSTANTS.OFFERS_DISPLAY_LIMIT,
        offerStatus: moderatorFilter,
      },
      role: CONSTANTS.MODERATOR,
    };
  };

  useEffect(() => {
    getOffers(setNewOptions(offset));
    return () => {
      clearOffersList();
    };
  }, [moderatorFilter]);

  const needButtons = (offerStatus) => {
    return offerStatus === CONSTANTS.OFFER_STATUS_MODERATOR_PENDING;
  };

  useEffect(() => {
    count > offset && window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [offset]);

  const scrollHandler = () => {
    count > offset &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      getOffers(setNewOptions(offset));
  };

  const wrapSetOfferStatus = (contest) => (creatorId, offerId, command) => {
    const { id, orderId, priority } = contest;
    setOfferStatusModerator({
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    });
  };

  return (
    <div className={styles.offersContainer}>
      {!error &&
        offers.map((offer) => (
          <OfferBox
            offer={offer}
            key={offer.id}
            contestType={offer.Contest.contestType}
            needButtons={needButtons}
            setOfferStatus={wrapSetOfferStatus(offer.Contest)}
          />
        ))}
      {!error && !offers.length && (
        <div className={styles.notFound}>Nothing not found</div>
      )}
    </div>
  );
};

export default OffersContainer;
