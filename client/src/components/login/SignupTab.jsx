import React, { Component } from "react";
import { CardBody, Form, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import ServerMessage from "./ServerMessage";
import ValidationMessages from "./ValidationMessages";
import makeApiRequest from "../../utils/makeApiRequest";
import OtpField from "./OtpField";

class SignupTab extends Component {
  state = {
    step: "signup",
    submitButtonDisabled: false,
    validationMessagesComponent: false,
    validations: [false, false, false, false]
  };

  submitHandler = async e => {
    e.preventDefault();
    this.setState({ submitButtonDisabled: true });
    const { step } = this.state;
    const { email, password, otp } = this.props;

    // otp submit
    if (step === "otp") {
      const otpResponse = await makeApiRequest(
        "POST",
        "api/v1/user/verifyotp",
        false,
        {
          email,
          otp
        }
      );

      if (!otpResponse.error) {
        localStorage.setItem("jwt", otpResponse.response.jwt);
        this.props.history.push("/");
        return;
      }

      this.props.handleInputChange("signupServerMessage", otpResponse.message);
      this.setState({ submitButtonDisabled: false });
      return;
    }

    // signup submit
    const validations = [false, false, false, false];

    const upperCaseRe = /[A-Z]/;
    const lowerCaseRe = /[a-z]/;
    const numberRe = /\d/;

    validations[0] = password.length >= 8;
    validations[1] = upperCaseRe.test(password);
    validations[2] = lowerCaseRe.test(password);
    validations[3] = numberRe.test(password);

    if (validations.includes(false)) {
      // one of the validations failed
      this.setState({
        submitButtonDisabled: false,
        validationMessagesComponent: true,
        validations
      });
      return;
    }

    const signupResponse = await makeApiRequest(
      "POST",
      "api/v1/user/signup",
      false,
      {
        email,
        password
      }
    );

    if (!signupResponse.error) {
      this.setState({ step: "otp" });
    }

    this.props.handleInputChange("signupServerMessage", signupResponse.message);
    this.setState({ submitButtonDisabled: false });
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
      step,
      submitButtonDisabled,
      validationMessagesComponent,
      validations
    } = this.state;
    const { email, password, otp, serverMessage } = this.props;
    return (
      <CardBody>
        <div className="padded-card-body">
          <Form onSubmit={this.submitHandler}>
            {step === "signup" && (
              <>
                <EmailField
                  email={email}
                  handleInputChange={this.handleInputChange}
                />
                <br />
                <PasswordField
                  password={password}
                  handleInputChange={this.handleInputChange}
                />
              </>
            )}
            {step === "otp" && (
              <OtpField otp={otp} handleInputChange={this.handleInputChange} />
            )}
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

export default withRouter(SignupTab);
