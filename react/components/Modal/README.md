#### A modal is an overlay that demands the attention and action from the user, preventing her from interacting with the rest of the page. It might be used from displaying messages to providing a simple form to edit a record.

### 👍 Dos

- Keep it simple. The content of a modal should represent one, clear action from the user - even if it takes multiple steps to be completed.
- Always use a modal to confirm any destructive actions.
- Always try to use the `aria-label` or `aria-labelledby`, and `aria-describedby`.

### 👎 Don'ts

- Avoid stacking modals on top of other modals.

### Anatomy

The anatomy consists of an overlay to block user interaction below the Modal and the content which the user must interact with.

<img src="./modal_anatomy.png" alt="Modal component anatomty">

### Props

| Property                | Type      | Required | Default             | Description                                                                                                                                                 |
| ----------------------- | --------- | -------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                | `node`    | ✅       |                     | Content of the modal                                                                                                                                        |
| isOpen                  | `boolean` | ✅       |                     | Show or hide the modal                                                                                                                                      |
| onClose                 | `boolean` | ✅       |                     | Function called when Modal is closed                                                                                                                        |
| centered                | `boolean` | 🚫       | true                | Center the modal                                                                                                                                            |
| container               | `any`     | 🚫       | document.body       | Container in which the modal is rendered                                                                                                                    |
| showBottomBarBorder     | `boolean` | 🚫       | true                | Show BottomBar border                                                                                                                                       |
| closeOnEsc              | `boolean` | 🚫       | true                | Close the modal on ESC key press                                                                                                                            |
| closeOnOverlayClick     | `boolean` | 🚫       | true                | Close the modal on overlay click                                                                                                                            |
| showCloseIcon           | `boolean` | 🚫       | true                | Show the close icon on upper right corner                                                                                                                   |
| bottomBar               | `node`    | 🚫       |                     | Node to be displayed as the bottom bar of the modal                                                                                                         |
| title                   | `node`    | 🚫       |                     | Modal title to be displayed in top of the modal                                                                                                             |
| responsiveFullScreen    | `boolean` | 🚫       | false               | If true the modal will expand to fullscreen in small view ports                                                                                             |
| showTopBar              | `boolean` | 🚫       | true                | If true, show top bar with title                                                                                                                            |
| onCloseTransitionFinish | `func`    | 🚫       |                     | Event fired when the closing transition is finished                                                                                                         |
| size                    | `enum`    | 🚫       | medium              | Modal Size. One of: Small, Medium and Large                                                                                                                 |
| aria-label              | `string`  | 🚫       |                     | Acessible Modal name. If this name is visible on the screen, prefer to use aria-labelledby                                                                  |
| aria-labelledby         | `string`  | 🚫       | `vtex-modal__title` | ID of the element that provides the Modal an accessible name. If aria-label and aria-albelledby is not defined, the default here will be the title element. |
| aria-describedby        | `string`  | 🚫       |                     | ID of the element that provides the Modal an accessible description                                                                                         |

## Examples

#### Simple

```js
const Button = require('../Button').default
const Modal = require('.').default

const useDisclosure = require('../../utilities/useDisclosure').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        aria-label="Payments Module"
        aria-describedby="modal-description"
      >
        <div className="dark-gray" id="modal-description">
          <p>
            The Payments module is the system responsible for managing all
            actions regarding your store's cash flow.
          </p>

          <p>
            Before we explore the features within VTEX Admin Payments, let's
            clarify some important concepts regarding the payment flow of an
            order. This process is performed by some actors within the Brazilian
            financial system, which make up the Payments module architecture.
          </p>
          <div
            style={{
              backgroundColor: '#edf4fa',
              borderRadius: '4px',
              border: 'solid #368df7',
              borderWidth: '0 0 0 4px',
              boxSizing: 'border-box',
              padding: '12px 16px',
            }}
          >
            It is important to remember that each store has its own
            particularities and its own operation, which influence how to build
            your business' Payment module. To set up your cash flow, it is
            therefore crucial to keep in mind the real needs and purposes of the
            retailer and of the desired project.
          </div>
        </div>
      </Modal>
    </>
  )
}

;<ModalExample />
```

#### Long content

When the Modal can't grow any longer, a scroll bar will show inside of the content.

```js
const Modal = require('.').default
const Button = require('../Button').default
const useDisclosure = require('../../utilities/useDisclosure').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="What is the shared cart"
        aria-describedby="modal-description"
      >
        <div className="dark-gray" id="modal-description">
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

;<ModalExample />
```

