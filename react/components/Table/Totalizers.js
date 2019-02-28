import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import TotalizerLabel from './totalizers/TotalizerLabel'
import TotalizerValue from './totalizers/TotalizerValue'
import TotalizerIcon from './totalizers/TotalizerIcon'

const BORDER_COLOR = 'b--light-gray'

const TOTALIZERS_CLASSES = `w-100 flex flex-column flex-row-ns ba br3 mb5 ${BORDER_COLOR}`
const TOTALIZER_CLASSES = `flex flex-column flex-auto pa4 ${BORDER_COLOR}`

class Totalizers extends PureComponent {
  render() {
    const { items } = this.props

    if (items.length > 0) {
      return (
        <div id="totalizers" className={TOTALIZERS_CLASSES}>
          {items.map((item, i) => {
            const IS_NOT_LAST = items.length > 1 && i < items.length - 1
            const EXTRA_BORDER = IS_NOT_LAST ? 'bb bb-0-ns br-ns' : ''

            return (
              <div className={`${TOTALIZER_CLASSES} ${EXTRA_BORDER}`} key={i}>
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

    return null
  }
}

Totalizers.propTypes = {
  items: PropTypes.array.isRequired,
}

export default Totalizers
