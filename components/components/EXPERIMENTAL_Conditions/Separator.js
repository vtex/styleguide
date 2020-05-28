import React from 'react'
import PropTypes from 'prop-types'

class Separator extends React.Component {
  render() {
    const { label } = this.props

    return (
      <div>
        <div
          style={{
            marginLeft: -17,
            width: 'calc(100% + 34px)',
          }}
          className="flex flex-row w-100 nowrap items-center mv3">
          <hr className="ma0 b--black-10 bb bb-0 w-100" />
        </div>
        <div className="w-100 tc" style={{ marginTop: -18 }}>
          <span className="gray ph3 dib bg-white">{label}</span>
        </div>
      </div>
    )
  }
}

Separator.propTypes = {
  /** `and` or `or` label */
  label: PropTypes.string,
}

export default Separator
