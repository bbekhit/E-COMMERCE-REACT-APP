import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import PropTypes from "prop-types";
import setAuthToken from "../../utilis/setAuthToken";

class ImageUpload extends Component {
  static propTypes = {
    onUpload: PropTypes.func,
    maxFiles: PropTypes.number
  };

  static defaultProps = {
    onUpload: () => {},
    maxFiles: 1
  };

  constructor() {
    super();
    this.state = {
      files: [],
      disabled: false
    };
  }

  onDrop = accepted => {
    const { maxFiles } = this.props;
    const { files, disabled } = this.state;
    let isDisabled = disabled;
    accepted.every(file => {
      if (isDisabled) {
        return false;
      }
      files.push(file);
      this.setState({ files });
      this.uploadImage(file);
      if (files.length >= maxFiles) {
        isDisabled = true;
        this.setState({ disabled: true });
      }

      return true;
    });
  };

  uploadImage = file => {
    const { onUpload } = this.props;
    const data = new FormData();
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const url =
      "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    delete axios.defaults.headers.common["Authorization"];
    axios
      .post(url, data)
      .then(res => {
        if (res.data.secure_url !== "") {
          onUpload(res.data.secure_url);
        }
      })
      .catch(err => {
        console.log(err);
      });
    setAuthToken(localStorage.jwtToken);
  };

  render() {
    const { files, disabled } = this.state;
    const { maxFiles } = this.props;
    const howMuchLeft = maxFiles - files.length;
    const defaultMessage = `Attach files by dropping here, or click to select files to upload. Only <b>${howMuchLeft}</b> 
    ${!howMuchLeft || howMuchLeft > 1 ? "images" : "image"} will be accepted`;
    const disabledMessage = "Sorry, you Can't add images any more";

    return (
      <div className="dropzone clear">
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) =>
            this.onDrop(acceptedFiles, rejectedFiles)
          }
          accept="image/*"
          disabled={this.state.disabled}
          className={`drop-zone ${disabled ? "disabled" : null}`}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                className={`drop-zone-container ${disabled ? "error" : null}`}
              >
                <input {...getInputProps()} />
                <i className="fas fa-plus-circle"></i>
                <p
                  dangerouslySetInnerHTML={{
                    __html: disabled ? disabledMessage : defaultMessage
                  }}
                />
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default ImageUpload;
