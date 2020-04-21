import './index.scss'

import PropTypes from 'prop-types'
import React from 'react'

import { connectify } from '../../decorators/connection'

function Speedometer (
  {
    speedx,
  }
) {
  const pointerStyle = {
    transform: `translate(-80%, -50%) rotate(${ speedx * 180 / 100 }deg)`
  }

  return (
    <div className='speedometer'>
      <h2 className='speedometer__title'>
        Speedometer <span className='speedometer__description'>{ Math.abs(speedx) } cm/s</span>
      </h2>
      <div className='speedometer__container'>
        <div className='speedometer__meter'>Speed</div>
        <div className='speedometer__unit'>Centimeters per second</div>
        <div className='speedometer__steps'>
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
          <div className='speedometer__step' />
        </div>
        <div className='speedometer__pointer' style={pointerStyle} />
      </div>
    </div>
  )
}

export default connectify(Speedometer,
  { speedx: 0 }
)
