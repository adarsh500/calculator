//import logo from './logo.svg';
import './App.css'; 
import { useState } from "react";

function App() {

  let [expression, setExpression] = useState("");
  let [oldExpression, setOldExpression] = useState("0");
  let [previous, setPrevious] = useState("ANS");

  let numerics = new Set("0123456789."); //its like the set in mathematics, it creates a set of items
  let operators = new Set("+-/*%");
  let buttons = ["(", ")", "%", "AC", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  let evaluateExpression = function(){
    let evaluation = eval(expression);
      setOldExpression(expression + "= ");
      setExpression(String(evaluation));
      setPrevious("ANS");
  }

  let backspaceFunction = function(){
    if(expression.length >= 1) {
      setExpression(expression.slice(0, -1)); //removes the last entered item
    }
    setPrevious("DEL");
  }

  let putNumerics = function(value){
    if (previous === "ANS"){                 //value is nothing but event.key
      setOldExpression("Ans = " + expression);
      setExpression(value);   
    } else {
      setExpression(expression + value);
    }
    setPrevious("NUM");
  }

  let putOperator = function(value){
    if (previous !== "OP") {
      setExpression(expression + value);
    } else if (previous === "OP"){
      setExpression(expression.slice(0, -1) + value);
    }
    setPrevious("OP");
  }

  const handleKeyUp = function(event){
    //console.log(event.key);
    if (event.key === "Backspace"){
      backspaceFunction();
    } else if (numerics.has(event.key)){     //numerics.has(event.key) checks if the key entered matches with the ones available in the numerics set
      putNumerics(event.key);
    } else if(operators.has(event.key)){
      putOperator(event.key);
    } else if (event.key === "Enter"){
      evaluateExpression();
    }
    
  }
  return (               //tabIndex={0} sets the focus to the div element by default
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp}> 

      <div className="calculatorDisplay">
      <h5>{oldExpression}</h5>
      <h1>{expression}</h1>
      </div>


      <div className="container">
        {/* <button className="container-items">(</button>
        <button className="container-items">)</button>      //This is the NOOB method i.e. ME
        <button className="container-items">%</button>
        <button className="container-items">AC</button>
        <button className="container-items">9</button>
        <button className="container-items">8</button>
        <button className="container-items">7</button>
        <button className="container-items">/</button>
        <button className="container-items">6</button>
        <button className="container-items">5</button>
        <button className="container-items">6</button>
        <button className="container-items">*</button>
        <button className="container-items">3</button>
        <button className="container-items">2</button>
        <button className="container-items">1</button>
        <button className="container-items">-</button>
        <button className="container-items">0</button>
        <button className="container-items">.</button>
        <button className="container-items"> = </button>
        <button className="container-items">+</button> */}
        {buttons.map(function(buttonValue, idx) {             //this is the pro method like Anuj sir
          return <button className="container-items" onClick={function(){
            if (buttonValue === "CE"){
              backspaceFunction();
            } else if (numerics.has(buttonValue)){     //numerics.has(event.key) checks if the key entered matches with the ones available in the numerics set
              putNumerics(buttonValue);
            } else if(operators.has(buttonValue)){
              putOperator(buttonValue);
            } else if (buttonValue === "="){
              evaluateExpression();
            }
            
          }}>{buttonValue}</button>
        })}
    </div>

    </div>
  );
}

export default App;
