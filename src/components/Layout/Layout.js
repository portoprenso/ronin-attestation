import React, { Component } from 'react';

class Layout extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    let {children} = this.props
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default Layout;