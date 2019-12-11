import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TotalizerLabel from './TotalizerLabel'
import TotalizerValue from './TotalizerValue'
import TotalizerIcon from './TotalizerIcon'

const BORDER_COLOR = 'b--muted-4'

class Totalizer extends PureComponent {
  render() {
    const { items, mobileScroll } = this.props

    const OUTER_CONTAINER_CLASSES = mobileScroll ? 'overflow-x-hidden' : ''

    let INNER_CONTAINER_CLASSES = `w-100 flex flex-row-ns ba br3 mb5 ${BORDER_COLOR} `
    INNER_CONTAINER_CLASSES += mobileScroll
      ? 'flex-row overflow-y-hidden overflow-x-scroll overflow-x-hidden-ns'
      : 'flex-column'

    let TOTALIZER_BASE_CLASSES = `flex flex-column pa4 ${BORDER_COLOR} `
    TOTALIZER_BASE_CLASSES += mobileScroll ? 'flex-auto-ns' : 'flex-auto'

    if (items.length === 0) {
      return null
    }

    return (
      <div className={OUTER_CONTAINER_CLASSES}>
        <div className={INNER_CONTAINER_CLASSES}>
          {items.map((item, i) => {
            const IS_NOT_LAST = items.length > 1 && i < items.length - 1
            let EXTRA_BORDER = IS_NOT_LAST ? 'bb bb-0-ns br-ns ' : ''

            if (mobileScroll) {
              EXTRA_BORDER += 'bb-0 '
            }
            if (mobileScroll && IS_NOT_LAST) {
              EXTRA_BORDER += 'br '
            }

            return (
              <div
                className={`${TOTALIZER_BASE_CLASSES} ${EXTRA_BORDER}`}
                key={item.label}
              >
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
                    <TotalizerLabel
                      label={item.label}
                      mobileScroll={mobileScroll}
                    />
                    <TotalizerValue item={item} mobileScroll={mobileScroll} />
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
    })
  ).isRequired,
}

export default Totalizer
