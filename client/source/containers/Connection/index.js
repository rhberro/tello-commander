import './index.scss'

import React from 'react'

import { connectify } from '../../decorators/connection'

import Bar from '../../components/Bar';

function Connection (
  {
    connection,
  }
) {
  return (
    <div className='connection'>
      <Bar
        maximum={100}
        minimum={0}
        value={connection} />
    </div>
  )
}

export default connectify(Connection,
  { connection: 0 }
)
