import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteFromCart, updateCart } from '../../reducer/cart/action';
import Cart from '../presentation/Cart';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    formState: state.formState,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCart,
    deleteFromCart,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart));
