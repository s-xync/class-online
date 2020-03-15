import React, { Component } from "react";
import {
  Form,
  Input,
  Label,
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  FormText
} from "reactstrap";
import { withRouter } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import makeApiRequest from "../../utils/makeApiRequest";

class VideoUploader extends Component {
  state = {
    file: null,
    fileName: "Choose video...",
    customFileName: "",
    uploadProgress: false,
    uploadButtonDisabled: false,
    uploadPercentage: 0,
    uploadDone: false,
    userMessage: "",
    userMessageColor: "danger"
  };

  onVideoChange = e => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      this.setState({ file, fileName: file.name, customFileName: "" });
    } else {
      this.setState({
        file: null,
        fileName: "Choose video...",
        customFileName: ""
      });
    }
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };
  uploadProgressEventHandler = progressEvent => {
    this.setState({
      uploadPercentage: Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
    });
  };

  handleUploadVideo = async e => {
    e.preventDefault();
    this.setState({ uploadButtonDisabled: true });
    const { file, customFileName } = this.state;
    if (!file) {
      this.setState({ uploadButtonDisabled: false });
      return;
    }

    this.setState({
      uploadProgress: true,
      userMessage: "Please wait... upload video in progress...",
      userMessageColor: "success"
    });

    const fileUploadResponse = await makeApiRequest(
      "POST",
      "api/v1/video/upload",
      true,
      { file, customFileName },
      true,
      this.uploadProgressEventHandler
    );

    if (fileUploadResponse.logout) {
      this.props.history.push("/");
    }

    if (fileUploadResponse.error) {
      this.setState({
        userMessage: fileUploadResponse.message,
        userMessageColor: "danger"
      });
    } else {
      this.setState({ userMessage: fileUploadResponse.message });
      this.props.changeRootState("videos", fileUploadResponse.response.videos);
      this.props.changeRootState(
        "currentVideo",
        fileUploadResponse.response.video
      );
    }

    this.setState({ uploadButtonDisabled: false, uploadDone: true });
  };

  render() {
    const {
      fileName,
      customFileName,
      uploadProgress,
      uploadDone,
      uploadButtonDisabled,
      uploadPercentage,
      userMessage,
      userMessageColor
    } = this.state;
    return (
      <Container className="video-uploader mt-5">
        <Form onSubmit={this.handleUploadVideo}>
          <Row>
            <Col md="5" sm="12">
              <div className="custom-file">
                <FormGroup>
                  <Input
                    type="file"
                    className="custom-file-input"
                    id="videoFile"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={this.onVideoChange}
                  />
                  <Label className="custom-file-label" for="videoFile">
                    {fileName}
                  </Label>
                </FormGroup>
              </div>
            </Col>
            <Col md="4" sm="8">
              <Input
                type="text"
                name="customFileName"
                value={customFileName}
                onChange={e =>
                  this.handleInputChange(e.target.name, e.target.value)
                }
                placeholder="Custom file name if any..."
              />
            </Col>
            <Col md="3" sm="4">
              <Button
                type="submit"
                className="upload-button"
                disabled={uploadButtonDisabled}
              >
                Upload Lecture
              </Button>
            </Col>
          </Row>
          {userMessage && (
            <>
              <br />
              <FormText color={userMessageColor} className="text-center">
                {userMessage}
              </FormText>
            </>
          )}
        </Form>
        {uploadProgress && (
          <>
            <br />
            <ProgressBar
              percentage={uploadPercentage}
              uploadDone={uploadDone}
            />
          </>
        )}
      </Container>
    );
  }
}

export default withRouter(VideoUploader);
