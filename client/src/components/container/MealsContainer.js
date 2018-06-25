import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile } from '../../reducer/profile/actions';
import { postMeal, getMeals, updateMeal, deleteMealById, putImage } from '../../reducer/meals/actions';
import Meals from '../presentation/Meals';

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    user: state.user,
    profile: state.profile,
    formState: state.formState,
  };
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMeals,
    postMeal,
    getProfile,
    putImage,
    updateMeal,
    deleteMealById,
  }, dispatch);
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meals));
