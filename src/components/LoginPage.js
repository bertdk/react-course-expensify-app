import React from 'react';
import {connect} from 'react-redux'
import { startLogin } from "../actions/auth";

export const Login = ({startLogin}) => (
  <div>
    <h1>Login to use the app</h1>
    <button onClick={startLogin}>Login</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);