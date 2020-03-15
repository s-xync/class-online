import React from "react";

const ValidationMessages = ({ validationMessages, validations }) => (
  <div className="validation-messages">
    {validationMessages.map((validationMessage, index) => (
      <div className="validation-message" key={index}>
        <span className="fa-stack" style={{ verticalAlign: "top" }}>
          <i className="fas fa-circle fa-stack-1x"></i>
          {validations[index] ? (
            <i className="fas fa-check-circle fa-stack-1x"></i>
          ) : (
            <i className="fas fa-times-circle fa-stack-1x"></i>
          )}
        </span>
        <p>{validationMessage}</p>
      </div>
    ))}
  </div>
);

export default ValidationMessages;
