import { Component } from "react";
import "./Layout.scss";

class Layout extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let { children } = this.props;
    return (
      <div className="layout-main">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Layout;