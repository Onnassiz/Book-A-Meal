import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../reducer/user/actions';
import App from '../presentation/App';
import { getMenusByUnixTime } from '../../reducer/menus/actions';
import { deleteFromCart, addToCart, updateCart, emptyCart } from '../../reducer/cart/actions';

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  menus: state.menus,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser,
    addToCart,
    updateCart,
    deleteFromCart,
    emptyCart,
    getMenusByUnixTime,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
