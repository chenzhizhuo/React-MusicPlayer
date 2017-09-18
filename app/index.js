import React from 'react'
import {
	render
} from 'react-dom';
/*import {
	AppContainer
} from 'react-hot-loader'*/
import Root from './root'

render(
	<Root />,
	document.getElementById('root')
);
//热加载 修改文件保存后页面局部更新，不会整页刷新。
//这样的好处，可以保持修改前的状态