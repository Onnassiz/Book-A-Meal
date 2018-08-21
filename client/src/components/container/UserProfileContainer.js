import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserProfile from '../presentation/UserProfile';

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
