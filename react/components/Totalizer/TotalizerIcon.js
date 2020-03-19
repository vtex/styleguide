import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const CIRCLE_DIAMETER = '2.4rem'

class TotalizerIcon extends PureComponent {
  render() {
    const {
      item: { icon, iconBackgroundColor },
      testId,
    } = this.props

    return (
      <div
        data-testid={`${testId}__container`}
        className="flex items-center mr3"
      >
        <div
          data-testid={testId}
          className="flex items-center justify-center br-100 pa3 bg-light-silver c-muted-1"
          style={{
            height: CIRCLE_DIAMETER,
            width: CIRCLE_DIAMETER,
            backgroundColor: iconBackgroundColor,
          }}
        >
          {icon}
        </div>
      </div>
    )
  }
}

TotalizerIcon.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    iconBackgroundColor: PropTypes.string,
  }).isRequired,
  testId: PropTypes.string,
}

export default TotalizerIcon
