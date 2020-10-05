/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { Story, Meta } from '@storybook/react'

import Modal, { Props } from '.'
import useDisclosure from '../../utilities/useDisclosure'
import Button from '../Button'
import Input from '../Input'

const sizes = ['small', 'medium', 'large']

export default {
  title: 'Components/Modal V2',
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
        options: sizes,
      },
    },
  },
} as Meta

const Template: Story<Props> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        bottomBar={
          <>
            <Button
              size="small"
              type="button"
              variation="tertiary"
              onClick={onClose}>
              Cancel
            </Button>
            <span className="mr4"></span>
            <Button
              size="small"
              type="button"
              variation={'primary'}
              onClick={onClose}>
              Confirm
            </Button>
          </>
        }
        {...args}
      />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Tell me your name',
  responsiveFullScreen: true,
  size: 'medium',
  centered: true,
  showTopBar: true,
  showBottomBarBorder: true,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  children: (
    <>
      This is a simple customizable Modal to ask your name! Please try change my
      props below in the Knobs and see how I react!
      <div className="mt6 mb5">
        <Input
          autoFocus
          placeholder="Type your name..."
          size="small"
          label="Name"
        />
      </div>
    </>
  ),
}

const lorem = (
  <p>
    Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus
    congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum
    quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros
    porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur
    vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper
    vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac
    habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu
    sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus
    ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum
    volutpat. Ut quis pulvinar est.
  </p>
)
export const WithLongContent = Template.bind({})
WithLongContent.args = {
  children: (
    <>
      {lorem}
      {lorem}
      {lorem}
      {lorem}
      {lorem}
      {lorem}
      {lorem}
      {lorem}
    </>
  ),
}

export const WithDifferentSizes = () => {
  const smallModal = useDisclosure()
  const mediumModal = useDisclosure()
  const largeModal = useDisclosure()

  return (
    <div className="flex flex-row">
      <span className="mr4">
        <Button size="small" onClick={smallModal.onOpen} type="button">
          Open Small Modal
        </Button>
      </span>
      <Modal
        size="small"
        isOpen={smallModal.isOpen}
        onClose={smallModal.onClose}
        title="Small Size"
        bottomBar={
          <>
            <Button
              size="small"
              type="button"
              variation="tertiary"
              onClick={smallModal.onClose}>
              Cancel
            </Button>
            <span className="mr4"></span>
            <Button
              size="small"
              type="button"
              variation={'primary'}
              onClick={smallModal.onClose}>
              Confirm
            </Button>
          </>
        }>
        <div className="mb3">
          Small Modal Example, adjust viewport to see how I react to different
          screen sizes!
        </div>
      </Modal>
      <br />
      <span className="mr4">
        <Button size="regular" onClick={mediumModal.onOpen} type="button">
          Open Medium Modal
        </Button>
      </span>
      <Modal
        size="medium"
        isOpen={mediumModal.isOpen}
        onClose={mediumModal.onClose}
        title="A medium Modal"
        bottomBar={
          <>
            <Button
              size="small"
              type="button"
              variation="tertiary"
              onClick={mediumModal.onClose}>
              Cancel
            </Button>
            <span className="mr4"></span>
            <Button
              size="small"
              type="button"
              variation={'primary'}
              onClick={mediumModal.onClose}>
              Confirm
            </Button>
          </>
        }>
        <div className="mb3">
          Medium Modal Example, adjust viewport to see how I react to different
          screen sizes!
        </div>
      </Modal>
      <br />

      <span className="mr4">
        <Button size="large" onClick={largeModal.onOpen} type="button">
          Open Large Modal
        </Button>
      </span>
      <Modal
        size="large"
        isOpen={largeModal.isOpen}
        onClose={largeModal.onClose}
        title="Large Size"
        bottomBar={
          <>
            <Button
              size="small"
              type="button"
              variation="tertiary"
              onClick={largeModal.onClose}>
              Cancel
            </Button>
            <span className="mr4"></span>
            <Button
              size="small"
              type="button"
              variation={'primary'}
              onClick={largeModal.onClose}>
              Confirm
            </Button>
          </>
        }>
        <div className="mb3">
          Large Modal Example, adjust viewport to see how I react to different
          screen sizes!
        </div>
      </Modal>
    </div>
  )
}
