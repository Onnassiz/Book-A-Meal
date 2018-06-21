import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMenusByUnixTime } from '../../reducer/menus/action';
import { addToCart, deleteFromCart } from '../../reducer/cart/action';
import Menus from '../presentation/Menus';

const mapStateToProps = (state) => {
  return {
    menus: state.menus,
    cart: state.cart,
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
