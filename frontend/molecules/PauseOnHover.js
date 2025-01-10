import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Use public folder paths
const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
];

const PauseOnHover = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingTop: "50px" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              height: "400px", // Increase height
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                maxWidth: "90%", // Adjust to fit larger size
                maxHeight: "100%",
                objectFit: "cover",
                borderRadius: "12px", // Optional: make corners rounder
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PauseOnHover;
