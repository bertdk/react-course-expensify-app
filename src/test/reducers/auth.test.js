import authReducer from '../../reducers/auth';

test('reducer should login', () => {
  const action = {
    type: 'LOGIN',
    uid: 1
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test('reducer should logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({uid: 1}, action);
  expect(state).toEqual({});
});