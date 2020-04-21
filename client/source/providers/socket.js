import React, { createContext, PureComponent } from 'react'
import Socket from 'socket.io-client'

const SocketContext = createContext(
  {
    connected: false,
    socket: null,
  }
)

export class SocketProvider extends PureComponent {
  state = {
    connected: false,
    socket: null,
  }

  componentDidMount () {
    this.socket = Socket('http://localhost:3001')

    this.socket.on('connect',
      () => this.setState(
        { connected: true }
      )
    )

    this.socket.on('disconnect',
      () => this.setState(
        { connected: false }
      )
    )

    this.setState(
      { socket: this.socket }
    )
  }

  componentWillUnmount () {
    this.socket.disconnect()
  }

  render () {
    return (
      <SocketContext.Provider value={this.state}>
        { this.state.connected && this.props.children }
      </SocketContext.Provider>
    )
  }
}

export const SocketConsumer = SocketContext.Consumer
