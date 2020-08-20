import React, { Component } from 'react'
// import Pallete from './Pallete'
import './ProductFilter.scss'

export default class ProductFilter extends Component {
    constructor(props){
        super(props)

        this.state = {
            buttonId: [],
            palleteDisplay: 'hidden',
            classification: "",
            colors:[...collorRange],
            clickColor: "white",
            filterdColor: "productFilteredName",
            filterdDate:[],
            sampleArr:["Red","Oragne","Beige","Pink","Brown","Coral","Purple","Purple","Rose","Mauve"],
        }

        for(let color of this.state.colors) color.active = false;
    }

    palleteDisplayChange = ()=> {
        if(this.state.palleteDisplay = "hidden"){
            this.setState({palleteDisplay: "ProductFilterPallete"})
        }
        else if(this.state.palleteDisplay ="ProductFilterPallete"){
            this.setState({palleteDisplay: "hidden"})
        }

    }  
    palleteButtonKeep = (e, index) => {
        e.preventDefault();
        let newColors = [...this.state.colors];
        newColors[index].active = !newColors[index].active;
        this.setState({colors: newColors});
        if(this.state.filterdColor == "hidden"){
            this.setState({filterdColor: "productFilteredName"})
        };

    }

    palleteClear =()=>{
        console.log("clickckckckckdkdkckekd")
        let newColors =[...this.state.colors];
        for(let color of newColors) color.active = false;
        this.setState({colors: newColors ,filterdColor:"hidden"});

    }


    render() {
        return (
            <div className ="ProductFilter">
                    <div className="ProductFilterName">
                        <h2>Lip</h2>
                        <span onClick ={this.palleteDisplayChange}></span>
                    </div>
                    <form className ={this.state.palleteDisplay}>
                            <section>
                                <span>컬러</span>
                                <div>
                                        <ul>
                                            {this.state.colors.map(({ color , name, active}, index)=> 
                                            <li name ={name} key={name} style={{backgroundColor: active ? 'grey' : 'white'}} onClick ={(e) => this.palleteButtonKeep(e, index)} >
                                                <button name ={name} index ={index} style={{backgroundColor: color}} > </button>
                                            </li>)}
                                        </ul>
                                </div>
                            </section>
                            <section>
                                <div className = "PalleteSearchBox">
                                    <span>결과 내 검색</span>
                                    <div>
                                        <input></input>
                                        <button>검색</button>
                                    </div>
                                </div>
                            </section>
                    </form>
                    {/* productFilteredName */}
                    <section className={this.state.filterdColor}>
                        <div>
                            <ul>
                                <li> 
                                    <span className = "FilteredWord"  onClick ={(e)=>this.palleteClear(e)}>초기화</span>
                                </li>
                                
                                {this.state.colors.map(({active,name}, index)=> 
                                    <li className = "FilterWordWrapper" >
                                        <span  className = "FilterWord" style={{display: active ? '' : 'none'}} onClick ={(e)=>this.palleteButtonKeep(e,index)}>
                                            컬러 : {name}  
                                        </span>
                                    </li>)}
                            </ul>
                        </div>
                    </section>
            </div>
        )
    }
}
// FilteredWord
const collorRange = [{color: '#b12a23',
                        name:"Red"},
                    {color: '#dc6b2f',
                        name:"Oragne"},
                    {color: '#d6ae9a',
                        name: "Beige"},
                    {color: '#dd7d88',
                        name: "Pink"},
                    {color: '#835248',
                        name: "Brown"},
                    {color: '#ef5a41',
                        name: "Coral"},
                    {color: '#b0718d',
                        name: "Purple"},
                    {color: '#b70316',
                        name: "Rose"},
                    {color: '#915f6d',
                        name: "Mauve"}]
