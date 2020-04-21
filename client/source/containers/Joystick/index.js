import './index.scss'

import React, { useState, useEffect } from 'react'

// const [buttonA, buttonB, buttonX, buttonY, buttonLB, buttonRB, buttonLT, buttonRT, buttonSELECT, buttonSTART, buttonLS, buttonRS, buttonUP, buttonDOWN, buttonLEFT, buttonRIGHT] = buttons

function Gamepad () {
  const [gamepad, setGamepad] = useState(null)

  const [axes, setAxes] = useState(
    {
      leftX: 0,
      leftY: 0,
      rightX: 0,
      rightY: 0,
    }
  )

  const onGamepadConnected = event => {
    const { gamepad } = event
    setGamepad(gamepad)
  }

  const onGamepadDisconnected = event => {
    setGamepad(null)
  }

  const checkGamepad = () => {
    const [
      {
        axes: [
          leftX,
          leftY,
          rightX,
          rightY
        ]
      }
    ] = navigator.getGamepads()

    if (
      leftX === axes.leftX &&
      leftY === axes.leftY &&
      rightX === axes.rightX &&
      rightY === axes.rightY
    ) {
      return
    }

    setAxes(
      {
        leftX,
        leftY,
        rightX,
        rightY
      }
    )
  }

  useEffect(
    () => {
      console.log('useEffect')
      window.addEventListener('gamepadconnected', onGamepadConnected)
      window.addEventListener('gamepaddisconnected', onGamepadDisconnected)
      const checkGamepadInterval = setInterval(checkGamepad, 50)
    
      return () => {
        console.log('useEffect useEffect')
        window.removeEventListener('gamepadconnected', onGamepadConnected)
        window.removeEventListener('gamepaddisconnected', onGamepadDisconnected)
        clearInterval(checkGamepadInterval)
      };
    }, [gamepad, axes]
  );

  const leftStickStyle = {
    left: `${axes.leftX * 50 + 50}%`,
    top: `${axes.leftY * 50 + 50}%`,
  }

  const rightStickStyle = {
    left: `${axes.rightX * 50 + 50}%`,
    top: `${axes.rightY * 50 + 50}%`,
  }

  return (
    <div className='gamepad'>
      <h2 className='gamepad__title'>
        Gamepad <span className='gamepad__description'>{ gamepad && gamepad.id }</span>
      </h2>
      <div className='gamepad__container'>
        <div className='gamepad__joystick'>
          <div className='gamepad__stick' style={leftStickStyle} />
        </div>
        <div className='gamepad__joystick'>
          <div className='gamepad__stick' style={rightStickStyle} />
        </div>
      </div>
    </div>
  )
}

export default Gamepad
