import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../presentation/Profile';

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
)(Profile);
