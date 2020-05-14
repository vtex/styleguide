import React, { FC, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import FocusLock from 'react-focus-lock'

import TopBar from './TopBar'
import BottomBar from './BottomBar'
import styles from './modal.css'
import { useEnhancedEffect } from './utils'

export interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean
  onClose: () => unknown
  children: React.ReactNode
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
}

type OverlayProps = Required<
  Pick<Props, 'isOpen' | 'centered' | 'closeOnOverlayClick' | 'onClose'>
> &
  Pick<Props, 'onCloseTransitionFinish' | 'container'>

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
  Pick<Props, 'title' | 'bottomBar'> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>

export const ModalOverlay: FC<OverlayProps> = ({
  isOpen,
  onClose,
  centered,
  container,
  closeOnOverlayClick,
  onCloseTransitionFinish,
  children,
}) => {
  const [showPortal, setShowPortal] = useState(isOpen)

  useEnhancedEffect(() => {
    if (!isOpen) {
      return
    }
    setShowPortal(isOpen)
    document.body.classList.add(styles.hiddenScroll)
  }, [isOpen])

  const handleClick = () => {
    if (!closeOnOverlayClick) return
    onClose()
  }

  const handleAnimationEnd = () => {
    if (isOpen) return
    onCloseTransitionFinish?.()
    setShowPortal(false)
    document.body.classList.remove(styles.hiddenScroll)
  }

  return showPortal
    ? createPortal(
        /** This rule can be disabled because we are not using the onClick property to click
         * the element itself but to capture outside clicks */
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          className={classNames(
            'flex fixed z-max overflow-hidden bg-black-70 absolute--fill',
            isOpen ? styles.openAnimation : styles.closeAnimation,
            {
              'items-start': !centered,
              'items-center': centered,
            }
          )}
          tabIndex={-1}
          onClick={handleClick}
          onAnimationEnd={handleAnimationEnd}
          data-testid="modal__overlay"
          role="presentation"
        >
          <FocusLock className={styles.contents}>{children}</FocusLock>
        </div>,
        container ?? document.body
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
      ...props
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
          'flex flex-column relative bg-white shadow-5 center mv9',
          `${size === 'small' ? styles.mw30 : ''}`,
          `${size === 'medium' ? styles.mw40 : ''}`,
          `${size === 'large' ? styles.mw50 : ''}`,
          {
            'h-100 h-auto-ns vw-100': responsiveFullScreen,
            'vw-90': !responsiveFullScreen,
          }
        )}
        ref={forwardedRef}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        data-testid="modal__modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={props['aria-label'] ? '' : 'vtex-modal__title'}
        {...props}
      >
        <TopBar
          showCloseIcon={showCloseIcon}
          onClose={onClose}
          showTopBar={showTopBar}
          responsiveFullScreen={responsiveFullScreen}
        >
          {title && (
            <div id="vtex-modal__title" className={`${styles.contents}`}>
              {title}
            </div>
          )}
        </TopBar>
        <div
          className={classNames(
            `ph6 ph8-ns t-body overflow-auto flex flex-column flex-shrink-1 flex-grow-1 ${styles.mh60} ${styles.scrollBar}`,
            { 'pb8-ns': !bottomBar, mb3: bottomBar }
          )}
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
    onCloseTransitionFinish,
    closeOnOverlayClick = true,
    container,
    showCloseIcon = true,
    closeOnEsc = true,
    centered = true,
    responsiveFullScreen = false,
    size = 'medium',
    showTopBar = true,
    showBottomBarBorder = true,
    ...props
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
        {...props}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}

const FowardedModal = forwardRef<HTMLDivElement, Props>(Modal)

FowardedModal.propTypes = {
  /** Content of the modal. */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content). */
  centered: PropTypes.bool,
  /** Container in which the modal is rendered. */
  container: PropTypes.any,
  /** Show or hide the modal. */
  isOpen: PropTypes.bool.isRequired,
  /** Function called when Modal is closed. */
  onClose: PropTypes.func.isRequired,
  /** Show BottomBar border. */
  showBottomBarBorder: PropTypes.bool,
  /** Close the modal on ESC key press. */
  closeOnEsc: PropTypes.bool,
  /** Close the modal on overlay click. */
  closeOnOverlayClick: PropTypes.bool,
  /** Show the close icon on upper right corner. */
  showCloseIcon: PropTypes.bool,
  /** Node to be displayed as the bottom bar of the modal. */
  bottomBar: PropTypes.node,
  /** Modal title to be displayed in top of the modal. */
  title: PropTypes.node,
  /** If true, the modal will expand to fullscreen in small view ports (e.g. mobile). */
  responsiveFullScreen: PropTypes.bool,
  /** If true, show top bar with title. */
  showTopBar: PropTypes.bool,
  /** Event fired when the closing transition is finished. */
  onCloseTransitionFinish: PropTypes.func,
  /** Modal size. */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Acessible Modal name. If this name is visible on the screen, prefer to use aria-labelledby. */
  'aria-label': PropTypes.string,
  /** ID of the element that provides the Modal an accessible name. If aria-label and aria-albelledby is not defined, the default here will be the title element. */
  'aria-labelledby': PropTypes.string,
  /** ID of the element that provides the Modal an accessible description. */
  'aria-describedby': PropTypes.string,
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
  'aria-labelledby': 'vtex-modal__title',
}

export default FowardedModal
