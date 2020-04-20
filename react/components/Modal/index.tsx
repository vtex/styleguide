import React, { FC, forwardRef } from 'react'
import { createPortal } from 'react-dom'

import TopBar, { TopBarProps } from './TopBar'
import BottomBar from './BottomBar'
import './modal.css'

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
}

interface OverlayProps {
  isOpen: boolean
  container: Element
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
  responsiveFullScreen?: boolean
  centered: boolean
}

const ModalOverlay: FC<OverlayProps> = ({
  isOpen,
  onClose,
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

  const handleAnimationEnd = () => {
    onCloseTransitionFinish && onCloseTransitionFinish()
  }

  return isOpen
    ? createPortal(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className="flex items-start fixed z-max overflow-y-hidden overflow-x-auto bg-black-70 absolute--fill"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onAnimationEnd={handleAnimationEnd}
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
      showBottomBarBorder = true,
      responsiveFullScreen = true,
      centered,
      children,
    },
    forwardedRef
  ) {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div
        className="relative bg-white vw-50 shadow-5 center mv9"
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
        />
        <div className="ph8">{children}</div>
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
    centered = false,
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
      closeOnOverlayClick={closeOnOverlayClick}
      onCloseTransitionFinish={onCloseTransitionFinish}
    >
      <ModalContent
        title={title}
        onClose={onClose}
        ref={forwardedRef}
        showCloseIcon={showCloseIcon}
        centered={centered}
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
  centered: false,
}

export default FowardedModal
