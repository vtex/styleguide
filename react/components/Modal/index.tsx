import React, { FC, forwardRef, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import FocusLock from 'react-focus-lock'

import TopBar, { Props as TopBarProps } from './TopBar'
import BottomBar, { Props as BottomBarProps } from './BottomBar'
import styles from './modal.css'

export interface Props {
  isOpen: boolean
  onClose: () => unknown
  container?: Element
  closeOnOverlayClick?: boolean
  showTopBar?: boolean
  showCloseIcon?: boolean
  bottomBar?: React.ReactNode
  title?: React.ReactNode
  closeOnEsc?: boolean
  showBottomBarBorder?: boolean
  onCloseTransitionFinish?: () => unknown
  centered?: boolean
  size?: 'small' | 'medium' | 'large'
  responsiveFullScreen?: boolean
  children: React.ReactNode
}

type OverlayProps = Required<
  Pick<
    Props,
    'isOpen' | 'container' | 'centered' | 'closeOnOverlayClick' | 'onClose'
  >
> &
  Pick<Props, 'onCloseTransitionFinish'>

type ContentProps = Required<
  Pick<
    Props,
    | 'onClose'
    | 'showCloseIcon'
    | 'showTopBar'
    | 'children'
    | 'showBottomBarBorder'
    | 'responsiveFullScreen'
    | 'size'
    | 'closeOnEsc'
  >
> &
  Pick<Props, 'title' | 'bottomBar'>

const ModalOverlay: FC<OverlayProps> = ({
  isOpen,
  onClose,
  centered,
  container,
  closeOnOverlayClick,
  onCloseTransitionFinish,
  children,
}) => {
  const [showPortal, setShowPortal] = useState(isOpen)

  useLayoutEffect(() => {
    if (isOpen) setShowPortal(isOpen)
  }, [isOpen])

  const handleClick = () => {
    if (!closeOnOverlayClick) return
    onClose()
  }

  const handleAnimationEnd = () => {
    if (isOpen) return
    onCloseTransitionFinish?.()
    setShowPortal(false)
  }

  return showPortal
    ? createPortal(
        /** This rule can be disabled because we are not using the onClick property to click
         * the element itself but to check outside Modal click */
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={classNames(
            'flex fixed z-max overflow-hidden overflow-hidden bg-black-70 absolute--fill',
            isOpen ? styles.openAnimation : styles.closeAnimation,
            {
              'items-start': !centered,
              'items-center': centered,
            }
          )}
          tabIndex={-1}
          onClick={handleClick}
          onKeyDown={() => {}}
          onAnimationEnd={handleAnimationEnd}
        >
          <FocusLock className={`${styles.contents}`}>{children}</FocusLock>
        </div>,
        container
      )
    : null
}

const ModalContent = forwardRef<HTMLDivElement, ContentProps>(
  function ModalContent(
    {
      onClose,
      showCloseIcon,
      title,
      showTopBar,
      bottomBar,
      showBottomBarBorder,
      responsiveFullScreen,
      size,
      closeOnEsc,
      children,
    },
    forwardedRef
  ) {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!closeOnEsc || event.key !== 'Escape') {
        return
      }
      event.stopPropagation()
      onClose()
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div
        className={classNames(
          'flex flex-column relative bg-white shadow-5 center mv9 glow',
          {
            'vw-50-ns': size === 'small',
            'vw-60-ns': size === 'medium',
            'vw-80-ns': size === 'large',
            'h-100 h-auto-ns vw-100': responsiveFullScreen,
            'vw-50': !responsiveFullScreen,
          }
        )}
        onClick={e => e.stopPropagation()}
        role="dialog"
        onKeyDown={handleKeyDown}
        ref={forwardedRef}
      >
        <TopBar
          showCloseIcon={showCloseIcon}
          onClose={onClose}
          showTopBar={showTopBar}
          responsiveFullScreen={responsiveFullScreen}
        >
          {title}
        </TopBar>
        <div
          className={`ph8 t-body overflow-auto flex flex-column flex-shrink-1 flex-grow-1 mb3 ${styles.scrollBar}`}
          style={{ maxHeight: '60vh' }}
        >
          {children}
        </div>
        <BottomBar
          showBorder={showBottomBarBorder}
          responsiveFullScreen={responsiveFullScreen}
        >
          {bottomBar}
        </BottomBar>
      </div>
    )
  }
)

function Modal(
  {
    isOpen,
    children,
    onClose,
    title,
    bottomBar,
    closeOnOverlayClick = true,
    container = document.body,
    showCloseIcon = true,
    closeOnEsc = true,
    onCloseTransitionFinish,
    centered = true,
    responsiveFullScreen = false,
    size = 'medium',
    showTopBar = true,
    showBottomBarBorder = true,
  }: Props,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      container={container}
      centered={centered}
      closeOnOverlayClick={closeOnOverlayClick}
      onCloseTransitionFinish={onCloseTransitionFinish}
    >
      <ModalContent
        title={title}
        onClose={onClose}
        ref={forwardedRef}
        showCloseIcon={showCloseIcon}
        size={size}
        responsiveFullScreen={responsiveFullScreen}
        showTopBar={showTopBar}
        bottomBar={bottomBar}
        showBottomBarBorder={showBottomBarBorder}
        closeOnEsc={closeOnEsc}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}

interface Composites {
  TopBar: React.ForwardRefExoticComponent<
    TopBarProps & React.RefAttributes<HTMLDivElement>
  >
  BottomBar: React.ForwardRefExoticComponent<
    BottomBarProps & React.RefAttributes<HTMLDivElement>
  >
}

export type ComposableModal = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLDivElement>
> &
  Partial<Composites>

const FowardedModal: ComposableModal = forwardRef(Modal)

FowardedModal.TopBar = TopBar
FowardedModal.BottomBar = BottomBar

FowardedModal.propTypes = {
  /** Content of the modal */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Container in which the modal is rendered */
  container: PropTypes.any,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,
  /** Function called when Modal is closed */
  onClose: PropTypes.func.isRequired,
  /** Show BottomBar border * */
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
  /** Modal size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

FowardedModal.defaultProps = {
  isOpen: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  showTopBar: true,
  showBottomBarBorder: true,
  centered: true,
  size: 'medium',
  responsiveFullScreen: false,
}

export default FowardedModal
