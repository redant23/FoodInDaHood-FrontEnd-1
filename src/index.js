import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import AppContainer from "./containers/AppContainer";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={AppContainer} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
