import React, { Component } from 'react';
import empty from 'is-empty';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BasicInput } from '../presentation/form/BasicInput';
import SubmitButton from '../presentation/form/SubmitButton';
import { validateSignUp, validateSignIn } from '../../utilities/validateAuthForms';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.match.params.type,
      checked: false,
      isSignIn: false,
      fullName: '',
      signUpEmail: '',
      signInEmail: '',
      signInPassword: '',
      password: '',
      role: '',
      confirm_password: '',
      signUpErrors: {},
      signInErrors: {},
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheckBoxChange(e) {
    this.setState({
      checked: !this.state.checked,
    });

    const { value } = e.target;
    this.setState({ role: value });
  }

  isValid() {
    this.setState({ signUpErrors: {} });
    const { errors, isValid } = validateSignUp(this.state);
    if (!isValid) {
      this.setState({ signUpErrors: errors });
    }
    return isValid;
  }

  isValidSignIn() {
    this.setState({ signInErrors: {} });
    const { errors, isValid } = validateSignIn(this.state);
    if (!isValid) {
      this.setState({ signInErrors: errors });
    }
    return isValid;
  }

  toggleIsSignIn(val) {
    this.setState({ isSignIn: val });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleIsSignIn(false);
    if (this.isValid()) {
      const formData = {
        fullName: this.state.fullName,
        email: this.state.signUpEmail,
        password: this.state.password,
      };

      if (this.state.checked) {
        formData.role = this.state.role;
      }

      const { postUser } = this.props;
      postUser(formData);
    }
  }

  handleSignInSubmit(e) {
    this.toggleIsSignIn(true);
    e.preventDefault();
    if (this.isValidSignIn()) {
      const formData = {
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      };

      const { signInUser } = this.props;
      signInUser(formData);
    }
  }

  changeAuthType(type) {
    const { history } = this.props;
    this.setState({ type });
    history.push(`/auth/${type}`);
  }

  render() {
    const { user, formState } = this.props;
    return (
      <div>
        <div id="content3">
          <div className="col-12">
            <Link className="main" to="/"><button className="button-white">Home</button></Link>
            <div id="authSection">
              {this.state.type === 'login' ?
              <div className="box-menu">
                <h3>Sign In</h3>
                <div className="show-errors">
                  <ul>
                    {Object.keys(this.state.signInErrors).map(item => <li key={item}>{this.state.signInErrors[item]}</li>)}
                    {empty(user.signInErrors) ? '' : Object.keys(user.signInErrors).map(item => <li key={item}>{user.signInErrors[item]}</li>)}
                  </ul>
                </div>
                <form onSubmit={this.handleSignInSubmit}>
                  <BasicInput name="signInEmail" type="text" label="Email" value={this.state.signInEmail} onChange={this.onChange} hasError={this.state.signInErrors.signInEmail !== undefined} />
                  <BasicInput name="signInPassword" type="password" label="Password" value={this.state.signInPassword} onChange={this.onChange} hasError={this.state.signInErrors.signInPassword !== undefined} />
                  <div id="forgotPassword">
                    <a href="#">Forgot Password?</a>
                  </div>
                  <SubmitButton value="Sign In" isLoading={formState.isLoading} />
                </form>
              </div> :
              <div className="box-menu">
                  <h3>Sign Up</h3>
                  <div className="show-errors">
                    <ul>
                      {Object.keys(this.state.signUpErrors).map(item => <li key={item}>{this.state.signUpErrors[item]}</li>)}
                      {empty(user.signUpErrors) ? '' : Object.keys(user.signUpErrors).map(item => <li key={item}>{user.signUpErrors[item]}</li>)}
                    </ul>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <BasicInput name="fullName" type="text" label="Full Name" value={this.state.fullName} onChange={this.onChange} hasError={this.state.signUpErrors.fullName !== undefined} />
                    <BasicInput name="signUpEmail" type="text" label="Email" value={this.state.signUpEmail} onChange={this.onChange} hasError={this.state.signUpErrors.signUpEmail !== undefined} />
                    <BasicInput name="password" type="password" label="Password" value={this.state.password} onChange={this.onChange} hasError={this.state.signUpErrors.password !== undefined} />
                    <BasicInput name="confirm_password" type="password" label="Confirm Password" value={this.state.confirm_password} onChange={this.onChange} hasError={this.state.signUpErrors.confirm_password !== undefined} />
                    <div id="signUpAsAdmin">
                      <label className="checkbox">
                        Sign up as Caterer
											<input value="caterer" onChange={this.onCheckBoxChange} checked={this.state.checked} type="checkbox" /><span className="check" />
                      </label>
                    </div>
                    <SubmitButton value="Sign Up" isLoading={formState.isLoading && this.state.isSignIn} />
                  </form>
              </div>}

              <div style={{ clear: 'both', marginTop: 50, textAlign: 'center' }}>
                <hr />
                { this.state.type === 'login' ?
                  <a style={{ fontSize: 17 }} onClick={() => this.changeAuthType('register')}><i className="ion-person-add" /> Register</a> :
                  <a style={{ fontSize: 17 }} onClick={() => this.changeAuthType('login')}><i className="ion-log-in" /> Login</a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  signInUser: PropTypes.func.isRequired,
  postUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
};


export default Home;
