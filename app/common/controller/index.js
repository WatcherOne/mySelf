import React from 'react'
import './index.scss'

export default class extends React.Component {

  handleClick(e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.setCenter()
    }
  }

  render() {
    const { arrange } = this.props;
    const isCenter = arrange.isCenter;
    const isInverse = arrange.isInverse;
    const controllerClassName = `controller-unit${arrange.isCenter ? ' is-center' : ''}`
    return (
      <span className={controllerClassName} onClick={this.handleClick.bind(this)}>
        {
          isInverse ? <i className='iconfont icon-wanjiantou-copy1'></i> :
          isCenter ? <i className='iconfont icon-wanjiantou-copy'></i> : ''
        }
      </span>
    )
  }
}