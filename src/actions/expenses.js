import uuid from 'uuid';
import database from '../firebase/firebase';

// Without database:
// component calls action generator
// action generator returns object
// component dispaches object
// redux store changes

// With firebase:
// component calls action generator
// action generator returns function
// component dispaches function (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt }
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpence = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpence({ id }));
    }).catch((e) => {
      console.log('REMOVE not done because:', e)
    })
  };
};

// EDIT_EXPENSE
export const editExpense = (id, update) => ({
  type: 'EDIT_EXPENSE',
  id,
  update
});

export const startEditExpense = (id, update) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(update).then(() => {
      dispatch(editExpense(id, update));
    }).catch((e) => {
      console.log('EDIT not done because:', e)
    });
  };
};

// SET_EXPENSES 
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((element) => {
        expenses.push({
          id: element.key,
          ...element.val()
        });
      });
      dispatch(setExpenses(expenses));
    }).catch((e) => {
      console.log('DENIED', e);
    })
  };
};