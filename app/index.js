import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute, Redirect, browserHistory, BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import Outer from './outer'
import Home from './home'
import UserCenter from './userCenter'

// 引用路由
/* 为什么上下创建react组件的方式不一样，就回到创建react组件方式分类。
 * 该创建方式属于只用作展示，无法控制组件的渲染，下面的是es5方式写的。
 */
const App = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Route path='/' component={Home} />
        <Route path='/index' component={Home} />
        <Route path='/user/center' component={UserCenter} />
      </div>
    </Router>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'))

// 不引用路由的react
// const App = React.createClass({
//   render () {
//     let Child = null
//     const route = this.props.route
//     switch(route) {
//       case '/home': Child = Home; break;
//       case '/user/center': Child = UserCenter; break;
//       default: Child = Home;
//     }
//     return (
//       <div>
//         <Child/>
//       </div>
//     )
//   }
// })

// const route = window.location.hash.substr(1);
// ReactDOM.render(<App route={route} />, document.getElementById('app'))