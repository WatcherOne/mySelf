import React from 'react'
import ReactDOM from 'react-dom'
import { Route, browserHistory, BrowserRouter as Router, IndexRoute } from 'react-router-dom'
import 'antd/dist/antd.css'
import Home from './home'
import UserCenter from './userCenter'

// const AppRouter = () => {
//   return (
//     <Router history={browserHistory}>
//       <div>
//         <Route exact path='/' component={Home} />
//         <Route path='/index' component={Home} />
//         <Route path='/user/center' component={UserCenter} />
//       </div>
//     </Router>
//   )
// }

// 不引用路由的react
const App = React.createClass({
  render () {
    let Child = null
    const route = this.props.route
    switch(route) {
      case '/home': Child = Home; break;
      case '/user/center': Child = UserCenter; break;
      default: Child = Home;
    }
    return (
      <div>
        <Child/>
      </div>
    )
  }
})

const route = window.location.hash.substr(1);
ReactDOM.render(<App route={route} />, document.getElementById('app'))