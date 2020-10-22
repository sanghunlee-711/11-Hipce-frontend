import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Product.scss";

class Product extends Component {
  render() {
    const {
      props: { mainImgSrc, subImgSrc, tag, name, price, id },
    } = this;
    return (
      <li className="Product" id={id}>
        <section className="productImage">
          <Link onClick={() => this.props.history.push(`/detail/${id}`)}>
            <img
              className="productMainImg"
              alt="productMainImg"
              src={mainImgSrc}
            />
            <img
              className="productSubImg"
              alt="productSubImg"
              src={subImgSrc}
            />
          </Link>
        </section>
        <section className="productBottom">
          <div className="productBottomValue">
            <div>{tag && <img alt="stateLogo" src={tag} />}</div>
            <div>
              <Link to="/detail">
                <p>{name}</p>
              </Link>
              <Link>
                <img
                  alt="cartMark"
                  onClick={() =>
                    this.props.getItem(id, price, name, mainImgSrc)
                  }
                  src="http://hince.co.kr/assets/images/hince-cart-icon.jpg"
                />
              </Link>
            </div>
          </div>
          <span>{Number(price).toLocaleString()}원</span>
        </section>
      </li>
    );
  }
}

export default withRouter(Product);
