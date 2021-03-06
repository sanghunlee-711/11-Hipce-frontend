import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../config";
import Nav from "../../Components/Nav";
import Footer from "../../Components/Footer";
import "./Login.scss";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      pw: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = () => {
    const { id, pw } = this.state;
    if (!id && !pw) {
      alert("아이디 입력값은 필수입니다.");
    } else if (id.length >= 1 && !pw) {
      alert("패스워드 항목은 필수 입력값입니다.");
    } else if (pw.length >= 1 && !id) {
      alert("아이디 항목은 필수 입력값입니다.");
    } else if (pw.length < 4 && id) {
      alert("패스워드 항목이 4자(개) 이상으로 해주십시오.");
    } else {
      fetch(`${API}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: this.state.id,
          password: this.state.pw,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.ACCESS_TOKEN) {
            localStorage.setItem("ACCESS_TOKEN", response.ACCESS_TOKEN);
            this.props.history.push("/main");
          } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          }
        });
    }
  };

  render() {
    return (
      <div className="Login">
        <Nav />
        <div className="pageHeader">
          <div className="pageTitle">Sign In</div>
        </div>
        <div className="formBox">
          <div className="memberForm">
            <div className="inputWrapper">
              <input
                className="input"
                placeholder="아이디"
                name="id"
                onChange={this.handleChange}
                autocomplete="off"
              />
            </div>
            <div className="inputWrapper">
              <input
                className="input"
                placeholder="비밀번호"
                name="pw"
                type="password"
                onChange={this.handleChange}
                autocomplete="off"
              />
            </div>
            <div className="signInButtonBox">
              <button onClick={this.handleLogin} className="signInButton">
                SIGN IN
              </button>
              <div className="forgotAccount">
                <div>
                  <a href="#">아이디 찾기</a>
                </div>
                <div>
                  <a href="#">비밀번호 찾기</a>
                </div>
              </div>
            </div>
            <div className="signInMenu">
              <div className="descriptionBox">
                <p className="description">
                  아직 회원이 아니신가요?
                  <br></br>
                  가입 후 쿠폰 및 포인트 적립 등의 다양한 헤택을 받아보세요.
                </p>
              </div>
              <Link to="/signUp">
                <button className="signUpButton">회원가입</button>
              </Link>
              <div className="descriptionBox">
                <p className="description">
                  SNS 계정으로 가입하고 로그인 할 수 있습니다.
                </p>
              </div>
              <div className="socialSignIn">
                <div className="facebook">
                  <img src="Images/social-facebook.png" alt="facebook" />
                </div>
                <div className="naver">
                  <img src="Images/social-naver.png" alt="naver" />
                </div>
                <div className="kakaotalk">
                  <img src="images/social-kakao.png" alt="kakaotalk" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
