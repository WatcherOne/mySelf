*** watcher *** <br>
*** myself ***

### 运行 ###
  1. npm i
  2. webpack --watch
  3. npm run server

### 技术 ###
  * es6
  * webpack 模块化开发
  * react 单页应用
  * react-router 路由
  * ant design 组件库

### 常见问题
  1. 执行 npm run server 时，报错webpack-dev-server command not found <br>
     需要全局安装 npm install webpack-dev-server -g
  2. <Router> 里面有且只有一个child
  3. <Route > 必须有component
  4. <Route></Route> 嵌套时也是嵌套着组件的结构
  5. <Route> 4.0 后的嵌套好像有不同，还是大问题，后续讨论

# study
    不引用路由时

  > 这样子的做法看起来很直接，但是这也会让整个应用程序变得更加复杂.

  > 复杂一点的路由需求就需要我们写很多条件判断的代码去去解决实RL和层级组件的同步问题.
  ```javascript
    const App = React.createClass({
      render () {
        let Child = null
        const route = this.props.route
        <!-- 需要根据传进来的 route 去判断渲染的是哪个组件？ -->
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

    <!-- 取得页面 hash 字段，然后传入 react 组件作为 route 参数  -->
    const route = window.location.hash.substr(1);  //注意的是：网页url是以（#开头的）8080/#/home
    ReactDOM.render(<App route={route} />, document.getElementById('app'))
  ```

      引用路由时
  ```javascript
    <IndexRoute component={Home} />
    // 默认情况加载的子组件 之前版本是 DefaultRoute
    <Route />
    // 用于声明式地映射路由规则到你多层嵌套的应用组件
    // 属性name(optional)
    // name 在路由中是唯一的，被使用在 Link 组件和路由转换的方法中。
    // 属性path(optional)
    // 在url中使用的路径，如果不填写的话，路径就是name，如果name也没有的话，默认就是 /.
    // children, 可嵌套使用
    <Redirect from="/" to="/index" />
    // 组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。
    <Route path="/" component={App}>
      ＜IndexRedirect to="/index" />
    </Route>
    // IndexRedirect组件用于访问根路由的时候，将用户重定向到某个子组件。
    <Router history={browserHistory}>
      <Route />
    </Router>
    // Router组件本身只是一个容器，真正的路由要通过Route组件定义。而且是有一个child element！！！
    // 组件有一个参数history，它的值browserHistory表示：路由的切换由URL的hash变化决定，即URL的#部分发生变化。
    // 举例来说，用户访问http://www.example.com/，实际会看到的是http://www.example.com/#/  跟 无路由时对应上
  ```
