import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postProfile, getProfile, updateProfile, putImage } from '../../reducer/profile/actionsDispatcher';
import Profile from '../presentation/Profile';

export const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  formState: state.formState,
});


export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateProfile,
    postProfile,
    putImage,
    getProfile,
  }, dispatch);
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
