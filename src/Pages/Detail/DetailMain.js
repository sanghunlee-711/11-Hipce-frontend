import React, { Component } from "react";
import "./DetailMain.scss";
import ColorList from "./ColorList";

class DetailMain extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      totalPrice: null,
      colorList: [],
    };
  }

  componentDidMount = () => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          colorList: res.colorList,
        });
      });
  };

  plusOne = () => {
    if (this.state.count >= 5) {
      alert("최대 주문수량은 5개 입니다.");
      return;
    }
    this.setState({
      count: this.state.count + 1,
      totalPrice: this.props.price * (this.state.count + 1),
    });
  };

  minusOne = () => {
    const { count } = this.state;
    const { price } = this.props;
    if (count <= 1) {
      alert("최소 주문수량은 1개 입니다");
      return;
    }
    this.setState({
      count: count - 1,
      totalPrice: price * (count - 1),
    });
  };

  render() {
    const { name, mainImage, price } = this.props;
    return (
      <div className="DetailMain">
        <div className="mainContainer">
          <div className="detail_mainImg">
            <img src={mainImage} alt="main-image" />
          </div>
          <div className="productInfo">
            <div className="productName">
              <span>{name}</span>
            </div>
            <div className="productElement">
              <div className="productPrice">
                <div className="nameBox">
                  <span className="detailName">판매가</span>
                </div>
                <span className="price">
                  {parseInt(price).toLocaleString()}원
                </span>
              </div>
              <div className="productNumBox">
                <span className="detailName">수량</span>
                <div className="numWrapper">
                  <button className="minus" onClick={() => this.minusOne()}>
                    -
                  </button>
                  <button className="plus" onClick={() => this.plusOne()}>
                    +
                  </button>
                  <input value={this.state.count} />
                </div>
              </div>
              <div className="productColor ">
                <span className="detailName">컬러</span>
                <ul className="colorSet">
                  {this.state.colorList.map((obj, idx) => (
                    <ColorList
                      onClick={this.checkMake}
                      active={obj.active}
                      name={obj.title}
                      id={obj.id}
                      bgc={obj.bgc}
                      key={this.state.colorList.title}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div classNaem="buyingBox">
              <div className="totalPrice">
                <span className="priceTitle">금액</span>
                <span className="total">
                  {this.state.totalPrice
                    ? this.state.totalPrice.toLocaleString()
                    : parseInt(price).toLocaleString()}
                  원 ({this.state.count}개)
                </span>
              </div>
              <div className="buttonBox">
                <span>
                  <button className="cartBtn"></button>
                </span>
                <button className="buyBtn">BUY NOW</button>
              </div>
              <div className="anotherPay">
                <button></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailMain;
