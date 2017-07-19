import React from 'react'
import Header from 'user/header'

export default class extends React.Component {
  render() {
    return (
      <div className='user-center'>
        <Header selected='menu1'/>
        <h1>这是个人中心</h1>
      </div>
    )
  }
}