var p5 = require('p5')

import React, { PropTypes } from 'react';
import sketch from './sketch.js'

class P5Wrapper extends React.Component {
  componentDidMount() {
    console.log('Component Did Mount')
    console.log(this)
    this.canvas = new p5(sketch, this.refs.wrapper)
  }
  componentWillReceiveProps(props, newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }
  render() {
    console.log('Render Start')
    console.log(this.canvas)
    return  <div ref="wrapper"></div>
  }
}

export default P5Wrapper
