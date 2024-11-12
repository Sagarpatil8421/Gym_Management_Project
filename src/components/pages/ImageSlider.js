import React from 'react';
import './ImageSlider.css';

const images = [
  '/img/img1.jpg', 
  '/img/img2.jpg', 
  '/img/img3.jpg',
  '/img/img4.jpg',
  '/img/img5.jpg',
//   '/img/img6.jpg',
  '/img/img7.jpg',
  '/img/img8.jpg',
  '/img/img9.jpg',
  '/img/img10.jpg',
  '/img/img11.jpg',
  '/img/img12.jpg',
  '/img/img13.jpg',
  '/img/img14.jpg',
];

const ImageSlider = () => {
  return (
    <div className="slider-container">
      <h2 className="slider-headline">The Path to Health & Happiness Starts Here</h2>
      <div className="image-slider">
        <div className="slider-track">
          {/* First set of images */}
          {images.map((img, index) => (
            <div key={index} className="slider-image-container">
              <img src={img} alt={`Slide ${index}`} className="slider-image" />
            </div>
          ))}
          {/* Second set of images for seamless looping */}
          {images.map((img, index) => (
            <div key={`clone-${index}`} className="slider-image-container">
              <img src={img} alt={`Clone ${index}`} className="slider-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
