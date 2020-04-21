import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";

import { SocketProvider } from "./providers/socket.js";

import Attitude from "./containers/Attitude";
import Battery from "./containers/Battery";
import Connection from "./containers/Connection";
import Joystick from "./containers/Joystick";
import Speedometer from "./containers/Speedometer";
import Stream from "./containers/Stream";
import Variometer from "./containers/Variometer";

ReactDOM.render(
  <SocketProvider>
    <div className="container">
      <div className="container__header">
        <Battery />
        <Battery />
        <Battery />
        <Battery />
        <Battery />
      </div>
      <div className="container__footer" />
    </div>
  </SocketProvider>,
  document.getElementById("application")
);

if (module && module.hot) module.hot.accept();
