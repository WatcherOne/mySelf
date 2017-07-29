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
    const { key, imageURL, title, desc } = this.props.data
    const arrange = this.props.arrange
    let pos = {};
    let rotate = {};
    if (arrange) {
      // 添加定位
      pos = arrange.pos;
      // 添加旋转角度
      if (arrange.rotate) {
        (['-moz-', '-ms-', '-webkit-', '']).forEach((value) => {
          pos[`${value}transform`] = `rotate(${arrange.rotate}deg)`
        })
      }
      if (arrange.isCenter) {
        pos.zIndex = 11;
      }
    }
    return (
      <figure className={`img-figure ${this.props.arrange.isInverse ? 'is-inverse' : ''}`} style={pos} key={key} onClick={this.handleClick.bind(this)}>
        <img src={imageURL} alt={title}/>
        <figcation>
          <h2 className='img-title'>{title}</h2>
          <div className='img-back' onClick={this.handleClick.bind(this)}>
            <p>{desc}</p>
          </div>
        </figcation>
      </figure>
    )
  }
}