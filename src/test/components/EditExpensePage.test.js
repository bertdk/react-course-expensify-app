import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses'
import { EditExpensePage } from '../../components/EditExpense';

let editExpense, removeExpence, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpence = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpence={removeExpence}
      history={history}
      expense={expenses[2]}
    />);
});

test('should render EditExpense correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpence).toHaveBeenLastCalledWith({
    id: expenses[2].id
  });
});