import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav";
import Card from "./Components/Card";
import Transfer from "./Components/Transfer";
import Account from "./Components/Account";
import Virtual from "./Components/Virtual";
import OrderSummary from "./Components/OrderSummary";
import Footer from "../../Components/Footer";
import "./Checkout.scss";

const paymentMethod = {
  0: <Card />,
  1: <Transfer />,
  3: <Account />,
  4: <Virtual />,
};

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,
      orderItem: [],
      sumPrice: 0,
    };
  }

  componentDidMount() {
    const ItemFromSession = Object.values(sessionStorage).map((el) =>
      JSON.parse(Object(el))
    );
    this.setState(
      {
        orderItem: ItemFromSession.map((el) => ({ ...el, count: 1 })),
      },
      () => this.calculateSum()
    );
  }

  handleRadio = (id) => {
    this.setState({
      activeTab: id,
    });
  };

  onGoingPayment = () => {
    alert("결제가 진행중입니다 :)");
  };

  render() {
    // console.log(this.state.orderItem.map((el) => Number(el.price)));
    return (
      <>
        <Nav />
        <div className="Checkout">
          <div className="pageHeader">
            <h2>Check Out</h2>
          </div>
          <div className="formContainer">
            <div className="orderForm">
              <form className="deliveryInfo">
                <h3>배송정보</h3>
                <div className="toWhere">
                  <label>배송지 선택</label>
                  <input id="myInfo" type="radio" name="deliveryPlace"></input>
                  <label for="myInfo">
                    <span></span>회원 정보와 동일
                  </label>
                  <input id="newInfo" type="radio" name="deliveryPlace"></input>
                  <label for="newInfo">
                    <span></span>새로운 배송지
                  </label>
                  <Link>주소록 보기</Link>
                </div>
                <div className="toWhom">
                  <label>
                    받으시는 분 <span>*</span>
                  </label>
                  <input type="text"></input>
                </div>
                <div className="address">
                  <div className="addressSearch">
                    <label>
                      주소 <span>*</span>
                    </label>
                    <input type="text"></input>
                    <Link>우편번호 검색</Link>
                  </div>
                  <div className="addressDetail">
                    <input type="text"></input>
                  </div>
                  <div className="addressDetail">
                    <input type="text"></input>
                  </div>
                </div>
                <div className="mobileNumber">
                  <label>
                    휴대전화 <span>*</span>
                  </label>
                  <select name="number">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                  &nbsp;-&nbsp;<input type="text"></input>&nbsp;-&nbsp;
                  <input type="text"></input>
                </div>
                <div className="email">
                  <label>
                    이메일 <span>*</span>
                  </label>
                  <input type="text"></input>
                  <span>&nbsp;@&nbsp;</span>
                  <input type="text"></input>
                  &nbsp;
                  <select>
                    <option value="이메일 선택">-이메일 선택-</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="nate.com">nate.com</option>
                    <option value="hotmail.com">hotmail.com</option>
                    <option value="yahoo.com">yahoo.com</option>
                    <option value="empas.com">empas.com</option>
                    <option value="korea.com">korea.com</option>
                    <option value="dreamwiz.com">dreamwiz.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="직접입력">직접입력</option>
                  </select>
                </div>
                <div className="deliveryMessage">
                  <label>배송메세지</label>
                  <textarea type="text"></textarea>
                </div>
              </form>
              <div className="discountInfo">
                <h3>할인/적립금 사용</h3>
                <div className="discountCoupon">
                  <label>쿠폰할인</label>
                  <Link>쿠폰 사용하기</Link>
                </div>
                <div className="discountCouponAmount">
                  <label>총 할인금액</label>
                  <span>
                    <span>0</span>원
                  </span>
                </div>
                <div className="balanceCheck">
                  <label>예치금 사용</label>
                  <input type="text"></input>
                  <span>&nbsp;원 / 0원 사용가능</span>
                </div>
                <div className="totalDiscount">
                  <label>총 적립금 사용금액</label>
                  <span>
                    <span>0</span>원
                  </span>
                </div>
              </div>
              <div className="paymentInfo">
                <h3>결제정보</h3>
                <div className="paymentMethod">
                  <label>결제방법</label>
                  <span className="methodDetail">
                    <input
                      id="card"
                      type="radio"
                      name="paymentMethod"
                      onChange={() => this.handleRadio(0)}
                    />
                    <label for="card">
                      <span></span>카드 결제
                    </label>
                  </span>
                  <span className="methodDetail">
                    <input
                      id="transfer"
                      type="radio"
                      name="paymentMethod"
                      onChange={() => this.handleRadio(1)}
                    />
                    <label for="transfer">
                      <span></span>실시간 계좌이체
                    </label>
                  </span>
                  <span className="methodDetail">
                    <input
                      id="mobile"
                      type="radio"
                      name="paymentMethod"
                      onChange={() => this.handleRadio(2)}
                    />
                    <label for="mobile">
                      <span></span>휴대폰 결제
                    </label>
                  </span>
                  <span className="methodDetail">
                    <input
                      id="account"
                      type="radio"
                      name="paymentMethod"
                      onChange={() => this.handleRadio(3)}
                    />
                    <label for="account">
                      <span></span>무통장 입금
                    </label>
                  </span>
                  <span className="methodDetail">
                    <input
                      id="paymentVirtual"
                      type="radio"
                      name="paymentMethod"
                      onChange={() => this.handleRadio(4)}
                    />
                    <label for="virtual">
                      <span></span>가상계좌
                    </label>
                  </span>
                </div>
                {paymentMethod[this.state.activeTab]}
              </div>
            </div>
            <div className="orderSummary">
              <h3>주문요약 및 결제</h3>
              <OrderSummary orderItem={this.state.orderItem} />
              <div className="orderPayment">
                <ul>
                  <li>
                    <span>상품금액</span>
                    <span>{this.state.sumPrice.toLocaleString()}</span>
                  </li>
                  <li>
                    <span>배송비</span>
                    <span>{this.state.sumPrice >= 50000 ? 0 : 2500}</span>
                  </li>
                  <li>
                    <span>지역별 배송비</span>
                    <span>0원</span>
                  </li>
                  <li>
                    <span>할인</span>
                    <span>-0원</span>
                  </li>
                  <li className="total">
                    <span>결제예정</span>
                    <span>
                      {this.state.sumPrice >= 50000
                        ? this.state.sumPrice
                        : this.state.sumPrice + 2500}
                    </span>
                  </li>
                </ul>
                <button onClick={() => this.onGoingPayment()}>결제하기</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Checkout;
