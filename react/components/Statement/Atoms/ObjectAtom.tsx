import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../Input'

type Props = {
  /** Disabled state */
  disabled?: boolean
  /** Current selected object for this Statement */
  object: unknown
  /** Object Value changed callback */
  onChange: () => void
  /** Statement Error changed callback */
  onError: () => void
  /** Possible options and respective data types, verb options */
  renderObject: ({
    object,
    onChange,
    onError,
  }: Pick<Props, 'object' | 'onChange' | 'onError'>) => React.ReactElement
}

const EmptyObjectAtom = () => (
  <div className="flex-auto">
    <div className="mh3 mb3">
      <Input disabled />
    </div>
  </div>
)

const ObjectAtom: React.FC<Props> = ({
  disabled,
  object,
  onChange,
  onError,
  renderObject,
}) => {
  if (disabled) {
    return <EmptyObjectAtom />
  }

  return (
    <div className="mh3 flex-auto">
      {renderObject({ object, onChange, onError })}
    </div>
  )
}

export default ObjectAtom
