/* eslisnt no-eval: 0 */

import React from "react";
import './App.css'
import store from "./store"

class App extends React.Component {

  constructor () {
    super()
    this.state = {
      out: '0' 
    }
    this.refOutput = React.createRef()

  }

  tapeNumber(value) {
    let currentValue =value
    let output = this.refOutput.current
    this.setState({
      out: currentValue
    })
    
    if (output.value === '0') {output.value = ''}
    output.value += currentValue
  }

  tapeOperations(value) {
    let output = this.refOutput.current
    if (value ==='CE') {
      output.value.length === 1 ? output.value = '0' :
      output.value = output.value.substring(0, output.value.length -1)
    } 

    else if (value === 'C') {output.value = '0'}
    else if (value === '=') { 
        try {output.value = eval(output.value) 
          console.log(output.value) 
          /* Checking for division by 0 */
          if (output.value === 'Infinity') {
            output.value = 'Деление на 0'
            setTimeout(() => {
              output.value ='0'
            },  2000)
          }
      }
      catch {
        output.value = 'Недопустимое значение'
        setTimeout(() => {
          output.value = '0'
        }, 2000)
      }
    }
  }

  render() {

    return (
      <div className="container">
        <div className="output">
          <input ref={this.refOutput}type="text" defaultValue = {this.state.out} /> 
        </div>
        <div className = "button">
          {store.button.map((item, index) => <button
          key={index}
            onClick={() => this.tapeNumber(item.val)}
          >{item.val}</button>)}
          {store.operations.map((item,index) => <button
          key={index}
            onClick={() => this.tapeOperations(item.val)}
          >{item.val}</button>)}
        </div>
      </div>
    )
  }

}

export default App