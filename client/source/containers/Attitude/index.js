import './index.scss'

import PropTypes from 'prop-types'
import React from 'react'

import { connectify } from '../../decorators/connection'

function Attitude (
  {
    pitch,
    roll,
  }
) {
  const radarStyle = {
    transform: `rotate(${ -45 - roll }deg)`,
  }
  
  const windowStyle = {
    transform: `rotate(45deg)`,
  }

  const topStyle = {
    height: `${ 50 + pitch * 50 / 90 }%`
  }

  const bottomStyle = {
    height: `${ 50 - pitch * 50 / 90 }%`
  }

  return (
    <div className='attitude'>
      <h2 className='attitude__title'>
        Attitude
      </h2>
      <div className='attitude__container'>
        <div className='attitude__radar' style={radarStyle}>
          <div className='attitude__window' style={windowStyle}>
            <div className='attitude__top' style={topStyle} />
            <div className='attitude__bottom' style={bottomStyle} />
          </div>
        </div>
        <div className='attitude__crosshair' />
      </div>
    </div>
  )
}

export default connectify(Attitude,
  { pitch: 0, roll: 0 }
)
