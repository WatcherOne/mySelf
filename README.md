#watcher

#what?
  个人信息的网站

#do?
  1. npm i
  2. webpack --watch
  3. npm run server

#from?
  1. es6 摒弃原生js开发刀耕火种的年代
  2. webpack 模块化开发
  3. react 单页应用
  4. react-router 路由
  5. ant design 组件库（引入的过程中发现css也要通过插件引入，先引入吧）

#questions?
  1. 执行 npm run server 时，报错 webpack-dev-server command not found 
     需要全局安装 npm install webpack-dev-server -g



# study
  ` 不引用路由时 `
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