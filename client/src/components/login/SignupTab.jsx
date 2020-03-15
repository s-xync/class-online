import React, { Component } from "react";
import { CardBody, Form, Button } from "reactstrap";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import ServerMessage from "./ServerMessage";

class SignupTab extends Component {
  state = {
    submitButtonDisabled: false
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("hi");
    this.setState({ submitButtonDisabled: true });
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
              handleInputChange={this.props.handleInputChange}
            />
            <br />
            <PasswordField
              password={password}
              handleInputChange={this.props.handleInputChange}
            />
            <br />
            <div className="submit-button-outer">
              <Button
                className="submit-button"
                size="lg"
                disabled={submitButtonDisabled}
              >
                SIGN UP
              </Button>
            </div>
            {serverMessage && <ServerMessage serverMessage={serverMessage} />}
          </Form>
        </div>
      </CardBody>
    );
  }
}

export default SignupTab;
