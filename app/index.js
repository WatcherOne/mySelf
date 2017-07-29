import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,      // 这是基本的路由块
  IndexRoute, // 这是默认加载的路由块
  Link,       // 这是a标签
  Switch,     // 这是监听空路由的
  Redirect,   // 这是重定向
  Prompt      // 防止转换
} from 'react-router-dom'
import 'antd/dist/antd.css'
import Header from 'common/header'
import UserCenter from 'user/center'
import UserProfile from 'user/profile'
import UserPhoto from 'user/photo'
import './index.scss'

const User = ({ match }) => {
  return (
    <div>
      <Route exact path={`${match.url}`} component={UserCenter} />
      <Route path={`${match.url}/center`} component={UserCenter} />
      <Route path={`${match.url}/profile`} component={UserProfile} />
      <Route path={`${match.url}/photo`} component={UserPhoto} />
    </div>
  )
}

const App = () => {
  // 在‘/’路由中，不加exact(完全匹配)则表示其他路由会匹配到该路由
  return (
    <Router>
      <div className="body">
        <Route path='/' component={Header}/>
        <Route path='/user' component={User} />
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