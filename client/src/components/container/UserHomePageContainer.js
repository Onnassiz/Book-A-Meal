import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserHomePage from '../presentation/UserHomePage';

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UserHomePage);
