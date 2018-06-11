import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile } from '../../reducer/profile/action';
import { getMeals } from '../../reducer/meals/action';
import { postMenu, getUserMenus, deleteMenuById, updateMenu } from '../../reducer/menus/action';
import AdminMenus from '../presentation/AdminMenus';

const mapStateToProps = (state) => {
	return {
		menus: state.menus,
		meals: state.meals,
		user: state.user,
		profile: state.profile,
		formState: state.formState,
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		postMenu,
		deleteMenuById,
		getUserMenus,
		getMeals,
		getProfile,
		updateMenu,
	}, dispatch);
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(AdminMenus));
