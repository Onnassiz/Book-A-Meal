import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../reducer/user/actionsDispatcher';
import App from '../presentation/App';
import { deleteFromCart, addToCart, updateCart, emptyCart } from '../../reducer/cart/actionsDispatcher';

export const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser,
    addToCart,
    updateCart,
    deleteFromCart,
    emptyCart,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
