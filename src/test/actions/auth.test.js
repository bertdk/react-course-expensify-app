import { login, logout } from "../../actions/auth";

test('action should login', () => {
  const uid = 1;
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('action should logout', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});