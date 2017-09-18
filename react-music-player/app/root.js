/*
 * @Author: chenzhizhuo
 * @Date:   2017-08-16 22:16:49
 * @Last Modified by:   chenzhizhuo
 * @Last Modified time: 2017-09-12 22:23:21
 */

import React from 'react'
import {
	browerHistory,
	Router,
	Route,
	IndexRoute,
	hashHistory
} from 'react-router'; //这里装了个3.x 版本 ， 4.x版本引用会报错
import * as rt from 'react-router';
import Header from './components/header'
import Player from './page/player'
import * as list from './config/musiclist'
import MusicList from './page/MusicList'
import Pubsub from 'pubsub-js' //事件订阅管理器

let App = React.createClass({
	getInitialState() {
		return {
			//这里定义的state ，需要与组件传的属性名一致
			musicList: list.MUSIC_LIST,
			currentMusicItem: list.MUSIC_LIST[0]
		}
	},
	playMusic(musicItem) {
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem: musicItem
		})
	},
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null
		let musicListLength = this.state.musicList.length
		if (type === 'next') {
			newIndex = (index + 1) % musicListLength
		} else {
			newIndex = (index - 1 + musicListLength) % musicListLength
		}
		this.playMusic(this.state.musicList[newIndex]);
	},
	findMusicIndex(musicItem) {
		return this.state.musicList.indexOf(musicItem)
	},
	componentDidMount() {
		$('#player').jPlayer({
			supplied: 'mp3',
			wmode: 'window'
		});
		this.playMusic(this.state.currentMusicItem);
		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		})
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item => {
					return item != musicItem
				})
			})
		})
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem)
		})
		Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
			this.playNext('prev')
		})
		Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
			this.playNext('next')
		})
	},
	componentWillUnMount() {
		//解除事件绑定
		Pubsub.unsubscribe('PLAY_MUSIC')
		Pubsub.unsubscribe('DELETE_MUSIC')
		Pubsub.unsubscribe('PLAY_PREV')
		Pubsub.unsubscribe('PLAY_NEXT')
	},
	render() {
		return (
			<div>
				<Header /> 
				{ 
					//下面方法通过路由克隆了APP下的子组件及各组件间的state到对应组件
					React.cloneElement(this.props.children, this.state)
				}
			</div>
		)
	}
});

let Root = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
			<Route path='/' component={App}>
              <IndexRoute component={Player}></IndexRoute>
              <Route path='/list' component={MusicList}></Route>
	        </Route>
		</Router>
		)
	}
})

export default Root;