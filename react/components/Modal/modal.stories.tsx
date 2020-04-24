import React, { useState } from 'react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Modal from '.'
import Button from '../Button'

export default {
  title: 'Components|Modal',
  decorators: [withA11y, withKnobs],
}

type Size = 'small' | 'medium' | 'large'

const sizes: Size[] = ['small', 'medium', 'large']

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="button">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
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
            onClick={() => setIsOpen(false)}
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
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="button">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={select('Size', sizes, 'medium')}
        responsiveFullScreen
      >
        <div className="dark-gray">
          <p className="f1 fw3">What is the shared cart</p>
          <p>
            The shared cart is a tool that allows more than one customer to add,
            remove or update items and informations from the same cart.
          </p>
          <p>
            For your customer, the shared cart means practicality when making a
            purchase. For your store, it means:
          </p>
          <ul>
            <li>Opportunity for a larger sale.</li>
            <li>Lower logistics effort.</li>
            <li>Single order flow.</li>
          </ul>
          <p className="mt8 f3 fw5">How this is technically possible</p>
          <p>
            We started using a parameter in the URL to identify the cart. As a
            result, the URL can be shared with other users, who can view the
            items, add and remove products, and even pay for the order.
          </p>
          <p>
            However, for users already registered in the plataform (whose data
            is filled automatically in the checkout), all personal informations
            are secure: only the informations' owner has access to them, after
            he is authenticated in the store.
          </p>
          <p className="mt8 f3 fw5">Information security</p>
          <p>
            The payment is still done by one person whose informations remain
            secure, since the profile and delivery data are visible only to the
            user who creates the cart. For others, these same data are masked
            because, with the shared cart, the cart does not have a single owner
            anymore, only the data has.
          </p>
          <p className="mt8 f3 fw5">Changes to the checkout URL</p>
          <p>
            As informed, we have a new parameter in the checkout URLs to
            identify the cart. However, the feature is optional, not impacting
            stores that do not use it.
          </p>
          <p>
            In order to use this feature, simply insert the parameter (also
            called querystring) orderFormId, with the ID of the cart you want to
            access. The cart ID can be obtained from the checkout APIs -
            facilitated with VTEX.js.
          </p>
          <p>
            Please note that, as new parameters are inserted, the page crawling
            that is based on the URL can be affected. Therefore, it is necessary
            to adapt it to continue viewing those same pages as eing from the
            checkout.
          </p>
          <p>
            One change we can make is in the URLs of the Google Analytics
            conversion funnel, because it relies solely on the addresses that
            customers browsed. In order to have a funnel compatible with the
            additional parameters, see the rules updated in our article on how
            to set up the sales funnel on Google Analytics.
          </p>
          <p>
            Other scenarios should be checked with your marketing team and
            service providers.
          </p>
          <p className="mt8 f3 fw5">Practical use of the shared cart</p>
          <p>Summarizing all the previous informations, it is necessary to:</p>
          <ul>
            <li>
              adapt the page crawling services so they become compatible with
              the new URL parameter (Google Analytics, for example);
            </li>
            <li>use VTEX APIs to obtain the cart ID;</li>
            <li>
              customize the cart's page to provide its link to the user based on
              the cart ID.
            </li>
          </ul>
        </div>
      </Modal>
    </>
  )
}
