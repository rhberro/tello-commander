import './index.scss'

import PropTypes from 'prop-types'
import React from 'react'

import { connectify } from '../../decorators/connection'

function Variometer (
  {
    speedz,
  }
) {
  const pointerStyle = {
    transform: `translate(-80%, -50%) rotate(${ -speedz * 180 / 100 }deg)`
  }

  return (
    <div className='variometer'>
      <h2 className='variometer__title'>
        Variometer <span className='variometer__description'>{ Math.abs(speedz) } cm/s</span>
      </h2>
      <div className='variometer__container'>
        <div className='variometer__meter'>Vertical speed</div>
        <div className='variometer__unit'>Centimeters per second</div>
        <div className='variometer__steps'>
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
          <div className='variometer__step' />
        </div>
        <div className='variometer__pointer' style={pointerStyle} />
      </div>
    </div>
  )
}

export default connectify(Variometer,
  { speedz: 0 }
)
