import PropTypes from 'prop-types'
import React from 'react'

import './index.scss'

function Icon (
  {
    name,
  }
) {
  return (
    <svg viewBox='0 0 20 20' className='icon'>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}

Icon.propTypes = {
  /** The icon name. */
  name: PropTypes.string.isRequired
}

export default Icon
