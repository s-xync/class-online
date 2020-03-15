import React, { Component } from "react";
import { Container } from "reactstrap";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

class CurrentVideoPlayer extends Component {
  render() {
    const { currentVideo } = this.props;
    console.log({ currentVideo });
    return (
      <Container className="mt-5">
        <Player playsInline src={currentVideo.location}>
          <BigPlayButton position="center" />
        </Player>
        <h2 className="current-video-name">{currentVideo.fileName}</h2>
      </Container>
    );
  }
}

export default CurrentVideoPlayer;
