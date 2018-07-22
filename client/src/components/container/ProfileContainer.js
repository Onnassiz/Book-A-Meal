import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postProfile, getProfile, updateProfile, putImage } from '../../reducer/profile/actions';
import Profile from '../presentation/Profile';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    formState: state.formState,
  };
};


function mapDispatchToProps(dispatch) {
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
