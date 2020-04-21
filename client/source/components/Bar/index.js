import './index.scss'

import PropTypes from 'prop-types'
import React from 'react'

import classnames from '../../utilities/classnames'

function Bar (
  {
    maximum,
    minimum,
    value,
  }
) {
  const isLow = value < 30;
  const isMedium = !isLow && !isHigh;
  const isHigh = value > 60;

  const containerClassName= classnames(
    'bar__container',
    {
      'bar__container--low': isLow,
      'bar__container--medium': isMedium,
      'bar__container--high': isHigh,
    }
  )

  const progressClassName = classnames(
    'bar__progress',
    {
      'bar__progress--low': isLow,
      'bar__progress--medium': isMedium,
      'bar__progress--high': isHigh,
    }
  )

  const progressStyle = {
    width: `${ value }%`
  }

  return (
    <div className='bar'>
      <div className={containerClassName}>
        <div className={progressClassName} style={progressStyle} />
      </div>
    </div>
  )
}

Bar.propTypes = {
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

export default Bar
