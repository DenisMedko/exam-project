import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import Payment from '../pages/Payment/Payment';
import Dashboard from '../pages/Dashboard/Dashboard';
import PrivateHoc from '../components/PrivateHoc/PrivateHoc';
import NotFound from '../components/NotFound/NotFound';
import Home from '../pages/Home/Home';
import OnlyNotAuthorizedUserHoc from '../components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from '../pages/ContestPage/ContestPage';
import UserProfile from '../pages/UserProfile/UserProfile';
import StartContestSwitcher from './StartContestSwitcher';

const MainSwitcher = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/login"
        component={OnlyNotAuthorizedUserHoc(LoginPage)}
      />
      <Route
        exact
        path="/registration"
        component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
      />
      <Route path="/startContest*" children={StartContestSwitcher} />
      <Route exact path="/payment" component={PrivateHoc(Payment)} />
      <Route exact path="/dashboard" component={PrivateHoc(Dashboard)} />
      <Route exact path="/contest/:id" component={PrivateHoc(ContestPage)} />
      <Route exact path="/account" component={PrivateHoc(UserProfile)} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default MainSwitcher;
