import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import image1 from '../../../../assets/images/homeSlider/image_1.jpg';
import image2 from '../../../../assets/images/homeSlider/image_2.jpg';
import image3 from '../../../../assets/images/homeSlider/image_3.jpg';
import image4 from '../../../../assets/images/homeSlider/image_4.jpg';

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
				original: image3,
			},
			{
				original: image2,
			},
			{
				original: image1,
			},
			{
				original: image4,
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
					showPlayButton={false}
				/>
			</div>
		);
	}
}

export default ImageSlider;
