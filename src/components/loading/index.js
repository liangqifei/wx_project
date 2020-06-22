import React from 'react'
import './index.scss'
class Loading extends React.Component {
  render() {
    return (
        <div className='load_loading'>
          <div className="ant-spin ant-spin-spinning">
            <span className="ant-spin-dot ant-spin-dot-spin">
              <i></i><i></i><i></i><i></i>
            </span>
          </div>
        </div>
    )
  }
}

export default Loading

