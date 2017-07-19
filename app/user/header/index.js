import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export default class extends React.Component {
  render() {
    return (
      <div className={`user-header-nav ${this.props.selected}`}>
        <Link to='/user/center'>个人中心</Link>
        <Link to='/user/photo'>个人相片</Link>
        <Link to='/user/profile'>个人资料</Link>
      </div>
    )
  }
}