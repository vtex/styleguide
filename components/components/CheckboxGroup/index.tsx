import React, { Component } from 'react'
import PropTypes from 'prop-types'
import some from 'lodash/some'
import every from 'lodash/every'

import Checkbox from '../Checkbox'

class CheckboxGroup extends Component {
  constructor(props) {
    super(props)
    this.state = { groupChecked: false }
  }

  isPartiallyChecked = () => {
    const { checkedMap } = this.props
    const checkedValues = Object.values(checkedMap).map(value => value.checked)
    return some(checkedValues) && !every(checkedValues)
  }

  isFullyChecked = () => {
    const { checkedMap } = this.props
    const checkedValues = Object.values(checkedMap).map(value => value.checked)
    return every(checkedValues)
  }

  handleOnChange = key => {
    const { checkedMap } = this.props
    const newCheckedMap = {
      ...checkedMap,
      [key]: { ...checkedMap[key], checked: !checkedMap[key].checked },
    }
    this.props.onGroupChange(newCheckedMap)
  }

  setGroupChecked = value => {
    const { checkedMap } = this.props
    const newCheckedMap = { ...checkedMap }
    Object.keys(checkedMap).forEach(key => {
      newCheckedMap[key].checked = value
    })
    return newCheckedMap
  }

  handleOnGroupChange = () => {
    if (this.isPartiallyChecked() || this.isFullyChecked()) {
      this.props.onGroupChange(this.setGroupChecked(false))
    } else {
      this.props.onGroupChange(this.setGroupChecked(true))
    }
  }

  render() {
    const { checkedMap, disabled, name, id, value, label, padded } = this.props
    return (
      <div>
        <Checkbox
          checked={this.isFullyChecked()}
          partial={this.isPartiallyChecked()}
          id={id}
          name={name}
          onChange={this.handleOnGroupChange}
          value={value}
          disabled={disabled}
          label={label}
        />
        <div className={`${padded ? 'ml7' : ''} mv5`}>
          {Object.keys(checkedMap).map(key => (
            <div key={key} className="mv6">
              <Checkbox
                checked={checkedMap[key].checked}
                id={`${id}-${key}`}
                name={name}
                onChange={() => this.handleOnChange(key)}
                value={`${value}-${key}`}
                disabled={disabled}
                label={checkedMap[key].label}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

CheckboxGroup.defaultProps = {
  disabled: false,
  padded: true,
}

CheckboxGroup.propTypes = {
  /** Map of objects containing the label and the checked value of each checkbox of this group */
  checkedMap: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      checked: PropTypes.bool.isRequired,
    })
  ),
  /** (Input spec attribute) */
  disabled: PropTypes.bool,
  /** (Input spec attribute) */
  id: PropTypes.string.isRequired,
  /** Checkbox Group label (i.e. main checkbox label)*/
  label: PropTypes.string,
  /** (Input spec attribute) */
  name: PropTypes.string.isRequired,
  /** onChange event for the checkedMap object */
  onGroupChange: PropTypes.func.isRequired,
  /** (Input spec attribute) */
  value: PropTypes.string.isRequired,
  /** Setting for the padding, set it for false if want the inner checkboxes with no padding in relation to the main checkbox */
  padded: PropTypes.bool,
}

export default CheckboxGroup
