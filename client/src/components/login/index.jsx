import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  Card
} from "reactstrap";
import classnames from "classnames";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";

import "./styles/styles.css";

class Login extends Component {
  state = {
    activeTab: "login",
    email: "",
    password: "",
    otp: "",
    loginServerMessage: "",
    signupServerMessage: ""
  };

  componentDidMount() {
    if (this.props.match.path.includes("signup")) {
      this.setState({ activeTab: "" });
    }

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.props.history.push("/");
    }
  }

  tabClickHandler = tabKey => {
    this.props.history.push(`/${tabKey}`);
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      email,
      password,
      otp,
      loginServerMessage,
      signupServerMessage
    } = this.state;
    const activeTab = this.props.match.path.includes("signup")
      ? "signup"
      : "login";
    return (
      <div className="background-image">
        <Row>
          <Col md="6" sm="12">
            <Row>
              <Col sm="1"></Col>
              <Col sm="11">
                <div className="signup-box">
                  <h1 className="text-center brand-name">ClassOnline</h1>
                  <br />
                  <Card>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "login"
                          })}
                          onClick={() => this.tabClickHandler("login")}
                        >
                          Log In
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "signup"
                          })}
                          onClick={() => this.tabClickHandler("signup")}
                        >
                          Sign Up
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="login">
                        <LoginTab
                          handleInputChange={this.handleInputChange}
                          email={email}
                          password={password}
                          serverMessage={loginServerMessage}
                        />
                      </TabPane>
                      <TabPane tabId="signup">
                        <SignupTab
                          handleInputChange={this.handleInputChange}
                          email={email}
                          password={password}
                          otp={otp}
                          serverMessage={signupServerMessage}
                        />
                      </TabPane>
                    </TabContent>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
