import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AxiosInterceptorSetup from "./AxiosInterceptorSetup";

ReactDOM.render(
  <BrowserRouter>
    <AxiosInterceptorSetup>
      <App />
    </AxiosInterceptorSetup>
  </BrowserRouter>,
  document.getElementById("root"),
);

// ReactDOM.render(<App />, document.getElementById("root"));
