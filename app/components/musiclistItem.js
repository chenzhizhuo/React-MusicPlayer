import React from 'react'
import './musiclistItem.less'
import Pubsub from 'pubsub-js' //事件订阅管理器

let MusicListItem = React.createClass({
	playMusic(musicItem) {
		Pubsub.publish('PLAY_MUSIC', musicItem)
	},
	deleteMusic(musicItem, e) {
		e.stopPropagation(); //事件冒泡处理
		Pubsub.publish('DELETE_MUSIC', musicItem)
	},
	render() {
		let musicItem = this.props.musicItem
		return (
			<li onClick={this.playMusic.bind(this, musicItem)} className={`components-listitem row ${this.props.focus? 'focus':''}`}>
             <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
             <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
          </li>
		)
	}
})

export default MusicListItem