import * as React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../reducer/user/user';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

interface Props {
  authorizationStatus: string;
  exact: boolean;
  path: string;
  render: (props: React.ReactPropTypes) => void;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={ (routeProps) => {
        if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
          routeProps.history.push(path);
        }
        return authorizationStatus === AuthorizationStatus.NO_AUTH ? <Redirect to="/login" /> : render(routeProps);
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
