/*
 * @Author: chenzhizhuo
 * @Date:   2017-08-21 22:11:01
 * @Last Modified by:   chenzhizhuo
 * @Last Modified time: 2017-08-21 22:24:05
 */

import React from 'react'
import './progress.less'

let Progress = React.createClass({
	getDefaultProps(){
	   return {
	   	barColor: '#2f98442'
	   }
	},
	changeProgress(e){
       let progressBar = this.refs.progressBar;
       let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
       this.props.onProgressChange && this.props.onProgressChange(progress)
	},
	render() {
		return (
			<div className="components-progress" ref="progressBar"
			   onClick={this.changeProgress}
			 >
			    <div 
			      className="progress"
			      style={{width: `${this.props.progress}%`, background: this.props.barColor}}
			      >
			      </div>
            </div>
		)
	}
})

export default Progress