import React, { Component } from "react";
import { CardBody, Form, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import ServerMessage from "./ServerMessage";
import makeApiRequest from "../../utils/makeApiRequest";

class LoginTab extends Component {
  state = {
    submitButtonDisabled: false
  };

  submitHandler = async e => {
    e.preventDefault();
    this.setState({ submitButtonDisabled: true });
    const { email, password } = this.props;

    // login submit
    const loginResponse = await makeApiRequest(
      "POST",
      "api/v1/user/login",
      false,
      {
        email,
        password
      }
    );

    if (!loginResponse.error) {
      localStorage.setItem("jwt", loginResponse.response.jwt);
      this.props.history.push("/");
      return;
    }

    this.props.handleInputChange("loginServerMessage", loginResponse.message);
    this.setState({ submitButtonDisabled: false });
  };

  handleInputChange = (name, value) => {
    this.props.handleInputChange(name, value);
  };

  render() {
    const { submitButtonDisabled } = this.state;
    const { email, password, serverMessage } = this.props;
    return (
      <CardBody>
        <div className="padded-card-body">
          <Form onSubmit={this.submitHandler}>
            <EmailField
              email={email}
              handleInputChange={this.handleInputChange}
            />
            <br />
            <PasswordField
              password={password}
              handleInputChange={this.handleInputChange}
            />
            <br />
            <div className="submit-button-outer">
              <Button
                className="submit-button"
                size="lg"
                disabled={submitButtonDisabled}
              >
                LOG IN
              </Button>
            </div>
            {serverMessage && <ServerMessage serverMessage={serverMessage} />}
          </Form>
        </div>
      </CardBody>
    );
  }
}

export default withRouter(LoginTab);
