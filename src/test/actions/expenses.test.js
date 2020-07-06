import { addExpense, editExpense, removeExpence } from "../../actions/expenses";

test('should setup remove expense action object', () => {
  const action = removeExpence({id: '123abc'});
  // To equal checks every field of an object <> toBe faalt atlijd met obj
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});

test('should editExpense', () => {
  const action = editExpense('123', {note: 'New note value'});
  expect(action).toEqual({
    type:'EDIT_EXPENSE',
    id: '123',
    update: {
      note: 'New note value'
    }
  })
});

test('should set up 1', () => {
  const expenseDate = {
    description: 'Rent',
    amount: 123,
    createdAt: 1000,
    note: 'Last month'
  };
  const action = addExpense(expenseDate);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseDate,
      id: expect.any(String)
    }
  })
});

test('should set up defaults', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {      
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});