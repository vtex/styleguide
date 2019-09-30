import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class SimpleBasket extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('simple-basket')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M7.384,31l6.642,28.229C14.133,59.681,14.536,60,15,60h34c0.464,0,0.867-0.319,0.974-0.771L56.616,31H7.384z " />
        <path
          data-color="color-2"
          d="M62,21H50.535L38.832,3.445c-0.307-0.46-0.928-0.584-1.387-0.277 c-0.459,0.306-0.583,0.927-0.277,1.387L48.132,21H15.868L26.832,4.555c0.306-0.459,0.182-1.081-0.277-1.387 c-0.46-0.307-1.081-0.183-1.387,0.277L13.465,21H2c-0.552,0-1,0.448-1,1v6c0,0.552,0.448,1,1,1h60c0.552,0,1-0.448,1-1v-6 C63,21.448,62.552,21,62,21z" />
      </svg>

    )
  }
}

SimpleBasket.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

SimpleBasket.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default SimpleBasket
