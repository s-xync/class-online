import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button } from "reactstrap";

class Header extends Component {
  logoutHandler = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <Container>
          <div className="video-dashboard-header">
            <h2 className="class-name">Example Class</h2>
            <Button
              className="float-right logout-button"
              onClick={this.logoutHandler}
            >
              Logout
            </Button>
          </div>
        </Container>
        <hr className="my-1" />
      </>
    );
  }
}

export default withRouter(Header);
