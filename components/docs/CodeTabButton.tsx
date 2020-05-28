import React from 'react'
import PropTypes from 'prop-types'
import TabButton from 'rsg-components/TabButton'
import { MdCode } from 'react-icons/md'

const CodeTabButton = props => (
  <TabButton {...props}>
    <MdCode /> {props.active ? 'Hide code' : 'Show code'}
  </TabButton>
)

CodeTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
}

export default CodeTabButton
