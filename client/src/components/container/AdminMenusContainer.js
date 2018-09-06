import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile } from '../../reducer/profile/actionsDispatcher';
import { getMeals } from '../../reducer/meals/actionsDispatcher';
import { postMenu, getUserMenus, deleteMenuById, updateMenu, getMealsInMenu } from '../../reducer/menus/actionsDispatcher';
import AdminMenus from '../presentation/AdminMenus';

export const mapStateToProps = state => ({
  menus: state.menus,
  meals: state.meals,
  user: state.user,
  profile: state.profile,
  formState: state.formState,
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postMenu,
    deleteMenuById,
    getUserMenus,
    getMealsInMenu,
    getMeals,
    getProfile,
    updateMenu,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminMenus));
