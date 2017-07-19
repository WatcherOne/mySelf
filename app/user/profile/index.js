import React from 'react'
import Header from 'user/header'

export default class extends React.Component {
  render() {
    return (
      <div className='user-profile'>
        <Header selected='menu3'/>
        <h1>这是个人资料</h1>
      </div>
    )
  }
}