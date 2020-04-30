#### A modal is an overlay that demands the attention and action from the user, preventing her from interacting with the rest of the page. It might be used from displaying messages to providing a simple form to edit a record.

### 👍 Dos

- Keep it simple. The content of a modal should represent one, clear action from the user - even if it takes multiple steps to be completed.
- Always use a modal to confirm any destructive actions.
- Always try to use the `aria-label` or `aria-labelledby`, and `aria-describedby`.

### 👎 Don'ts

- Avoid stacking modals on top of other modals.

Default

```js
const Button = require('../Button').default
const useModal = require('../../useModal').default

const ModalExample = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open}>Open modal</Button>

      <Modal isOpen={isOpen} onClose={close}>
        <div className="dark-gray">
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

Long content

```js
const Button = require('../Button').default
const useModal = require('../../useModal').default

const ModalExample = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open}>Open modal</Button>

      <Modal isOpen={isOpen} onClose={close} title="What is the shared cart">
        <div className="dark-gray">
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

With title, BottomBar and the responsive full screen option

```js
const Button = require('../Button').default
const useModal = require('../../useModal').default
const Input = require('../Input').default

const ModalExample = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open}>Open modal</Button>

      <Modal
        isOpen={isOpen}
        title="Ready to start?"
        responsiveFullScreen
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={close}>
                Cancel
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={close}>
                Send
              </Button>
            </span>
          </div>
        }
        onClose={close}
      >
        <div className="flex flex-column flex-row-ns">
          <div className="w-100 w-50-ns">
            <p className="f3 f1-ns fw3 gray">
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

Sizes

```js
const ModalExample = () => {
  const Button = require('../Button').default
  const useModal = require('../../useModal').default
  const smallModal = useModal()
  const mediumModal = useModal()
  const largeModal = useModal()

  return (
    <div>
      <div>
        <span className="mr4">
          <Button variation="primary" size="small" onClick={smallModal.open}>
            Small
          </Button>
        </span>
        <span className="mr4">
          <Button variation="primary" onClick={mediumModal.open}>
            Regular
          </Button>
        </span>
        <span className="mr4">
          <Button variation="primary" size="large" onClick={largeModal.open}>
            Large
          </Button>
        </span>
      </div>
      <Modal
        size="small"
        isOpen={smallModal.isOpen}
        onClose={smallModal.close}
        title="Small Modal"
      >
        Small Modal Content
      </Modal>
      <Modal
        size="medium"
        isOpen={mediumModal.isOpen}
        onClose={mediumModal.close}
        title="Medium Modal"
      >
        Medium Modal Content
      </Modal>
      <Modal
        size="large"
        isOpen={largeModal.isOpen}
        onClose={largeModal.close}
        title="Large Modal"
      >
        Large Modal Content
      </Modal>
    </div>
  )
}

;<ModalExample />
```
