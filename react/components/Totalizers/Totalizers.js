import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import TotalizerLabel from './TotalizerLabel'
import TotalizerValue from './TotalizerValue'
import TotalizerIcon from './TotalizerIcon'

const BORDER_COLOR = 'b--muted-4'

const TOTALIZERS_CLASSES = `w-100 flex flex-column flex-row-ns ba br3 mb5 ${BORDER_COLOR}`
const TOTALIZER_CLASSES = `flex flex-column flex-auto pa4 ${BORDER_COLOR}`

class Totalizers extends PureComponent {
  render() {
    const { items } = this.props

    if (items.length === 0) {
      return null
    }

    return (
      <div className={TOTALIZERS_CLASSES}>
        {items.map((item, i) => {
          const IS_NOT_LAST = items.length > 1 && i < items.length - 1
          const EXTRA_BORDER = IS_NOT_LAST ? 'bb bb-0-ns br-ns' : ''

          return (
            <div
              className={`${TOTALIZER_CLASSES} ${EXTRA_BORDER}`}
              key={item.label}>
              {item.icon ? (
                <div className="flex flex-row">
                  <TotalizerIcon item={item} />

                  <div>
                    <TotalizerLabel label={item.label} />
                    <TotalizerValue item={item} />
                  </div>
                </div>
              ) : (
                <Fragment>
                  <TotalizerLabel label={item.label} />
                  <TotalizerValue item={item} />
                </Fragment>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

Totalizers.defaultProps = {
  value: null,
  iconBackgroundColor: '',
  icon: null,
  isLoading: false,
}

Totalizers.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node,
      iconBackgroundColor: PropTypes.string,
      icon: PropTypes.node,
      isLoading: PropTypes.bool,
    })
  ).isRequired,
}

export default Totalizers
