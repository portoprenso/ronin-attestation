import React, { Component } from 'react';
import './Layout.scss'

class Layout extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    let {children} = this.props
    return (
      <div className="layout-main">
        {children}
      </div>
    );
  }
}

export default Layout;