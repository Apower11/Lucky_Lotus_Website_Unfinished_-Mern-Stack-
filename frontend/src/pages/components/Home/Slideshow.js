import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = (props) => {
  const properties = {
    infinite: true,
    arrows: false,
    duration: 4000,
    pauseOnHover: false,
  };

  return (
    <React.Fragment>
      <div className="slide-container">
        <Fade {...properties}>
          <div className="each-fade">
            <div
              style={{
                background:
                  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('./slideshow-images/slideshow-image-1.jpg')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
              }}
              className="image-container"
            >
              <h2>A Taste of China</h2>
              <p>London's most acclaimed Chinese restaurant.</p>
            </div>
          </div>
          <div className="each-fade">
            <div
              className="image-container"
              style={{
                background:
                  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('./slideshow-images/slideshow-image-2.jpg')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
              }}
            >
              <h2>A Taste of China</h2>
              <p>London's most acclaimed Chinese restaurant.</p>
            </div>
          </div>
          <div className="each-fade">
            <div
              className="image-container"
              style={{
                background:
                  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('./slideshow-images/slideshow-image-3.jpg')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
              }}
            >
              <h2>A Taste of China</h2>
              <p>London's most acclaimed Chinese restaurant.</p>
            </div>
          </div>
          <div className="each-fade">
            <div
              className="image-container"
              style={{
                background:
                  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('./slideshow-images/slideshow-image-4.jpeg')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
              }}
            >
              <h2>A Taste of China</h2>
              <p>London's most acclaimed Chinese restaurant.</p>
            </div>
          </div>
        </Fade>
      </div>
    </React.Fragment>
  );
};

export default Slideshow;
