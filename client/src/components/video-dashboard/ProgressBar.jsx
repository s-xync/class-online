import React from "react";
import { Progress } from "reactstrap";
import PropTypes from "prop-types";

const ProgressBar = ({ percentage, uploadDone }) => {
  return (
    <>
      <Progress
        animated={!uploadDone}
        striped={uploadDone}
        color="success"
        value={percentage}
      >
        {percentage}%
      </Progress>
    </>
  );
};

export default ProgressBar;
