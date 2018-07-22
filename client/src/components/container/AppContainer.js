import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../reducer/user/actions';
import App from '../presentation/App';
import { getMenusByUnixTime } from '../../reducer/menus/actions';
import { emptyCart } from '../../reducer/cart/actions';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    menus: state.menus,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser,
    emptyCart,
    getMenusByUnixTime,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
