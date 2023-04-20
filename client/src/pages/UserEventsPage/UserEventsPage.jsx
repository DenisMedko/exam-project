import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import Events from '../../components/Events/Events';

const UserEventsPage = ({ history }) => {
  const { role, id: userId } = useSelector(
    (state) => state.userStore.data || {}
  );
  if (role !== CONSTANTS.CUSTOMER) {
    history.replace('/');
  }
  return (
    <>
      <Header />
      <Events props={userId} />
      <Footer />
    </>
  );
};

export default UserEventsPage;
