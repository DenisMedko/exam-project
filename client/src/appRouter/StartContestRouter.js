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
          contestType: CONSTANTS.CONTESTS.nameContest.type,
          title: 'Company Name',
        })}
      />
      <Route
        exact
        path="/startContest/taglineContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.CONTESTS.taglineContest.type,
          title: 'TAGLINE',
        })}
      />
      <Route
        exact
        path="/startContest/logoContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.CONTESTS.logoContest.type,
          title: 'LOGO',
        })}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
export default StartContestRouter;