#### Dialog

Using `bottomBar` prop you can insert any type of dialog, see the example below.

```js
const Modal = require('.').default
const Button = require('../Button').default
const useDisclosure = require('../../utilities/useDisclosure').default
const Input = require('../Input').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>

      <Modal
        isOpen={isOpen}
        title="Ready to start?"
        aria-describedby="modal-description"
        responsiveFullScreen
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={onClose}>
                Cancel
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={onClose}>
                Send
              </Button>
            </span>
          </div>
        }
        onClose={onClose}
      >
        <div className="flex flex-column flex-row-ns">
          <div className="w-100 w-50-ns">
            <p className="f3 f1-ns fw3 gray" id="modal-description">
              Discover our unified commerce platform and see your business
              thrive.
            </p>
          </div>
          <div className="w-100 w-50-ns mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <Input placeholder="Name" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Last name" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Corporate email" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Company" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Annual revenue" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Do you have e-commerce?" size="large" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

;<ModalExample />
```

#### Sizes

Adjust the size of the Modal according with your content.

##### Small

```js
const Button = require('../Button').default
const Modal = require('.').default
const useDisclosure = require('../../utilities/useDisclosure').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="small"
        title="Upload document?"
        aria-label="Connect Device"
        aria-describedby="modal-description"
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={onClose}>
                Cancel
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={onClose}>
                Upload
              </Button>
            </span>
          </div>
        }
      >
        <p id="modal-description" className="dark-gray">
          Big documents may take a little longer to be uploaded.
        </p>
      </Modal>
    </>
  )
}
;<ModalExample />
```

##### Medium

```js
const Button = require('../Button').default
const Modal = require('.').default
const useDisclosure = require('../../utilities/useDisclosure').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="medium"
        aria-label="Payments Module"
        aria-describedby="modal-description"
      >
        <div className="dark-gray" id="modal-description">
          <p>
            The Payments module is the system responsible for managing all
            actions regarding your store's cash flow.
          </p>

          <p>
            Before we explore the features within VTEX Admin Payments, let's
            clarify some important concepts regarding the payment flow of an
            order. This process is performed by some actors within the Brazilian
            financial system, which make up the Payments module architecture.
          </p>
          <div
            style={{
              backgroundColor: '#edf4fa',
              borderRadius: '4px',
              border: 'solid #368df7',
              borderWidth: '0 0 0 4px',
              boxSizing: 'border-box',
              padding: '12px 16px',
            }}
          >
            It is important to remember that each store has its own
            particularities and its own operation, which influence how to build
            your business' Payment module. To set up your cash flow, it is
            therefore crucial to keep in mind the real needs and purposes of the
            retailer and of the desired project.
          </div>
        </div>
      </Modal>
    </>
  )
}

;<ModalExample />
```

##### Large

```js
const Button = require('../Button').default
const Dropzone = require('../Dropzone').default
const Modal = require('.').default
const useDisclosure = require('../../utilities/useDisclosure').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="large"
        title="Import products by CSV"
        aria-describedby="modal-description"
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={onClose}>
                Cancel
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={onClose}>
                Upload
              </Button>
            </span>
          </div>
        }
      >
        <Dropzone>
          <div className="pt7">
            <div id="modal-description">
              <span className="f4">Drop here your CSV or </span>
              <span className="f4 c-link" style={{ cursor: 'pointer' }}>
                choose a file
              </span>
            </div>
          </div>
        </Dropzone>
      </Modal>
    </>
  )
}

;<ModalExample />
```

#### Custom Initial Focus

By default the first focusable element will be focused but you can customize.

```js
const Modal = require('.').default
const Input = require('../Input').default
const Button = require('../Button').default

const useDisclosure = require('../../utilities/useDisclosure').default

const ModalExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm your name to continue"
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={onClose}>
                Cancel
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={onClose}>
                Confirm
              </Button>
            </span>
          </div>
        }
      >
        <Input autoFocus placeholder="Type your name...." label="Name" />
        <div className="mb3" />
      </Modal>
    </>
  )
}
;<ModalExample />
```

## Accessibility

> WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal

- If you don't provide a string title to the Modal, be sure to provide `aria-labelledby="id..."` if the label is visible or a string to `aria-label="..."` if it's not visible. Additionaly you can give a description for the Modal with `aria-describedby="id..`.
- If necessary, change the initial focus to the component you want the user first interact with. Examples: Form, Confirm Button, Link etc.
