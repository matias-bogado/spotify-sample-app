import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';

import Layout from '../../components-core/Layout';

// import { authenticationLogoutRequest } from '../../redux/actions/authenticationActions';

import './Home.scss';

class Home extends React.PureComponent {
  static propTypes = {
    authenticationLogout: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    userPlacesData: PropTypes.object.isRequired // Immutable
  };

  render() {
    return (
      <div className="page-home">
        <Layout>
          <Typography type="body1" component="p">
            You don't have any playlist yet
          </Typography>
        </Layout>
      </div>
    );
  }

}
//
// function mapStateToProps(storeState) {
//   return {
//     userPlacesData: storeState.userPlacesData,
//     authenticationLogout: storeState.authenticationLogout
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     logout: () => dispatch(authenticationLogoutRequest())
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
