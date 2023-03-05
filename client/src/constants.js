import contestFormMocks from './utils/mocks/contestFormMocks';
import footerMocks from './utils/mocks/footerMocks';
import headerMocks from './utils/mocks/headerMocks';
import homePageMocks from './utils/mocks/homePageMocks';
import registrationPageMocks from './utils/mocks/registrationPageMocks';
import startContestPageMocks from './utils/mocks/startContestPageMocks';

const env = process.env.REACT_APP_NODE_ENV || 'development';
const serverIP = process.env.REACT_APP_SERVER_IP || 'localhost';
const serverPort = process.env.REACT_APP_SERVER_PORT || 5000;
export default {
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  CONTEST_STATUSES: [
    { id: 1, name: 'active', title: 'Active Contests' },
    { id: 2, name: 'finished', title: 'Completed contests' },
    { id: 3, name: 'pending', title: 'Inactive contests' },
  ],
  CONTEST_DISPLAY_LIMIT: 5,
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS: contestFormMocks,
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  OFFER_STATUS_PENDING: 'pending',
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  REFRESH_TOKEN: 'refreshToken',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  AUTH_MODE: {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
  },
  HEADER_ANIMATION_TEXT: headerMocks.animationText,
  HEADER_ITEMS: headerMocks,
  FOOTER_ITEMS: footerMocks,
  HOME_PAGE_ITEMS: homePageMocks,
  REGISTRATION_PAGE_ITEMS: registrationPageMocks,
  START_CONTEST_PAGE_ITEMS: startContestPageMocks,
};
