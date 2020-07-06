// Higher Order Component (HOC) = a component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The infot is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info please dont share</p>}
      <WrappedComponent {...props} />
    </div>
  )
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated 
        ? <WrappedComponent {...props}/>
        : <p>Please log in</p>}
    </div>
  )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="this si the ddetails" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));