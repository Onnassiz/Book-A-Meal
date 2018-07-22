import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import image1 from '../../../../assets/images/homeSlider/image_1.jpg';
import image2 from '../../../../assets/images/homeSlider/image_2.jpg';
import image3 from '../../../../assets/images/homeSlider/image_3.jpg';
import image4 from '../../../../assets/images/homeSlider/image_4.jpg';
import image5 from '../../../../assets/images/homeSlider/image_5.jpg';

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
