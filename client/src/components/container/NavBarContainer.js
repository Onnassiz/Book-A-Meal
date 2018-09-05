import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavBar from '../presentation/layout/NavBar';

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
)(NavBar);
