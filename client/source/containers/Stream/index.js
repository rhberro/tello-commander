import './index.scss'

import React, { PureComponent } from 'react'

import { connect } from '../../decorators/connection.js'

class Stream extends PureComponent {
  componentDidMount () {
    const { socket } = this.props;

    this.player = vxgplayer(
      'stream__player',
      {
        url: '',
        nmf_path: 'media_player.nmf',
        nmf_src: 'static/vxgplayer-1.8.51/pnacl/Release/media_player.nmf',
        latency: 300000,
        avsync: true,
        aspect_ratio: true,
        aspect_ratio_mode: 2,
        controls: false,
        connection_timeout: 5000,
        connection_udp: 1,
        custom_digital_zoom: false,
        mute: true,
        volume: 0,
        width: 960,
        height: 720,
      }
    ).ready(this.onPlayerReady)
  }

  onPlayerReady () {
    vxgplayer('stream__player').src('udp://192.168.10.1:11111');
    vxgplayer('stream__player').play();
  }

  render () {
    return (
      <div className='stream'>
        <div className='stream__player vxgplayer' id='stream__player' />
      </div>
    )
  }
}

export default connect(Stream)
