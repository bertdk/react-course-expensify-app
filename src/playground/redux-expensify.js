import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSE
const removeExpence = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
const editExpense = (id, update) => ({
  type: 'EDIT_EXPENSE',
  id,
  update
})

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (date = undefined) => ({
  type: 'SET_START_DATE',
  date
})

// SET_END_DATE
const setEndDate = (date = undefined) => ({
  type: 'SET_END_DATE',
  date
})

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((exp) => {
        if (exp.id === action.id) {
          return {
            ...exp,
            ...action.update
          }
        } else {
          return exp;
        }
      });
    default:
      return state;
  }
};

// Filters reducer

const filterReducerDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      };
      case 'SET_END_DATE':
        return {
          ...state,
          endDate: action.date
        };
    default:
      return state
  }
}

// timestamps (miliseconds)
// January 1ste 1970 = unit epoch
// 32344, 12, -87654

// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((ex) => {
    const startDateMatch = typeof startDate !== 'number' || ex.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || ex.createdAt <= endDate;
    const textMatch = ex.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    else if(sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visbleExpenses = getVisibleExpenses(state.expenses, state.filter);
  console.log(visbleExpenses);
});

const expenceOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000}));
const expenceTwo = store.dispatch(addExpense({ description: 'Coffe', amount: 4000, createdAt: -1000 }));
const expenceTree = store.dispatch(addExpense({ description: 'Cat', amount: 900, createdAt: 40 }));

// store.dispatch(removeExpence({ id: expenceOne.expense.id }));

// store.dispatch(editExpense(expenceTwo.expense.id, { amount: 1 }))

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(50));

const demoState = {
  expenses: [{
    id: 'mlqkdjsfqs',
    description: 'January Rentm',
    note: 'This was the final payment',
    amout: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amout', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

// // Object spreader
// const user = {
//   name: 'Jen',
//   age: 23
// };

// console.log({
//   ...user,
//   location: 'Leuven',
//   age: 33
// });