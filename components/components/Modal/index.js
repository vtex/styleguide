import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'
import get from 'lodash/get'

import zIndex from '../utils/zIndex'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import styles from './modal.css'

import './modal.global.css'

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.contentContainerReference = React.createRef()
    this.state = { shadowBottom: false, shadowTop: false }
  }

  componentDidMount() {
    this.setShadowState(this.contentContainerReference.current)
  }

  componentDidUpdate(prevProps) {
    const scrollTop = get(this, 'contentContainerReference.current.scrollTop')
    if (
      prevProps.isOpen !== this.props.isOpen ||
      (scrollTop === 0 && this.state.shadowTop)
    )
      this.setShadowState(this.contentContainerReference.current)
  }

  handleScroll = event => {
    this.setShadowState(event.target)
  }

  setShadowState = element => {
    if (!element) return

    const { scrollTop, scrollHeight, clientHeight } = element

    this.setState({ shadowTop: scrollTop !== 0 })
    this.setState({ shadowBottom: scrollHeight - scrollTop !== clientHeight })
  }

  render = () => {
    const {
      isOpen,
      centered,
      onClose,
      closeOnEsc,
      closeOnOverlayClick,
      showCloseIcon,
      bottomBar,
      title,
      children,
      responsiveFullScreen,
      showTopBar,
      showBottomBarBorder,
      onCloseTransitionFinish,
      container,
    } = this.props
    const { shadowBottom, shadowTop } = this.state

    return (
      <ResponsiveModal
        open={isOpen}
        center={centered}
        container={container}
        onClose={onClose}
        onExited={onCloseTransitionFinish}
        closeOnEsc={closeOnEsc}
        closeOnOverlayClick={closeOnOverlayClick}
        showCloseIcon={showTopBar ? false : showCloseIcon}
        classNames={{
          overlay: `vtex-modal__overlay ${
            responsiveFullScreen ? 'pa5-ns pa0' : ''
          }`,
          modal: `vtex-modal__modal ${
            responsiveFullScreen ? 'br2-ns w-100 h-100 h-auto-ns' : 'br2 w-100'
          } ${styles.mh100} flex flex-column`,
          closeIcon: 'vtex-modal__close-icon',
        }}
        styles={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: zIndex.modal,
          },
          modal: {
            padding: 0,
          },
          closeIcon: {
            top: '8px',
            right: '8px',
            padding: '10px',
          },
        }}
        closeIconSize={18}>
        {showTopBar && (
          <TopBar
            title={title}
            onClose={onClose}
            showBottomShadow={shadowTop}
            responsiveFullScreen={responsiveFullScreen}
            showCloseIcon={showCloseIcon}
          />
        )}
        <div
          className={`${
            responsiveFullScreen ? 'ph7 ph8-ns' : 'ph6 ph8-ns'
          } overflow-auto flex-shrink-1 flex-grow-1 ${bottomBar ? '' : 'pb8'} ${
            title ? '' : 'pt5 pt6-ns'
          } ${styles.scrollBar}`}
          ref={this.contentContainerReference}
          onScroll={this.handleScroll}>
          {children}
        </div>
        {bottomBar ? (
          <BottomBar
            showTopShadow={shadowBottom}
            showBorder={showBottomBarBorder}
            responsiveFullScreen={responsiveFullScreen}>
            {bottomBar}
          </BottomBar>
        ) : (
          ''
        )}
      </ResponsiveModal>
    )
  }
}

Modal.defaultProps = {
  isOpen: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  showTopBar: true,
  showBottomBarBorder: true,
}

Modal.propTypes = {
  /** Content of the modal */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Container in which the modal is rendered */
  container: PropTypes.object,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  /** Show BottomBar border **/
  showBottomBarBorder: PropTypes.bool,
  /** Close the modal on ESC key press (default true) */
  closeOnEsc: PropTypes.bool,
  /** Close the modal on overlay click (default true) */
  closeOnOverlayClick: PropTypes.bool,
  /** Show the close icon on upper right corner (default true) */
  showCloseIcon: PropTypes.bool,
  /** Node to be displayed as the bottom bar of the modal. */
  bottomBar: PropTypes.node,
  /** Modal title to be displayed in top of the modal. */
  title: PropTypes.node,
  /** If true, the modal will expand to fullscreen in small view ports (e.g. mobile) */
  responsiveFullScreen: PropTypes.bool,
  /** If true, show top bar with title */
  showTopBar: PropTypes.bool,
  /** Event fired when the closing transition is finished */
  onCloseTransitionFinish: PropTypes.func,
}

export default Modal
