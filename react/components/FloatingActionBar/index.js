import React from 'react'
import Button from '../Button'
import { createPortal } from 'react-dom'

const FloatingActionBar = ({
  onSave,
  onCancel,
  cancelLabel,
  saveLabel,
  parentId,
}) => {
  if (document && document.createElement) {
    const barContainer = document.createElement('div')
    const barAsDom = document.getElementById(parentId)
    barAsDom && barAsDom.appendChild(barContainer)

    return barContainer
      ? createPortal(
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
          </div>,
          barContainer
        )
      : null
  }
}

export default FloatingActionBar
