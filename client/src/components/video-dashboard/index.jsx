import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import makeApiRequest from "../../utils/makeApiRequest";
import Header from "./Header";
import VideoUploader from "./VideoUploader";
import CurrentVideoPlayer from "./CurrentVideoPlayer";
import VideosList from "./VideosList";

import "./styles/styles.css";

class VideoDashboard extends Component {
  state = {
    videos: [],
    currentVideo: {}
  };

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
    if (videosResponse.error) {
      return;
    }
    this.setState({ videos: videosResponse.response.videos });
    if (videosResponse.response.videos.length) {
      this.setState({ currentVideo: videosResponse.response.videos[0] });
    }
  };

  changeRootState = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currentVideo, videos, spinner } = this.state;
    return (
      <>
        <Header />
        <VideoUploader changeRootState={this.changeRootState} />
        {currentVideo && currentVideo.location && (
          <CurrentVideoPlayer currentVideo={currentVideo} />
        )}
        <VideosList videos={videos} changeRootState={this.changeRootState} />
      </>
    );
  }
}

export default withRouter(VideoDashboard);
