import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const EmailField = ({ email, handleInputChange }) => (
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
      onChange={e => handleInputChange(e.target.name, e.target.value)}
      required
    />
  </FormGroup>
);

export default EmailField;
