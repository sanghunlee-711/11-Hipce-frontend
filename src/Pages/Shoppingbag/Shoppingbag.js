import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav";
import ItemList from "./ItemList";
import Footer from "../../Components/Footer";
import "./Shoppingbag.scss";
import API from "../../config";

export default class Shoppingbag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countNumber: {},
      pickItem: [],
      totalPrice: 0,
      shippingFee: 2500,
      checkItem: false,
      emptyDisplay: false,
    };
  }
  componentDidMount() {
    fetch(`${API}/orders`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          pickItem: res.shoppingbag,
          totalPrice: res.total_price,
        })
      );
  }

  componentDidUpdate(prevPros, prevState) {
    // console.log("update?"); //조은님 이부분 무한렌더 되니까 조심해서 다뤄주세용
    // 무한렌더를 막아주세요!!
    if (prevPros.pickItem !== this.state.prevPros)
      fetch(`${API}/orders`)
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            pickItem: res.shoppingbag,
            totalPrice: res.total_price,
          })
        );
  }

  countPlus = (item, inDecrement, e) => {
    if (item.quantity >= 5) {
      alert("더이상 못함");
      return;
    }

    // console.log(item.id);
    fetch(`${API}/orders`, {
      method: "PATCH",
      body: JSON.stringify({
        product_id: item.id,
        is_increased: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          // console.log(res.message);
          alert("증가 완료");
        }
      });
  };

  countMinus = (item, inDecrement) => {
    if (item.quantity <= 0) {
      alert("더이상 못함");
      return;
    }
    fetch(`${API}/orders`, {
      method: "PATCH",
      body: JSON.stringify({
        product_id: item.id,
        is_increased: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          // console.log(res.message);
          alert("증가 완료");
        }
      });
  };

  checkItem = (item) => {
    const newPickItem = this.state.pickItem.map((el) =>
      el.name === item.name ? { ...el, active: true } : el
    );
    this.setState({
      pickItem: newPickItem,
    });
  };

  shippingfeeDelete = () => {
    const { totalPrice } = this.state;
    this.setState({ shippingFee: totalPrice >= 50000 ? 0 : 2500 });
  };

  deleteList = (item) => {
    this.setState({
      pickItem: this.state.pickItem.filter((el) => el.name !== item.name),
    });
  };

  clearList = () => {
    this.setState({ pickItem: [] }, () => this.calculatePrice());
  };

  deleteCheckedItem = (item) => {
    let checkedItems = this.state.pickItem.filter((el) => el.active);
    let checkedItemsId = checkedItems.map((el) => el.id);

    fetch(`${API}/orders`, {
      method: "delete",
      body: JSON.stringify({
        product_id: checkedItemsId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          // console.log(res.message);
          alert("증가 완료");
        }
      });
  };

  sendPickedItem = (pickItem) => {
    let checkedItems = this.state.pickItem.filter((el) => el.active);
    let checkedItemsId = checkedItems.map((el) => el.id);
    fetch("URL", {
      method: "post",
      body: JSON.stringify({
        pickItem: pickItem.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
        }
      });

    this.props.history.push(
      `/orders?${checkedItemsId.map((el) => `product_id=${el}`).join("&")}`
    );
  };

  render() {
    const {
      state: {
        emptyDisplay,
        pickItem,
        totalPrice,
        onSearchSubmit,
        shippingFee,
      },
      clearList,
      deleteList,
      checkItem,
      deleteCheckedItem,
      countPlus,
      countMinus,
    } = this;
    return (
      <div className="Shoppingbag">
        <Nav />
        <section className="shoppingbagContainer">
          <span className="shoppingbagTitle">Shopping Bag</span>
          <section className="OrderdList">
            <span className={!emptyDisplay ? "hidden" : "ShoppingbagEmpty"}>
              장바구니에 담으신 상품이 없습니다.
            </span>
            <table className="orderdProductList">
              <ItemList
                pickedItem={pickItem}
                totalPrice={totalPrice}
                onSubmit={onSearchSubmit}
                clearList={clearList}
                deleteList={deleteList}
                checkItem={checkItem}
                countPlus={countPlus}
                countMinus={countMinus}
              />
            </table>
          </section>
          <section className="shoppingbagFooter">
            <div className="priceCalculatorWrapper">
              <div>
                <span>5만원 이상 결제 시 무료로 배송 받을 수 있습니다.</span>
                <div>
                  <span onClick={deleteCheckedItem}>선택한 상품 삭제하기</span>
                  <span onClick={clearList}>장바구니 비우기</span>
                </div>
              </div>
            </div>
            <div className="priceCalculatedWrapper">
              <div className="priceCalculated">
                <ul>
                  <li>
                    <span>주문금액</span>
                    <span>{Math.floor(totalPrice).toLocaleString()}원</span>
                  </li>
                  <li>
                    <span>배송비</span>
                    <span>{shippingFee.toLocaleString()}원</span>
                  </li>
                  <li className="sum">
                    <span>합계</span>
                    <span>
                      {Math.floor(totalPrice + shippingFee).toLocaleString()}원
                    </span>
                  </li>
                </ul>
              </div>
              <div className="orderButton">
                <Link className="totalOrderButton" to="/checkout">
                  전체 주문하기
                </Link>
                <div>
                  <Link onClick={() => this.sendPickedItem(pickItem)}>
                    선택 상품만 주문
                  </Link>
                  <Link to="/checkout" className="naverOrder"></Link>
                </div>
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}
