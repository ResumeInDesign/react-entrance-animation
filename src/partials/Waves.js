import React from 'react'
import PropTypes from 'prop-types'

const Waves = ({ speed, color }) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    x='0'
    y='0'
    width='100%'
    height='55'
    xmlSpace='preserve'
  >
    <pattern
      id='water'
      width='0.25'
      height='1.1'
      patternContentUnits='objectBoundingBox'
    >
      <path
        fill={color}
        d='M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z'
      />
    </pattern>
    <rect
      className='water-fill'
      fill='url(#water)'
      y='05'
      width='4000px'
      height='120'
      opacity='0.5'
    >
      <animate
        attributeType='xml'
        attributeName='x'
        from={-750 * 2}
        to={-250 * 2}
        repeatCount='indefinite'
        dur={`${4 / speed}s`}
      />
    </rect>
    <rect
      className='water-fill'
      fill='url(#water)'
      y='15'
      width='4000px'
      height='130'
      opacity='0.75'
    >
      <animate
        attributeType='xml'
        attributeName='x'
        from={-500 * 2}
        to={0 * 2}
        repeatCount='indefinite'
        dur={`${5 / speed}s`}
      />
    </rect>
    <rect
      className='water-fill'
      fill='url(#water)'
      y='25'
      width='4000px'
      height='140'
      opacity='1'
    >
      <animate
        attributeType='xml'
        attributeName='x'
        from={-250 * 2}
        to={-750 * 2}
        repeatCount='indefinite'
        dur={`${6 / speed}s`}
      />
    </rect>
  </svg>
)

Waves.propTypes = {
  speed: PropTypes.number,
  color: PropTypes.string
}

export default Waves
