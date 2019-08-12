import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../Input'

class ObjectAtom extends React.Component {
  static EmptyObjectAtom = () => (
    <div className="flex-auto">
      <div className="mh3 mb3">
        <Input disabled />
      </div>
    </div>
  )

  render() {
    const {
      disabled,
      isFullWidth,
      object,
      objectComponent,
      onChange,
      onError,
    } = this.props

    if (disabled) {
      return <ObjectAtom.EmptyObjectAtom />
    }

    return (
      <div className="mh3 flex-auto">
        {React.cloneElement(objectComponent, {
          isFullWidth,
          object,
          onChange,
          onError,
        })}
      </div>
    )
  }
}

ObjectAtom.propTypes = {
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** Current selected object for this Statement */
  object: PropTypes.any,
  /** Possible options and respective data types, verb options */
  objectComponent: PropTypes.node.isRequired,
  /** Object Value changed callback */
  onChange: PropTypes.func.isRequired,
  /** Statement Error changed callback */
  onError: PropTypes.func.isRequired,
}

export default ObjectAtom
