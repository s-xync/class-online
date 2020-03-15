import React, { Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";

class VideosList extends Component {
  render() {
    let { videos } = this.props;
    return (
      <Container className="mt-4">
        {videos.length === 0 && (
          <h1 className="text-center">
            It is empty here. Please upload a video.
          </h1>
        )}

        <Row>
          {videos.map(video => (
            <Col lg="4" md="6" sm="12">
              <Card
                className="video-thumbnail-card"
                onClick={() =>
                  this.props.changeRootState("currentVideo", video)
                }
              >
                <p>{video.fileName}</p>
                <i className="fas fa-play"></i>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default VideosList;
