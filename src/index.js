import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import AppContainer from "./containers/AppContainer";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const store = createStore(rootReducer, applyMiddleware(logger));

const history = createHistory();

// Get the current location.
const location = history.location;

// Listen for changes to the current location.
// const unlisten = history.listen((location, action) => {
//   // location is an object like window.location
//   debugger;
//   console.log(action, location.pathname, location.state);
// });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={AppContainer} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
