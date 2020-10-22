import React, { Component } from "react";
import "./ColorList.scss";

class ColorList extends Component {
  render() {
    const { id, name, bgc } = this.props;
    return (
      <div className="ColorList">
        <a href="#" id={id}>
          <li title={name} style={{ backgroundColor: bgc }}></li>
        </a>
      </div>
    );
  }
}

export default ColorList;
