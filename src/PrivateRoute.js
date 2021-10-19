import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

import React, { Component } from 'react';


@inject("authStore")
class PrivateRoute extends Component {
  render() {
    const {component: Component, ...rest} = this.props;
    return (
      <Route {...rest} render={routeProps => !!this.props.authStore.currentUser ? (<Component {...routeProps}/>) : (<Redirect to="/signin"/>)} />
    );
  }
}

export default PrivateRoute;