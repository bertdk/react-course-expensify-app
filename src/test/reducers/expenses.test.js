import moment from 'moment';
import expensesReducer from "../../reducers/expenses";
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-123456789'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newExpense = {
    id: '10',
    description: 'Bear',
    note: '',
    amount: 10,
    createdAt: moment(0).subtract(10, 'days').valueOf()
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
  const amount = 999;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    update: {
      amount
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state[0].amount).toBe(amount);
});

test('should not edit an expense', () => {
  const amount = 999;
  const action = {
    type: 'EDIT_EXPENSE',
    id: '23456789',
    update: {
      amount
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const expenses = [{
    id: '33',
    description: 'Foooood',
    note: '',
    amount: 100,
    createdAt: moment(0).subtract(3, 'days').valueOf()
  },{
    id: '44',
    description: 'Fish',
    note: '',
    amount: 190,
    createdAt: moment(0).add(13, 'days').valueOf()
  }];
  const action = {
    type: 'SET_EXPENSES',
    expenses
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses for one of the fixtures', () => {
  const expensesA = [expenses[1]];
  const action = {
    type: 'SET_EXPENSES',
    expenses: expensesA
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expensesA);
});