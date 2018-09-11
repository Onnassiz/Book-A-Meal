import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteFromCart, updateCart, emptyCart, setCartState } from '../../reducer/cart/actionsDispatcher';
import { postOrder, updateOrder } from '../../reducer/orders/actionsDispatcher';
import Cart from '../presentation/Cart';

const mapStateToProps = state => ({
  orders: state.orders,
  cart: state.cart,
  user: state.user,
  formState: state.formState,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postOrder,
    updateOrder,
    emptyCart,
    updateCart,
    setCartState,
    deleteFromCart,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
