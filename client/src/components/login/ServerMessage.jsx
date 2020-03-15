import React from "react";
import { FormText } from "reactstrap";

const ServerMessage = ({ serverMessage }) => (
  <>
    <br />
    <FormText color="danger" className="text-center">
      {serverMessage}
    </FormText>
  </>
);

export default ServerMessage;
