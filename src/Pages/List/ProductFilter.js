import React, { Component } from "react";
import "./ProductFilter.scss";
import { withRouter } from "react-router-dom";
class ProductFilter extends Component {
  constructor() {
    super();

    this.state = {
      palleteDisplay: false,
      colors: [],
      selectedColor: [],
      filterdColor: "hidden",
      createURLcolor: "",
      textFilter: "",
    };
  }

  componentDidMount() {
    fetch("/data/productMockdata.json")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          colors: res.colorrange.map((color) => ({ ...color, active: false })),
        })
      );
  }

  palleteButtonKeep = (e, index) => {
    e.preventDefault();

    //color button
    let newColors = [...this.state.colors];
    newColors[index].active = !newColors[index].active;

    // color array when pop up button is clicked
    let checkArr = this.state.colors.map((el) => el.active);
    let selctingOne = newColors.filter((el) => el.active && el.name);
    let createURL = selctingOne.map((el) => el.name);

    this.setState({ colors: newColors }, () => {
      if (!checkArr.filter((el) => el === true).includes(true)) {
        this.setState({ filterdColor: "hidden" });
        this.setState({
          selectedColor: this.state.selectedColor.concat(newColors[index]),
        });
      } else {
        this.setState({ filterdColor: "productFilteredName" });
      }
    });
    this.setState({ selectedColor: createURL }, () => this.moveOnto());
  };

  moveOnto = () => {
    this.props.history.push(
      `/list/category=lip&${this.state.selectedColor
        .map((el) => `color=${el}`)
        .join("&")}`
    );
  };

  palleteClear = () => {
    let newColors = [...this.state.colors];
    for (let color of newColors) color.active = false;
    this.setState({ colors: newColors, filterdColor: "hidden" }, () =>
      this.props.history.push(`/list/category=lip`)
    );
  };

  textInput = (e) => {
    this.setState({ textFilter: e.target.value });
  };

  inputTextSend = (e) => {
    e.preventDefault();
    fetch("http://3.17.134.84:8000/products?category=lip", {
      method: "post",
      body: JSON.stringify({
        search: this.state.textFilter,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log("it's sent");
        }
      });
  };

  render() {
    const {
      state: { palleteDisplay, colors, filterdColor },
      props: { nameInfo },
      palleteButtonKeep,
      palleteClear,
    } = this;
    return (
      <div className="productFilter">
        <div className="productFilterName">
          <h2>{nameInfo?.charAt(0).toUpperCase() + nameInfo?.slice(1)}</h2>
          <span
            onClick={() =>
              this.setState({ palleteDisplay: !palleteDisplay }, () =>
                this.palleteClear()
              )
            }
            boolean="false"
          ></span>
        </div>
        <form className={palleteDisplay ? "productFilterPallete" : "hidden"}>
          <section className="palleteColorWrapper">
            <span>컬러</span>
            <div>
              <ul>
                {colors.map(({ color, name, active }, index) => (
                  <li
                    className={
                      active ? "colorListToggle" : "colorListToggleWhite"
                    }
                    name={name}
                    key={name}
                    onClick={(e) => palleteButtonKeep(e, index)}
                  >
                    <button
                      name={name}
                      index={index}
                      style={{ backgroundColor: color }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="palleteSearchBoxWrapper">
            <div className="palleteSearchBox">
              <span>결과 내 검색</span>
              <div>
                <input onChange={this.textInput}></input>
                <button onClick={this.inputTextSend}>검색</button>
              </div>
            </div>
          </section>
        </form>
        <section className={filterdColor}>
          <div>
            <ul>
              <li>
                <span className="filteredWordReset" onClick={palleteClear}>
                  초기화
                </span>
              </li>
              {colors.map(({ active, name }, index) => (
                <li>
                  <span
                    className={active ? "filterWord" : "hidden"}
                    onClick={(e) => palleteButtonKeep(e, index)}
                  >
                    컬러 : {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(ProductFilter);
