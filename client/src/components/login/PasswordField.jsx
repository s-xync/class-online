import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const PasswordField = ({ password, handleInputChange }) => (
  <FormGroup>
    <Label className="input-label">Password</Label>
    <Input
      type="password"
      name="password"
      className="input-field"
      placeholder="Please enter your password"
      value={password}
      onChange={e => handleInputChange(e.target.name, e.target.value)}
      required
    />
  </FormGroup>
);

export default PasswordField;
