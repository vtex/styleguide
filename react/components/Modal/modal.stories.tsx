import React from 'react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Modal from '.'
import Button from '../Button'
import ModalDialog from '../ModalDialog'
import useModal from './useModal'

export default {
  title: 'Components|Modal',
  decorators: [withA11y, withKnobs],
}

type Size = 'small' | 'medium' | 'large'

const sizes: Size[] = ['small', 'medium', 'large']

export const Default = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open} type="button">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Modal Title"
        responsiveFullScreen={boolean('Responsive Full Screen', false)}
        onCloseTransitionFinish={() => {
          action('transition-finished')
        }}
        size={select('Size', sizes, 'medium')}
        bottomBar={
          <Button
            size="small"
            type="button"
            variation={'primary'}
            onClick={close}
          >
            Confirm
          </Button>
        }
      >
        Modal Content
      </Modal>
    </>
  )
}

export const WithLongContent = () => {
  const { isOpen, open, close } = useModal()
  const lorem = (
    <p>
      Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus
      congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum
      quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at
      eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate
      consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat
      est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi.
      In hac habitasse platea dictumst. Vestibulum ac ultrices risus.
      Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum
      velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet
      justo vitae rutrum volutpat. Ut quis pulvinar est.
    </p>
  )
  return (
    <>
      <Button onClick={open} type="button">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        size={select('Size', sizes, 'medium')}
        responsiveFullScreen
      >
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
      </Modal>
    </>
  )
}

export const WithDialog = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open} type="button">
        Open
      </Button>
      <ModalDialog
        isOpen={isOpen}
        onClose={close}
        confirmation={{
          label: 'Confirm',
          onClick: close,
          isDangerous: true,
        }}
        cancelation={{
          label: 'Cancel',
          onClick: close,
        }}
      >
        Content
      </ModalDialog>
    </>
  )
}

// export const WithDifferentSizes = () => {
//   const smallModal = useModal()
//   const mediumModal = useModal()
//   const largeModal = useModal()

//   return (
//     <div className="flex flex-column">
//       <span className="mr4">
//         <Button size="small" onClick={() => smallModal.open} type="button">
//           Open Small Modal
//         </Button>
//       </span>
//       <Modal
//         size="small"
//         isOpen={smallModal.isOpen}
//         onClose={() => smallModal.close}
//       >
//         Small Modal
//       </Modal>
//       <span className="mr4">
//         <Button size="regular" onClick={() => mediumModal.open} type="button">
//           Open Medium Modal
//         </Button>
//       </span>
//       <Modal
//         size="medium"
//         isOpen={mediumModal.isOpen}
//         onClose={() => mediumModal.close}
//       >
//         Medium Modal
//       </Modal>
//       <span className="mr4">
//         <Button size="large" onClick={() => largeModal.open} type="button">
//           Open Large Modal
//         </Button>
//       </span>
//       <Modal
//         size="large"
//         isOpen={largeModal.isOpen}
//         onClose={() => largeModal.close}
//       >
//         Large Modal
//       </Modal>
//     </div>
//   )
// }
