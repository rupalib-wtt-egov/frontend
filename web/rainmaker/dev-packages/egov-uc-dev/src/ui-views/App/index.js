import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
// import MainRoutes from "ui-routes";
//import LoadingIndicator from "egov-ui-framework/ui-molecules/LoadingIndicator";
// import Div from "egov-ui-framework/ui-atoms/HtmlElements/Div";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import "./index.scss";

import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";
const Loading = () => <LinearProgress />;

const MainRoutes = Loadable({
  loader: () => import("ui-routes"),
  loading: () => <Loading />
});
const Div = Loadable({
  loader: () => import("egov-ui-framework/ui-atoms/HtmlElements/Div"),
  loading: () => <Loading />
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { route: nextRoute } = nextProps;
    const { route: currentRoute, history, setRoute } = this.props;
    if (nextRoute && currentRoute !== nextRoute) {
      history.push(nextRoute);
      setRoute("");
      window.parent.postMessage(`/employee-uc${nextRoute}`, "*");
    }
  }

  render() {
    const { authenticated } = this.props;
    const childProps = {
      isAuthenticated: authenticated
    };
    return (
      <Div className="App">
        <MainRoutes childProps={childProps} />
        {/* {spinner && <LoadingIndicator/>} */}
      </Div>
    );
  }
}

const mapStateToProps = ({ app, auth }) => {
  const { route, spinner } = app;
  const { authenticated } = auth;
  return {
    route,
    spinner,
    authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoute: route => dispatch(setRoute(route))
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
