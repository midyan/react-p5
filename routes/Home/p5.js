var p5 = require('p5')

import React, { PropTypes } from 'react';
import sketch from './smart_rockets.js'
import s from './p5.css'

class P5Wrapper extends React.Component {
  componentDidMount() {
    this.canvas = new p5(sketch, this.refs.wrapper)
  }
  componentWillReceiveProps(props, newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }
  render() {
    return  <div className={s.canvasWrapper} ref="wrapper"></div>
  }
}

export default P5Wrapper
