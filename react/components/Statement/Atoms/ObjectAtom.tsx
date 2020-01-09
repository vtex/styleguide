import React from 'react'

import Input from '../../Input/index'

export type ObjectOption = (renderProps: RenderProps) => React.ReactElement

type RenderProps = {
  error: Props['error']
  onChange: Props['onChange']
  value: Props['object']
}

type Props = {
  /** Disabled state */
  disabled?: boolean
  /** Statement error message */
  error?: string
  /** Current selected object for this Statement */
  object: unknown
  /** Object Value changed callback */
  onChange: (value: Props['object'], error?: Props['error']) => void
  /** Possible options and respective data types, verb options */
  renderObject: ObjectOption
}

const EmptyObjectAtom = () => (
  <div className="flex-auto mh3">
    <Input disabled />
  </div>
)

const ObjectAtom: React.FC<Props> = ({
  disabled,
  error,
  object,
  onChange,
  renderObject,
}) => {
  if (disabled) {
    return <EmptyObjectAtom />
  }

  return (
    <div className="mh3 flex-auto">
      {renderObject({
        error,
        onChange,
        value: object,
      })}
    </div>
  )
}

export default ObjectAtom
