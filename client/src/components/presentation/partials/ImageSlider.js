import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const image1 = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468243/image_1_owy23d.jpg';
const image2 = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468242/image_2_dmtjye.jpg';
const image3 = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468242/image_3_qiux12.jpg';
const image4 = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468243/image_4_ogto3u.jpg';
const image5 = 'https://res.cloudinary.com/onnassiz/image/upload/v1535468244/image_5_ln3fgi.jpg';

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentWillMount() {
    const images = [
      {
        original: image1,
        description: 'We ensure that better food is accessible to everyone.',
      },
      {
        original: image2,
        description: 'We bring warm catering service to your doorstep.',
      },
      {
        original: image3,
        description: 'Let us worry about your diet.',
      },
      {
        original: image4,
        description: 'Our caterers are willing to work on your recipe.',
      },
      {
        original: image5,
        description: 'Many caterers to give you diverse experiences.',
      },
    ];
    this.setState({ images });
  }

  render() {
    return (
      <div id="imageSlider">
        <ImageGallery
          items={this.state.images}
          slideInterval={6000}
          showThumbnails={false}
          autoPlay
          showPlayButton
          showNav={false}
          showBullets
        />
      </div>
    );
  }
}

export default ImageSlider;
