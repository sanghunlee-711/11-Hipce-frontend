import React, { Component } from "react";
import "./ProductNav.scss";
import "./ProductFilter.scss";
import ProductFilter from "../List/ProductFilter";
import { Link, withRouter } from "react-router-dom";

class ProductNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productNavData: [],
      nameInfo: "lip",
    };
  }

  componentDidMount = () => {
    fetch("/data/productMockdata.json")
      .then((res) => res.json())
      .then((res) => this.setState({ productNavData: res.productNav }));
  };
  getTheName = (takenName) => {
    this.setState({ nameInfo: takenName.name });
  };
  render() {
    const {
      state: { productNavData },
    } = this;
    return (
      <section className="productNavContainer">
        <div className="productNav">
          {productNavData.map(({ name, img_src }) => (
            <Link
              to={`/list/category=${name}`}
              onClick={() => this.getTheName({ name })}
            >
              <img alt="productCategory" src={img_src} />
              <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </Link>
          ))}
        </div>
        <ProductFilter
          titleName={this.props.match.params.hello}
          nameInfo={this.state.nameInfo}
        />
      </section>
    );
  }
}

export default withRouter(ProductNav);
