import React, { Component } from 'react'
import { render } from 'react-dom'
import Example from './Example'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      theme: {
        backgroundColor: '#fff',
        color: '#404040',
        highlight: '#faeBd7'
      }
    }
  }

  render () {
    return (
    <div>
        <div className="title">
      		<h1>
      			<span className="blue">M</span>
      			<span className="red">E</span>
      			<span className="purple">G</span>
      			<span className="green">A</span>
            <span style={{marginLeft: '1rem'}}></span>

      			<span className="pink">D</span>
            <span className="blue">R</span>
      			<span className="red">A</span>
      			<span className="purple">F</span>
      			<span className="green">T</span>
      		</h1>
        </div>
        <Example theme={this.state.theme} />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('root'))
