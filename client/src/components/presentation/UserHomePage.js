import React, { Component } from 'react';
import ImageSlider from './partials/ImageSlider';


class UserHomePage extends Component {
  render() {
    return (
			<div>
				<ImageSlider />
				<div id="content3">
					<div className="col-12">
						<div className="about">
							<h1>About</h1>
							<p>
                From humble beginnings in a Danish basement in 2001,
                Just Eat today operates in 12 markets across the globe.
                We are a leading global marketplace for online food
                delivery, providing customers with an easy and secure way
								to order and pay for food from our
                Restaurant Partners.
							</p>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default UserHomePage;
