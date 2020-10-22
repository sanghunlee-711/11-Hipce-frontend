import React, { Component } from "react";
import "./ProductNav.scss";
import { Link, withRouter } from "react-router-dom";

class ProductNav extends Component {
  constructor() {
    super();

    this.state = {
      productNavData: [],
    };
  }

  componentDidMount = () => {
    fetch("/data/productMockdata.json")
      .then((res) => res.json())
      .then((res) => this.setState({ productNavData: res.productNav }));
  };

  render() {
    const {
      state: { productNavData },
    } = this;
    return (
      <div className="productNav">
        {productNavData.map(({ name, img_src }) => (
          <Link to={`/list/category=${name}`}>
            <img alt="productCategory" src={img_src} />
            <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
          </Link>
        ))}
      </div>
    );
  }
}

export default withRouter(ProductNav);
