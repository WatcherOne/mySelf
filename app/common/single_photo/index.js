import React from 'react'
import './index.scss'

export default class extends React.Component {
  render() {
    const { key, imageURL, title, desc } = this.props.data
    const pos = this.props.arrange ? this.props.arrange.pos : {}
    return (
      <figure className='img-figure' style={pos} key={key}>
        <img src={imageURL} alt={title}/>
        <figcation>
          <h2 className='img-title'>{title}</h2>
        </figcation>
      </figure>
    )
  }
}