import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { setLoading } from '../../reducer/formState/action';
import { postUser, signInUser } from '../../reducer/user/action';
import Home from '../presentation/Home';

const mapStateToProps = (state) => {
	return {
		formState: state.formState,
		user: state.user,
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setLoading,
		postUser,
		signInUser,
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home);
