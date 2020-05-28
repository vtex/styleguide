import PropTypes from 'prop-types'
import React from 'react'
import { MdCode } from 'react-icons/md'
// import { TabButton } from 'rsg-components'

// const CodeTabButton = props => (
//   <TabButton {...props}>
//     <MdCode /> {props.active ? 'Hide code' : 'Show code'}
//   </TabButton>
// )

const CodeTabButton = props => (
  <div>{props.active ? 'Hide code' : 'Show code'}</div>
)

CodeTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
}

export default CodeTabButton
