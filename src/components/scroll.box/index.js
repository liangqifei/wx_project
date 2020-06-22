import React from 'react'

import './index.scss'
import LoadingContent from '../loading.content'


/**
 * @description 滚动容器 主要用于触发滚动到底部的功能
 * @param {boolean-require} loading false - 是否显示底部的loading效果.
 * @param {boolean-require} isOnLast false - 是否已经到最后一页.
 * @param {function-require} onScrollBottom - 滑动到底部的回调.
 * @param {Number-require} listLength 0 - 列表长度，主要用于判断，如果本身没数据，就不显示最后一页的提示.
 * @param {function} onScroll - 返回滚动高度.
 * @param {Number} initScrollTop 0 - 初始化滚动条高度.
 * @example
 * <ScrollBox loading={true} isOnLast={false} onScrollBottom={()=>{}} listLength={} />
 */

class ScrollBox extends React.Component {
  constructor(props){
    super(props)
    this.state={
      flag: true,
      scrollShow: false
    }
  }

  componentDidMount(){
    if(this.props.initScrollTop){
      this.refs.scrollDiv.scrollTop = this.props.initScrollTop
    }
    if(this.props.scrollBgColor){
      const styleId = `scrollStyle_${this.props.scrollBgColor.replace('#','')}`
      const style = document.createElement('style')
      style.setAttribute('id',styleId)
      style.innerHTML = `
        .c_scroll_bg_${this.props.scrollBgColor}::-webkit-scrollbar{
          background-color: ${this.props.scrollBgColor}
        }
      `
      document.head.appendChild(style)
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.onlyKey && prevProps.onlyKey && this.props.onlyKey !== prevProps.onlyKey){
      this.refs.scrollDiv.scrollTop = 0
    }else if(this.props.initScrollTop && this.props.initScrollTop !== prevProps.initScrollTop){
      this.refs.scrollDiv.scrollTop = this.props.initScrollTop
    }
  }

  componentWillUnmount(){
    if(this.props.scrollBgColor){
      const styleId = `scrollStyle_${this.props.scrollBgColor.replace('#','')}`
      const style = document.head.querySelector('#'+styleId)
      if(style){ style.remove() }
    }
  }

  listScroll=(e)=> {
    const { isOnLast,loading } = this.props
    if(!isOnLast){
      let scrollTop = Math.ceil(Math.round(e.target.scrollTop))
      let clientHeight = Math.ceil(Math.round(e.target.clientHeight))
      let scrollHeight = Math.ceil(Math.round(e.target.scrollHeight))
      if (
        scrollTop + clientHeight == scrollHeight ||
        scrollTop + clientHeight == scrollHeight - 1 ||
        scrollTop + clientHeight == scrollHeight + 1
      ) {
        if (this.state.flag && !loading) {
          this.setState({flag:false})
          setTimeout(()=> {
            this.setState({flag:true})
            if(this.refs.scrollDiv){
              this.refs.scrollDiv.scrollTop = this.refs.scrollDiv.scrollTop - 100
            }
          }, 1000)
          // 滑到底了
          this.props.onScrollBottom()
        }
      }
    }
  }

  render() {
    const { loading,isOnLast,listLength=0,onScroll=()=>{}} = this.props
    const { scrollShow } = this.state
    return (
      <div className={'c_scrollBox'+(scrollShow?' scroll_show':'')} onScroll={(e)=>{onScroll(e.target.scrollTop);if(!isOnLast){this.listScroll(e)}}} ref='scrollDiv'
        onMouseOver={()=>{ this.setState({ scrollShow:true }) }} onMouseLeave={()=>{ this.setState({ scrollShow:false }) }}
      >
        {this.props.children}
        {loading &&
          <div className="botLoading">
            <LoadingContent />
          </div>
        }
        {(!loading && isOnLast && listLength>0) ?
          <div className="lastAlert">已经是最后一页喽</div>:''
        }
      </div>
    )
  }
}

export default ScrollBox
