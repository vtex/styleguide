import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import TotalizerLabel from './TotalizerLabel'
import TotalizerValue from './TotalizerValue'
import TotalizerIcon from './TotalizerIcon'

const BORDER_COLOR = 'b--muted-4'

class Totalizer extends PureComponent {
  render() {
    const { items, mobileScroll } = this.props

    const OUTER_CONTAINER_CLASSES = classnames({
      'overflow-x-hidden': mobileScroll,
    })

    const INNER_CONTAINER_CLASSES = classnames(
      `w-100 flex flex-row-ns ba br3 ${BORDER_COLOR}`,
      {
        'flex-row overflow-y-hidden overflow-x-scroll overflow-x-hidden-ns': mobileScroll,
        'flex-column': !mobileScroll,
      }
    )

    const TOTALIZER_BASE_CLASSES = classnames(
      `flex flex-column pa4 ${BORDER_COLOR}`,
      {
        'flex-auto-ns': mobileScroll,
        'flex-auto': !mobileScroll,
      }
    )

    const invertedMargin = 2

    if (items.length === 0) {
      return null
    }

    return (
      <div className={OUTER_CONTAINER_CLASSES}>
        <div className={INNER_CONTAINER_CLASSES}>
          {items.map((item, i) => {
            const IS_NOT_LAST = items.length > 1 && i < items.length - 1

            const EXTRA_BORDER = classnames({
              'bb bb-0-ns br-ns ': IS_NOT_LAST,
              'bb-0 ': mobileScroll,
              br: mobileScroll && IS_NOT_LAST,
            })

            const ITEM_CLASSES = classnames(
              `${TOTALIZER_BASE_CLASSES} ${EXTRA_BORDER}`
            )

            return (
              <div className={ITEM_CLASSES} key={item.label}>
                {item.icon ? (
                  <div className="item_container flex flex-row">
                    <TotalizerIcon item={item} />

                    <div>
                      <TotalizerLabel
                        label={item.label}
                        mobileScroll={mobileScroll}
                      />
                      <TotalizerValue item={item} mobileScroll={mobileScroll} />
                    </div>
                  </div>
                ) : (
                  <>
                    {item.inverted && (
                      <div className={`mb${invertedMargin}`}>
                        <TotalizerValue
                          item={item}
                          mobileScroll={mobileScroll}
                        />
                      </div>
                    )}
                    <TotalizerLabel
                      label={item.label}
                      mobileScroll={mobileScroll}
                    />
                    {!item.inverted && (
                      <div className={`mt${invertedMargin}`}>
                        <TotalizerValue
                          item={item}
                          mobileScroll={mobileScroll}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

Totalizer.defaultProps = {
  value: null,
  iconBackgroundColor: '',
  icon: null,
  isLoading: false,
  mobileScroll: false,
}

Totalizer.propTypes = {
  /** Sets the items horizontally instead of vertically on mobile. */
  mobileScroll: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node,
      iconBackgroundColor: PropTypes.string,
      icon: PropTypes.node,
      isLoading: PropTypes.bool,
      invertedWeight: PropTypes.bool,
    })
  ).isRequired,
}

export default Totalizer
