import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLoading } from '../../reducer/formState/actions';
import { postUser, signInUser } from '../../reducer/user/actions';
import Auth from '../presentation/Auth';

const mapStateToProps = (state) => {
  return {
    formState: state.formState,
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setLoading,
    postUser,
    signInUser,
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth));
