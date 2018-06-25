import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteFromCart, updateCart, emptyCart } from '../../reducer/cart/actions';
import { postOrder } from '../../reducer/orders/actions';
import Cart from '../presentation/Cart';

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    cart: state.cart,
    user: state.user,
    formState: state.formState,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postOrder,
    emptyCart,
    updateCart,
    deleteFromCart,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart));
