import React from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import './index.scss'

export const SIZE_SM = 'sm'
export const SIZE_LG = 'lg'
export const COLOR_DARK = 'dark'
export const COLOR_LIGHT = 'light'

const LoadingDot = (props) => (
  <span
    className={classNames('loading-dot spinner-grow mx-auto my-auto', {
      'spinner-grow-sm': props.size === SIZE_SM,
      'spinner-grow-lg': props.size === SIZE_LG,
      'text-dark': props.color === COLOR_DARK,
      'text-light': props.color === COLOR_LIGHT,
      'loading-dot-sm': props.size === SIZE_SM,
      'loading-dot-lg': props.size === SIZE_LG,
    })}
    role="status"
  ></span>
)

LoadingDot.propTypes = {
  size: propTypes.oneOf([SIZE_SM, SIZE_LG]),
  color: propTypes.oneOf([COLOR_DARK, COLOR_LIGHT]),
}

LoadingDot.defaultProps = {
  size: SIZE_SM,
  color: COLOR_DARK,
}

export default LoadingDot
