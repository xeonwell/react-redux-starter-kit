import React, { Component, PropTypes } from 'react';

class Counter extends Component {
  static propTypes = {
    counter    : PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment  : PropTypes.func.isRequired
  };

  render () {
    const props = this.props;
    return (
      <div style={{margin: '0 auto'}}>
        <h2>Counter: {props.counter}</h2>
        <button className='btn btn-default' onClick={props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.doubleAsync}>
          Double (Async)
        </button>
      </div>
    );
  }
}
export default Counter;
