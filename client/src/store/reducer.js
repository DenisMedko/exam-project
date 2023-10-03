import authReducer from '../store/slices/authSlice';
import userReducer from '../store/slices/userSlice';
import dataForContestReducer from '../store/slices/dataForContestSlice';
import paymentReducer from '../store/slices/paymentSlice';
import contestsReducer from '../store/slices/contestsSlice';
import contestCreationReducer from '../store/slices/contestCreationSlice';
import bundleReducer from '../store/slices/bundleSlice';
import contestByIdReducer from '../store/slices/contestByIdSlice';
import contestUpdationReducer from '../store/slices/contestUpdationSlice';
import chatReducer from '../store/slices/chatSlice';
import userProfileReducer from '../store/slices/userProfileSlice';
import eventReducer from '../store/slices/eventSlice';
import offersReducer from '../store/slices/offersSlice';

const rootReducer = {
  userStore: userReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: paymentReducer,
  contestByIdStore: contestByIdReducer,
  contestsList: contestsReducer,
  contestCreationStore: contestCreationReducer,
  bundleStore: bundleReducer,
  contestUpdationStore: contestUpdationReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
  eventStore: eventReducer,
  offersList: offersReducer,
};

export default rootReducer;
