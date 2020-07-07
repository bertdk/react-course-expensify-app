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
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt }
    return database.ref('expenses').push(expense).then((ref) => {
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

// EDIT_EXPENSE
export const editExpense = (id, update) => ({
  type: 'EDIT_EXPENSE',
  id,
  update
});