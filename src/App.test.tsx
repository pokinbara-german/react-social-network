import {render, screen} from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import {HashRouter} from "react-router-dom";

const appNotInitiatedState = {
  app: {
    initDone: false
  }
};

const appInitiatedState = {
  app: {
    initDone: true
  },
  auth: {
    isAuth: false,
  },
  profilePage: {
    ownerProfile: null,
  },
  dialogsPage: {
    newMessagesCount: 0,
  }
};

const mockStore = configureMockStore([thunk]);

test('On not initiated App must be preloader', () => {
  const store = mockStore(appNotInitiatedState);

  render(<Provider store={store}><App/></Provider>);
  const preloader = screen.getByRole('img');

  expect(preloader).toBeInTheDocument();
  expect(preloader).toHaveAttribute('src', 'preloader-spinner.svg');
  expect(preloader).toHaveAttribute('alt', 'preloader');
});

test('On initiated App must have logo', () => {
  const store = mockStore(appInitiatedState);

  render(<HashRouter><Provider store={store}><App/></Provider></HashRouter>);
  const preloader = screen.getByRole('img');

  expect(preloader).toBeInTheDocument();
  expect(preloader).toHaveAttribute('src', 'logo.svg');
  expect(preloader).toHaveAttribute('alt', 'logo');
});
