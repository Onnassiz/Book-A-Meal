import React, { Component } from 'react';
import ImageSlider from './partials/ImageSlider';
import homeImage1 from '../../../assets/images/home_1.jpg';
import homeImage2 from '../../../assets/images/home_2.jpg';
import homeImage3 from '../../../assets/images/home_3.jpg';


class UserHomePage extends Component {
  render() {
    return (
			<div>
				<ImageSlider />
				<div id="content-body">
					<div className="col-12">
						<div className="col-6 about">
							<div className="text">
								<h1>The Game</h1>
								<p>
									From humble beginnings in a Danish basement in 2001,
									Just Eat today operates in 12 markets across the globe.
									We are a leading global marketplace for online food
									delivery, providing customers with an easy and secure way
									to order and pay for food from our
									Restaurant Partners.
								</p>
								<p>
									We wish to provide a one-of-a-kind experience that
									energizes everyone with an enthusiastic welcome,
									exceptional service, awesome food, killer tunes,
									and an unforgettable time.
								</p>
							</div>
						</div>
						<div className="col-6 about">
							<img src={homeImage1} alt="home_1" />
							<div className="centered">We offer discount on family deals.</div>
						</div>
					</div>
					<div className="col-12" style={{ marginTop: 45 }}>
						<div className="col-6 about">
							<img src={homeImage3} alt="home_2" />
							<div className="centered">Secure Payment</div>
						</div>
						<div className="col-6 about">
							<div className="text">
								<h1>Payment Options</h1>
								<p>
									We have a secure and seamless online payment platform.
									We have taken adequate measures to ensure your payment is secure.
									You can that transaction details will always be protected.
								</p>
								<p>
									We also support online back transfer and payment on delivery. Cash or POS payment can be accepted on delivery.
								</p>
							</div>
						</div>
					</div>
					<div className="col-12" style={{ marginTop: 45 }}>
						<div className="col-6 about">
							<div className="text">
								<h1>Our Delivery</h1>
								<p>
									We ensure your meal orders are delivered effectively.
									You can rely that your meal will be delivered within an an hour and is
									delivered preserved. This is because we dispatch your meal orders from the restaurants closest to you.
									You can track the delivery progress of your order and
									even speak with the delivery agent at anytime.
								</p>
								<p>
									Because we want to give you the best experience,
									your orders can be eligible for free delivery.
									You get a free delivery on your first 3 others and on
									orders worth &#8358;5,000 and above.
								</p>
							</div>
						</div>
						<div className="col-6 about">
							<img src={homeImage2} alt="home_2" />
							<div className="centered">Reliable Delivery</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default UserHomePage;
