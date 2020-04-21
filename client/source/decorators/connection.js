import React, { PureComponent } from 'react'

import { SocketConsumer } from '../providers/socket.js';

/**
 * Description.
 */
export function connect (WrappedComponent) {
  class EnhancedComponent extends PureComponent {
    render () {
      return (
        <SocketConsumer>
          { props => React.createElement(WrappedComponent, props) }
        </SocketConsumer>
      )
    }
  }

  EnhancedComponent.displayName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Connect'

  return EnhancedComponent
}

/**
 * Description.
 */
export function connectify (WrappedComponent, state) {
  class EnhancedComponent extends PureComponent {
    state = state

    componentDidMount () {
      this.props.socket.on('state-message', this.handleMessage)
    }
  
    componentWillUnmount () {
      this.props.socket.removeListener('state-message', this.handleMessage)
    }
  
    handleMessage = message => {
      Object.keys(state).map(
        this.handleState(message)
      )
    }

    handleState = message => {
      return property => {
        const hasDifference = message.hasOwnProperty(property) && message[property] !== this.state[property]
  
        if (hasDifference) {
          this.setState(
            {
              [property]: message[property],
            }
          )
        }
      }
    }

    render () {
      return React.createElement(WrappedComponent, this.state)
    }
  }

  EnhancedComponent.displayName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Connectify'

  return connect(EnhancedComponent)
}
