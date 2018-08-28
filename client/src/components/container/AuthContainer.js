import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postUser, signInUser } from '../../reducer/user/actionsDispatcher';
import Auth from '../presentation/Auth';

const mapStateToProps = state => ({
  formState: state.formState,
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postUser,
    signInUser,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth));
