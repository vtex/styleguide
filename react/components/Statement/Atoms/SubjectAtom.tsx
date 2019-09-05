import React from 'react'
import Select from '../../EXPERIMENTAL_Select/index'
import PropTypes from 'prop-types'
import { withForwardedRef, refShape } from '../../../modules/withForwardedRef'

const ATOM_COMPONENT_MIN_WIDTH = '20%'

const propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Current selected subject for this Statement */
  subject: PropTypes.string,
  /** onChange callback */
  onChange: PropTypes.func.isRequired,
  /** Possible options and respective data types, verb options */
  options: PropTypes.object.isRequired,
  /** Placeholder for dropdown */
  placeholder: PropTypes.string.isRequired,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
}

type Props = PropTypes.InferProps<typeof propTypes>

const SubjectAtom: React.FC<Props> = ({
  forwardedRef,
  isFullWidth,
  onChange,
  options,
  placeholder,
  subject,
}) => {
  const subjectOptions = Object.keys(options).map(subject => {
    return {
      value: subject,
      label: options[subject].label || subject,
    }
  })

  const value = subjectOptions.find(option => option.value === subject)

  return (
    <div
      className={`mh3 ${isFullWidth ? 'pb3' : ''}`}
      style={{ minWidth: ATOM_COMPONENT_MIN_WIDTH }}>
      <Select
        ref={forwardedRef}
        clearable={false}
        multi={false}
        onChange={option => onChange(option && option.value)}
        options={subjectOptions}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

export default withForwardedRef(SubjectAtom)
