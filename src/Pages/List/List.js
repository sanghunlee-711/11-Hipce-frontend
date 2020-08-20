import React, { Component } from 'react';
import Product from'./Product';
import Nav from '../../Components/Nav'
import ProductNav from '../List/ProductNav'
import ProductListBottom from '../List/ProductListBottom'
import Footer from '../../Components/Footer'

import './List.scss'
import ProductFilter from './ProductFilter'

class List extends Component {
  constructor(){
    super()

    this.state = {
      src:[...srcSample]
    }
  }
  

  componentDidMount
  render() {
    return (
      <div className = "List">
        <Nav />
        <ProductNav />
        <ProductFilter />
        <div className="ProductListContainer">
          <ul className ="ProductList">
            {this.state.src.map(({imgsrc}, index)=><Product key ={index} imgsrc ={imgsrc} />)}
          </ul>
        </div>
        <ProductListBottom />
        <Footer />
      </div>
    );
  }
}

const srcSample = [{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200617/84f098e93221212f8261345ede808e27.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}
                    ,{imgsrc : "https://hince.co.kr/web/product/tiny/20200304/4d5df929fb5b2ca498fcd0159a87c237.jpg"}


                  
                  ]



export default List;


