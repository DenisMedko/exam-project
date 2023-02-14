import { Route, Switch } from 'react-router-dom';
import PrivateHoc from '../components/PrivateHoc/PrivateHoc';
import StartContestPage from '../pages/StartContestPage/StartContestPage';
import ContestCreationPage from '../pages/ContestCreation/ContestCreationPage';
import NotFound from '../components/NotFound/NotFound';
import CONSTANTS from '../constants';

const StartContestRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path="/startContest"
        component={PrivateHoc(StartContestPage)}
      />
      <Route
        exact
        path="/startContest/nameContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.NAME_CONTEST,
          title: 'Company Name',
        })}
      />
      <Route
        exact
        path="/startContest/taglineContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.TAGLINE_CONTEST,
          title: 'TAGLINE',
        })}
      />
      <Route
        exact
        path="/startContest/logoContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.LOGO_CONTEST,
          title: 'LOGO',
        })}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
export default StartContestRouter;
