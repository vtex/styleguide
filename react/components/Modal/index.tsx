import React, { FC, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import TopBar, { TopBarProps } from './TopBar'
import BottomBar from './BottomBar'
import styles from './modal.css'

interface Props {
  isOpen: boolean
  onClose: () => unknown
  container?: Element
  closeOnOverlayClick?: boolean
  showTopBar?: boolean
  showCloseIcon?: boolean
  bottomBar?: React.ReactNode
  title?: string
  closeOnEsc?: boolean
  showBottomBarBorder?: boolean
  onCloseTransitionFinish?: () => unknown
  centered?: boolean
  size?: 'small' | 'medium' | 'large'
  responsiveFullScreen?: boolean
}

interface OverlayProps {
  isOpen: boolean
  container: Element
  centered: boolean
  closeOnEsc?: boolean
  onClose: () => unknown
  closeOnOverlayClick?: boolean
  onCloseTransitionFinish?: () => unknown
}

interface ContentProps {
  onClose: () => unknown
  showCloseIcon?: boolean
  title?: string
  showTopBar?: boolean
  bottomBar?: React.ReactNode
  children: React.ReactNode
  showBottomBarBorder?: boolean
  responsiveFullScreen: boolean
  size: 'small' | 'medium' | 'large'
}

const ModalOverlay: FC<OverlayProps> = ({
  isOpen,
  onClose,
  centered,
  container,
  closeOnOverlayClick,
  closeOnEsc,
  onCloseTransitionFinish,
  children,
}) => {
  const handleClick = () => {
    if (!closeOnOverlayClick) return
    onClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!closeOnEsc && event.key !== 'Escape') {
      return
    }
    event.stopPropagation()
    onClose()
  }

  return isOpen
    ? createPortal(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={classNames(
            'flex fixed z-max overflow-hidden overflow-hidden bg-black-70 absolute--fill',
            {
              'items-start': !centered,
              'items-center': centered,
            }
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {children}
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
      children,
    },
    forwardedRef
  ) {
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
        // style={{ animation: `${styles.openAnimation} 500ms` }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        onKeyDown={() => null}
        ref={forwardedRef}
      >
        <TopBar
          showCloseIcon={showCloseIcon}
          showTopBar={showTopBar}
          title={title}
          onClose={onClose}
          responsiveFullScreen={responsiveFullScreen}
        />
        <div
          className={`ph8 t-body overflow-auto flex flex-column flex-shrink-1 flex-grow-1 mb3 ${styles.scrollBar}`}
          style={{ maxHeight: '60vh' }}
        >
          {children}
        </div>
        <BottomBar
          showBorder={showBottomBarBorder}
          responsiveFullScreen={responsiveFullScreen}
          size={size}
        >
          {bottomBar}
        </BottomBar>
      </div>
    )
  }
)

const Modal = forwardRef<HTMLDivElement, Props>(function Modal(
  {
    isOpen,
    children,
    container = document.body,
    onClose,
    closeOnOverlayClick,
    title,
    showCloseIcon,
    closeOnEsc,
    onCloseTransitionFinish,
    centered = true,
    responsiveFullScreen = false,
    size = 'medium',
    ...props
  },
  forwardedRef
) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      container={container}
      closeOnEsc={closeOnEsc}
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
        {...props}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  )
})

interface Composites {
  TopBar: React.ForwardRefExoticComponent<
    TopBarProps & React.RefAttributes<HTMLDivElement>
  >
  BottomBar: React.ForwardRefExoticComponent<
    {
      children: React.ReactNode
    } & React.RefAttributes<HTMLDivElement>
  >
}

export type ComposableModal = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLDivElement>
> &
  Partial<Composites>

const FowardedModal: ComposableModal = Modal

FowardedModal.TopBar = TopBar
FowardedModal.BottomBar = BottomBar

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
