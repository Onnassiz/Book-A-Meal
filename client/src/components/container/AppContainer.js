import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../reducer/user/action';
import App from '../presentation/App';
import { getMenusByUnixTime } from '../../reducer/menus/action';
import { emptyCart } from '../../reducer/cart/action';


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
