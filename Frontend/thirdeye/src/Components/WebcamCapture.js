import React, { useState } from "react";
import Webcam from "react-webcam";
// import img from "./images/carImage.png";
const axios = require("axios");

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = () => {
  const [file, setFile] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      sendImage(imageSrc);
    }
    sendImage();
  }, [webcamRef]);

  const sendImage = image65 => {
    const formData = new FormData();
    let imageJ = new Image();
    imageJ.src = image65;
    formData.append("image", imageJ);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("https://third-eye-number-plate.herokuapp.com/upload", formData)
      .then(res => res.data)
      .then(json => console.log(json))
      .catch(error => {
        console.log(error);
      });
  };

  function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("https://third-eye-number-plate.herokuapp.com/upload", formData)
      .then(res => res.data)
      .then(json => console.log(json))
      .catch(error => {
        console.log(error);
      });
  }
  function onChange(e) {
    // this.setState({file:e.target.files[0]});
    setFile(e.target.files[0]);
  }

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      <br />
      <hr />
      <form onSubmit={onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default WebcamCapture;
