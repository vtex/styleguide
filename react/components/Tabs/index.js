import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Tabs extends PureComponent {
  render() {
    const { options, active } = this.props
    return (
      <div className="flex flex-row bb b--light-gray mid-gray overflow-y-auto">
        {options.map(option => (
          <button
            id={option.id}
            key={option.id}
            type="button"
            onClick={e => option.onClick(e)}
            className={`vtex-tab__button pointer bt-0 bl-0 br-0 bw1 ${
              option.id === active
                ? 'near-black b--rebel-pink'
                : 'mid-gray b--transparent'
            } hover-near-black fw5 fw4 v-mid relative pv5 ph4 f5 bg-transparent outline-0`}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  }
}

Tabs.propTypes = {
  active: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.any.isRequired,
    onClick: PropTypes.func,
  })).isRequired,
}

export default Tabs
