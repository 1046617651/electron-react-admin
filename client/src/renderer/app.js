/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './component/user/login'
import Site from './component/site'
// import PrivateRoute from './component/site/PrivateRoute'
import page from './page'
console.log(page)
function RouteWrapper ({
  component: Component,
  layout: Layout,
  authed,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => {
      if (authed) {
        return <Layout {...props}>
      <Component {...props} />
    </Layout>
      } else {
        <Redirect to={{ pathname: '/', state: { from: props.location } }}/>
      }
    }} />
  )
}
class App extends Component {
  render () {
    return (
      <Switch>
        <Route path='/' exact={true} component={Login}></Route>
        {
          page.map(({ path, component }) => {
            return (<RouteWrapper path={path} key={path} layout={Site.Layout} authed={this.props.isLogin} exact={true} component={component}/>)
          })
        }
        <Route exact={true} component={Site.NotFound} />
      </Switch>
    )
  }
}
const mapStateToProps = state => ({
  isLogin: !!(state.user && state.user.token)
})
export default withRouter(connect(mapStateToProps, null)(App))
