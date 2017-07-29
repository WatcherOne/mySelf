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

  getImgStyle() {
    const arrange = this.props.arrange
    let styleObj = arrange.pos  // 添加定位
    // 添加旋转角度
    if (arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => {
        styleObj[value] = `rotate(${arrange.rotate}deg)`
      })
    }
    if (arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    return styleObj
  }

  render() {
    const { imageURL, title, desc } = this.props.data
    const imgFigureClassName = `img-figure${this.props.arrange.isInverse ? ' is-inverse' : ''}`
    const styleObj = this.getImgStyle()
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
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