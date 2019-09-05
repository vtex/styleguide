import React from 'react'
import Select from '../../EXPERIMENTAL_Select/index'
import PropTypes from 'prop-types'
import { withForwardedRef, refShape } from '../../../modules/withForwardedRef'

const propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Select disabled state */
  disabled: PropTypes.bool,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** Current selected verb for this Statement */
  verb: PropTypes.string,
  /** Possible options and respective data types, verb options */
  verbOptions: PropTypes.array.isRequired,
  /** Value changed callback */
  onChange: PropTypes.func.isRequired,
}

type Props = PropTypes.InferProps<typeof propTypes>

const VerbAtom: React.FC<Props> = ({
  disabled,
  forwardedRef,
  isFullWidth,
  onChange,
  verb,
  verbOptions,
}) => {
  const value = verbOptions.find(option => option.value === verb)

  return (
    <div
      className={`mh3 ${isFullWidth ? 'pb3' : ''}`}
      style={{ minWidth: '20%' }}>
      <Select
        ref={forwardedRef}
        clearable={false}
        disabled={disabled}
        multi={false}
        onChange={option => onChange(option && option.value)}
        options={verbOptions}
        placeholder=""
        value={value}
      />
    </div>
  )
}

export default withForwardedRef(VerbAtom)
