import React from 'react'
import './index.scss'

export default class extends React.Component {
  render() {
    return (
      <div className='common-header-nav'>
        <ul>
          <li>zhubo</li>
          <li>|</li>
          <li>帮助中心</li>
          <li>|</li>
          <li>联系方式</li>
        </ul>
      </div>
    )
  }
}