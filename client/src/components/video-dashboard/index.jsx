import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class VideoDashboard extends Component {
  async componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.props.history.push("/login");
      return;
    }

    // gets videos and if jwt expired, redirects to login page
    await this.getAllVideos();
  }

  getAllVideos = async () => {};

  render() {
    return <h1>Video dashboard</h1>;
  }
}

export default withRouter(VideoDashboard);
