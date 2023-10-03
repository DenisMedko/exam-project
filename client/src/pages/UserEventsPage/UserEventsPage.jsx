import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import Events from '../../components/Events/Events';
import styles from './UserEventsPage.module.sass';

const UserEventsPage = ({ history }) => {
  const { role } = useSelector((state) => state.userStore.data || {});
  if (role && role !== CONSTANTS.CUSTOMER) {
    history.replace('/');
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Events />
      </div>
      <Footer />
    </>
  );
};

export default UserEventsPage;
