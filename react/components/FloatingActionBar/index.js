import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { createPortal } from 'react-dom'

const FLOATING_ACTION_BAR_ID = 'vtex.styleguide-action-bar'

const FloatingActionBar = ({
  onSave,
  onCancel,
  cancelLabel,
  saveLabel,
  parentId,
}) => {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const parent = document.getElementById(parentId)
    if (
      document &&
      parent &&
      !document.getElementById(FLOATING_ACTION_BAR_ID)
    ) {
      const barContainer = document.createElement('div')

      barContainer.setAttribute('id', FLOATING_ACTION_BAR_ID)
      parent.appendChild(barContainer)

      return setContainer(barContainer)
    }
  }, [])

  const content = (
    <div className="w-100 bg-base shadow-1 tr pv5 pr7 absolute fixed bottom-0">
      <span className="mr5">
        <Button variation="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </span>
      <span>
        <Button variation="primary" onClick={onSave}>
          {saveLabel}
        </Button>
      </span>
    </div>
  )

  return container ? createPortal(content, container) : null
}

FloatingActionBar.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  saveLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  parentId: PropTypes.string.isRequired,
}

export default FloatingActionBar
