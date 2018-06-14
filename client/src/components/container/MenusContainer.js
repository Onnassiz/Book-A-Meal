import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMenusByUnixTime } from '../../reducer/menus/action';
import Menus from '../presentation/Menus';

const mapStateToProps = (state) => {
	return {
		menus: state.menus,
		user: state.user,
		formState: state.formState,
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getMenusByUnixTime,
	}, dispatch);
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(Menus));
