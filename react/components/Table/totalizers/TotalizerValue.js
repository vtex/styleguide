import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

import Spinner from '../../Spinner'

class TotalizerValue extends PureComponent {
  render() {
    const {
      item: { value, isLoading },
    } = this.props

    if (isLoading) {
      return (
        <div className="mt2">
          <Spinner
            size="14"
            color={config.semanticColors.background['base--inverted']}
          />
        </div>
      )
    }

    if (value) {
      return <div className="f4 fw5 c-on-base">{value}</div>
    }

    return null
  }
}

TotalizerValue.propTypes = {
  item: PropTypes.object,
}

export default TotalizerValue
