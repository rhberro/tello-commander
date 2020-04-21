import "./index.scss";

import React from "react";

import { connectify } from "../../decorators/connection";

import Bar from "../../components/Bar";

function Battery(props) {
  return (
    <div className="battery">
      <h1 className="battery__title">battery: {props.battery}%</h1>
    </div>
  );
}

export default connectify(Battery, { battery: 0 });
