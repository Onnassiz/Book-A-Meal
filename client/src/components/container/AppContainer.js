import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../reducer/user/action';
import App from '../presentation/App';

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setUser,
	}, dispatch);
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(App));
