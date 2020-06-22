import React from 'react'

import './index.scss'
import LoadImg from './loading.gif'

class LoadingContent extends React.Component {
  render() {
    return (
      <div className='c_loading'>
        <img src={LoadImg} />
      </div>
    )
  }
}

export default LoadingContent
