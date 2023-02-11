import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import './App.css';
import CONSTANTS from './constants';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import { refresh } from './store/slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import Switcher from './routes';

class App extends Component {
  componentDidMount() {
    const { refresh } = this.props;
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshToken) {
      refresh(refreshToken);
    }
  }

  render() {
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
        <Switcher />
        <ChatContainer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  refresh: (refreshToken) => dispatch(refresh(refreshToken)),
});

export default connect(null, mapDispatchToProps)(App);
