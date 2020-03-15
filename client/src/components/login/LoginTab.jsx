import React, { Component } from "react";
import { CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

class LoginTab extends Component {
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
    const { email, password } = this.props;
    return (
      <CardBody>
        <div className="padded-card-body">
          <Form onSubmit={this.submitHandler}>
            <FormGroup>
              <Label for="email" className="input-label">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="Please enter your email"
                value={email}
                onChange={e =>
                  this.props.handleInputChange(e.target.name, e.target.value)
                }
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="password" className="input-label">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="input-field"
                placeholder="Please enter your password"
                value={password}
                onChange={e =>
                  this.props.handleInputChange(e.target.name, e.target.value)
                }
              />
            </FormGroup>
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
          </Form>
        </div>
      </CardBody>
    );
  }
}

export default LoginTab;
