import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as refreshActionCreator from './store/slices/userSlice';
import MainRouter from './appRouter/MainRouter';
import { ToastContainer } from 'react-toastify';
import CONSTANTS from './constants';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { refresh } = bindActionCreators(
    { ...refreshActionCreator },
    useDispatch()
  );
  useEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (refreshToken) {
      refresh(refreshToken);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <MainRouter />
      <ChatContainer />
    </>
  );
};

export default App;
