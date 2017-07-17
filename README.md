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
