/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firebaseConfig } from "api/firebase";
import { createFirestoreInstance } from "redux-firestore";
import store from "./store";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
// import Admin from "layouts/Admin.js";
import Admin from "layouts/Admin.js";
import Auth from "components/auth/Auth";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={firebaseConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <Auth />
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/login" />
        </ReactReduxFirebaseProvider>
      </Provider>
    </Switch>
  </Router>,
  document.getElementById("root")
);
