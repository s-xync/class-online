import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const OtpField = ({ otp, handleInputChange }) => (
  <FormGroup>
    <Label className="input-label">OTP</Label>
    <Input
      type="text"
      name="otp"
      className="input-field"
      placeholder="Please enter OTP send to your email"
      value={otp}
      onChange={e => handleInputChange(e.target.name, e.target.value)}
      required
    />
  </FormGroup>
);

export default OtpField;
