import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import thunk from "redux-thunk";

import reducer, {
  baslangicDegerleri,
  localStorageStateOku,
  s10chLocalStorageKey,
} from "./reducers";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

const journal = createStore(
  reducer,
  localStorageStateOku(s10chLocalStorageKey) || baslangicDegerleri,
  applyMiddleware(logger, thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={journal}>
      <App />
    </Provider>
  </BrowserRouter>
);
