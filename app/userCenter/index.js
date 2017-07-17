import React from 'react'
import { Menu, Icon, Switch } from 'antd'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
    }
  }
  
  changeMode(value) {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    })
  }

  render() {
    return (
      <div>
        <Switch onChange={this.changeMode}/>
      </div>
    )
  }
}