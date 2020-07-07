import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter'
import configurStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from "./selectors/expenses";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
import { firebase } from './firebase/firebase';

const store = configurStore();

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent bill', amount: 6543456 }));
// // store.dispatch(setTextFilter('water'));

// // setTimeout(() => {
// //   store.dispatch(setTextFilter('bill'));

// // }, 3000);

// const state = store.getState();
// const visbleExpenses = getVisibleExpenses(state.expenses, state.filter);
// console.log(visbleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderapp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}
ReactDOM.render(<p>Loading ...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderapp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderapp();
    history.push('/');
  }
});
