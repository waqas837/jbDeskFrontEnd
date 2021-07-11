import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import root from "./Components/Redux/RootReducer";
const store = createStore(
  root,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
