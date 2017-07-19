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
import Home from './home'
import Header from './common/header'
import UserCenter from './user/center'
import UserProfile from './user/profile'
import UserPhoto from './user/photo'
import './index.scss'

const User = ({ match }) => {
  return (
    <div>
      <Header />
      <Redirect from={`${match.url}`} to={`${match.url}/center`} />
      <Route path={`${match.url}/center`} component={UserCenter} />
      <Route path={`${match.url}/profile`} component={UserProfile} />
      <Route path={`${match.url}/photo`} component={UserPhoto} />
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div className="body">
        <Route exact path='/' render={() => { return <div>这是首页</div> } } />
        <Route path='/index' component={Home} />
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