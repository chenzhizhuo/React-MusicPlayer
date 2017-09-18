/*
 * @Author: chenzhizhuo
 * @Date: 2017 - 08 - 15 23: 07: 16 * @Last Modified by:   chenzhizhuo
 * @Last Modified time: 2017-08-21 22:04:34
 */

import React from 'react'
import './header.less'

let Header = React.createClass({
	render() {
		return ( < div className = "components-header row" > < img src = "static/images/logo.png"
			width = "40"
			alt = ""
			className = "-col-auto" / > < h1 className = "caption" > React Music Player < /h1> < /div > )
	}
})

export default Header