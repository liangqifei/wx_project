import React, { Suspense, lazy } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.scss'
import Loading from './components/loading'
import { Modal, Toast } from 'antd-mobile'
// const Tab1 = lazy(() => import('./pages/tab1'))


@withRouter
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }
  componentDidMount(){
    let _this=this
    
    
  }
  render() {
    const { location } = this.props
    return (
      <Switch location={location}>
        <Suspense fallback={<Loading />}>
          <Loading />ssss
        </Suspense>
      </Switch>
    )
  }
}

export default App
