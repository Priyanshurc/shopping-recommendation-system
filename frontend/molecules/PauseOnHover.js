import "styles/pauseonhover.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { src: "/images/1.jpg", title: "Cosmetics", subtitle: "Enhance Your Beauty - Top Cosmetics", link: "/cosmetics" },
  { src: "/images/2.jpg", title: "Furniture", subtitle: "Stylish & Durable Furniture for Every Home", link: "/furniture" },
  { src: "/images/computer.jpg", title: "Accessories", subtitle: "Smart Accessories for Your Tech Needs", link: "/computer" },
  { src: "/images/6.jpg", title: "Clothing", subtitle: "Trendy Clothing for All Seasons", link: "/clothing" },
  { src: "/images/phone.jpg", title: "Smartphones", subtitle: "Latest Smartphones at Unbeatable Prices", link: "/phone" },
  { src: "/images/book.jpg", title: "Books", subtitle: "Books That Enlighten and Entertain", link: "/book" },
  { src: "/images/7.jpg", title: "Groceries", subtitle: "Everyday Essentials - Groceries at Your Doorstep", link: "/groceries" },
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
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative", // Ensure this is relative for each slide
              height: "400px", // Adjust height
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", // Hide elements outside the container during animation
              borderRadius: "12px",
            }}
          >
            <a
              href={image.link}
              style={{
                textDecoration: "none",
                display: "block",
                width: "100%",
                height: "100%",
                position: "relative", // Make link element relative
              }}
              className="image-link"
            >
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  transition: "transform 0.5s ease", // Smooth zoom on hover
                }}
                className="image"
              />
              {/* Title */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)", // Subtle shadow for better visibility
                }}
                className="image-title"
              >
                {image.title}
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PauseOnHover;
