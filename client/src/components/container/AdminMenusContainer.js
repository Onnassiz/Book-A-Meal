import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile } from '../../reducer/profile/actions';
import { getMeals } from '../../reducer/meals/actions';
import { postMenu, getUserMenus, deleteMenuById, updateMenu, getMealsInMenu } from '../../reducer/menus/actions';
import AdminMenus from '../presentation/AdminMenus';

const mapStateToProps = state => ({
  menus: state.menus,
  meals: state.meals,
  user: state.user,
  profile: state.profile,
  formState: state.formState,
});

function mapDispatchToProps(dispatch) {
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
