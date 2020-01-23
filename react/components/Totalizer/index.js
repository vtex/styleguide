import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TotalizerLabel from './TotalizerLabel'
import TotalizerValue from './TotalizerValue'
import TotalizerIcon from './TotalizerIcon'

const BORDER_COLOR = 'b--muted-4'

class Totalizer extends PureComponent {
  render() {
    const { items, mobileScroll, horizontalLayout } = this.props

    const OUTER_CONTAINER_CLASSES = classNames({
      'overflow-x-hidden': mobileScroll,
    })

    const INNER_CONTAINER_CLASSES = classNames(
      `w-100 flex flex-row-ns ba br3 ${BORDER_COLOR}`,
      {
        'flex-row overflow-y-hidden overflow-x-scroll overflow-x-hidden-ns': mobileScroll,
        'flex-column': !mobileScroll,
      }
    )

    const TOTALIZER_BASE_CLASSES = classNames(
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

            const EXTRA_BORDER = classNames({
              'bb bb-0-ns br-ns ': IS_NOT_LAST,
              'bb-0 ': mobileScroll,
              br: mobileScroll && IS_NOT_LAST,
            })

            const ITEM_CLASSES = classNames(
              `${TOTALIZER_BASE_CLASSES} ${EXTRA_BORDER}`
            )

            const WITH_ICON_CONTAINER_CLASSES = classNames(
              'item_container flex flex-row',
              {
                'items-center': horizontalLayout,
              }
            )

            const WITH_ICON_ITEM_CONTAINER_CLASSES = classNames(
              'item_container',
              {
                'flex flex-row items-baseline': horizontalLayout,
              }
            )

            const WITHOUT_ICON_ITEM_CONTAINER_CLASSES = classNames(
              'item_container',
              {
                'flex flex-row items-baseline': horizontalLayout,
              }
            )

            return (
              <div className={ITEM_CLASSES} key={item.label}>
                {item.icon ? (
                  <div className={WITH_ICON_CONTAINER_CLASSES}>
                    <TotalizerIcon item={item} />

                    <div className={WITH_ICON_ITEM_CONTAINER_CLASSES}>
                      {item.inverted && (
                        <div className={horizontalLayout ? 'mr3' : ''}>
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
                        <TotalizerValue
                          item={item}
                          mobileScroll={mobileScroll}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={WITHOUT_ICON_ITEM_CONTAINER_CLASSES}>
                    {item.inverted && (
                      <div
                        className={`m${
                          horizontalLayout ? 'r' : 'b'
                        }${invertedMargin}`}>
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
                  </div>
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
  horizontalLayout: false,
}

export const totalizerPropTypes = {
  /** Sets the items horizontally instead of vertically on mobile. */
  mobileScroll: PropTypes.bool,
  horizontalLayout: PropTypes.bool,
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

Totalizer.propTypes = totalizerPropTypes

export default Totalizer
