import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'
import TopBar from './TopBar'
import BottomBar from './bottomBar'
import { mh100, scrollBar } from './global.css'

const Modal = props => {
  const {
    isOpen,
    centered,
    onClose,
    closeOnEsc,
    closeOnOverlayClick,
    showCloseIcon,
    bottomBarChildren,
    title,
    children,
  } = props

  const [shadowBottom, setShadowBottom] = useState(false)
  const [shadowTop, setShadowTop] = useState(false)

  const handleScroll = event => {
    const element = event.target
    if (element.scrollTop === 0) setShadowTop(false)
    else setShadowTop(true)

    if (element.scrollHeight - element.scrollTop === element.clientHeight)
      setShadowBottom(false)
    else setShadowBottom(true)
  }

  return (
    <ResponsiveModal
      open={isOpen}
      little={centered}
      onClose={onClose}
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      showCloseIcon={false && showCloseIcon}
      classNames={{
        overlay: 'vtex-modal__overlay',
        modal: `vtex-modal__modal br2 ${mh100} flex flex-column`,
        closeIcon: 'vtex-modal__close-icon',
      }}
      styles={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 10000,
        },
        modal: {
          padding: '0 0 0 0',
        },
        closeIcon: {
          top: '8px',
          right: '8px',
          padding: '10px',
        },
      }}
      closeIconSize={18}>
      <TopBar title={title} onClose={onClose} showBottomShadow={shadowTop} />
      <div
        className={`ph7 overflow-auto flex-shrink-1 ${scrollBar}`}
        onScroll={handleScroll}>
        {children}
      </div>
      {bottomBarChildren ? (
        <BottomBar showTopShadow={shadowBottom}>{bottomBarChildren}</BottomBar>
      ) : (
        ''
      )}
    </ResponsiveModal>
  )
}

Modal.defaultProps = {
  isOpen: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
}

Modal.propTypes = {
  /** Content of the modal */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  /** Close the modal on ESC key press (default true) */
  closeOnEsc: PropTypes.bool,
  /** Close the modal on overlay click (default true) */
  closeOnOverlayClick: PropTypes.bool,
  /** Show the close icon on upper right corner (default true) */
  showCloseIcon: PropTypes.bool,
  bottomBarChildren: PropTypes.node,
  title: PropTypes.string,
  responsiveFullScreen: PropTypes.bool,
}

export default Modal
