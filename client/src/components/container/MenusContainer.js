import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMealsInDailyMenu } from '../../reducer/menus/actionsDispatcher';
import { deleteFromCart, addToCart, updateCart, emptyCart } from '../../reducer/cart/actionsDispatcher';

import Menus from '../presentation/Menus';

const mapStateToProps = state => ({
  menus: state.menus,
  cart: state.cart,
  orders: state.orders,
  user: state.user,
  formState: state.formState,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToCart,
    updateCart,
    emptyCart,
    deleteFromCart,
    getMealsInDailyMenu,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menus));
