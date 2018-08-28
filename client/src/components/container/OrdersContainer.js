import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Orders from '../presentation/Orders';
import { getUserOrders, getMealsInOrder, setUpdatedOrder } from '../../reducer/orders/actionsDispatcher';
import { addArrayToCart } from '../../reducer/cart/actionsDispatcher';


const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user,
  profile: state.profile,
  formState: state.formState,
});


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserOrders,
    getMealsInOrder,
    setUpdatedOrder,
    addArrayToCart,
  }, dispatch);
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders));
