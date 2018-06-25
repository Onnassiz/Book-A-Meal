import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMenusByUnixTime } from '../../reducer/menus/actions';
import { addToCart, deleteFromCart } from '../../reducer/cart/actions';
import Menus from '../presentation/Menus';

const mapStateToProps = (state) => {
  return {
    menus: state.menus,
    cart: state.cart,
    orders: state.orders,
    user: state.user,
    formState: state.formState,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToCart,
    deleteFromCart,
    getMenusByUnixTime,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menus));
