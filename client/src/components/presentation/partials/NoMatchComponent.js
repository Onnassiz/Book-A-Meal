import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NoMatchComponent extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    document.title = '404 - Just Eat';
  }

  redirect() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div id="content-body" style={{ marginBottom: 85, top: 20 }}>
        <div>
          <button onClick={this.redirect} className="button">Home</button>
        </div>
        <div id="not-found">
          <h1>404</h1>
          <h3>Page Not Found</h3>
        </div>
      </div>
    );
  }
}

NoMatchComponent.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NoMatchComponent;
