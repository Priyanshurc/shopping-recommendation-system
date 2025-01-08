import React from "react";
import Slider from "react-slick";

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
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "50px" }}>
      <Slider {...settings}>
        <div style={{ backgroundColor: "green", color: "white", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h3>Slide 1</h3>
        </div>
        <div style={{ backgroundColor: "green", color: "white", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h3>Slide 2</h3>
        </div>
        <div style={{ backgroundColor: "green", color: "white", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h3>Slide 3</h3>
        </div>
        <div style={{ backgroundColor: "green", color: "white", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h3>Slide 4</h3>
        </div>
        <div style={{ backgroundColor: "green", color: "white", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h3>Slide 5</h3>
        </div>
        <div style={{ backgroundColor: "green", color: "white", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h3>Slide 6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default PauseOnHover;
