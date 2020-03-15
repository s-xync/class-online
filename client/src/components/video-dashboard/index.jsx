import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import makeApiRequest from "../../utils/makeApiRequest";
import Header from "./Header";

import "./styles/styles.css";

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

  getAllVideos = async () => {
    const videosResponse = await makeApiRequest(
      "GET",
      "api/v1/video/videos",
      true
    );
    if (videosResponse.logout) {
      this.props.history.push("/login");
      return;
    }
    console.log(videosResponse.response);
  };

  render() {
    return <Header />;
  }
}

export default withRouter(VideoDashboard);
