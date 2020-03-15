import React, { Component } from "react";
import { CardBody, Form, Button } from "reactstrap";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import ServerMessage from "./ServerMessage";
import ValidationMessages from "./ValidationMessages";

class SignupTab extends Component {
  state = {
    submitButtonDisabled: false,
    validationMessagesComponent: false,
    validations: [false, false, false, false]
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("hi");
    this.setState({ submitButtonDisabled: true });
    const { email, password } = this.props;

    const validations = [false, false, false, false];

    const upperCaseRe = /[A-Z]/;
    const lowerCaseRe = /[a-z]/;
    const numberRe = /\d/;

    validations[0] = password.length >= 8;
    validations[1] = upperCaseRe.test(password);
    validations[2] = lowerCaseRe.test(password);
    validations[3] = numberRe.test(password);

    if (validations.includes(false)) {
      this.setState({
        submitButtonDisabled: false,
        validationMessagesComponent: true,
        validations
      });
      return;
    }
  };

  handleInputChange = (name, value) => {
    if (this.state.validationMessagesComponent) {
      this.setState({ validationMessagesComponent: false });
    }
    this.props.handleInputChange(name, value);
  };

  validationMessages = [
    "Password should be min 8 chars",
    "At least 1 uppercase letter [A-Z]",
    "At least 1 lowercase letter [a-z]",
    "At least 1 numeric char [0-9]"
  ];

  render() {
    const {
      submitButtonDisabled,
      validationMessagesComponent,
      validations
    } = this.state;
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
            {!validationMessagesComponent && (
              <div className="submit-button-outer">
                <Button
                  className="submit-button"
                  size="lg"
                  disabled={submitButtonDisabled}
                >
                  SIGN UP
                </Button>
              </div>
            )}
            {validationMessagesComponent && (
              <ValidationMessages
                validationMessages={this.validationMessages}
                validations={validations}
              />
            )}
            {serverMessage && <ServerMessage serverMessage={serverMessage} />}
          </Form>
        </div>
      </CardBody>
    );
  }
}

export default SignupTab;
