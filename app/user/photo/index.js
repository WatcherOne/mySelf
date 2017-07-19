import React from 'react'
import Header from 'user/header'

export default class extends React.Component {
  render() {
    return (
      <div className='user-photo'>
        <Header selected='menu2'/>
        <h1>这是个人相片</h1>
      </div>
    )
  }
}