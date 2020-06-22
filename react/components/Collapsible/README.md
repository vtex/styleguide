#### Collapsibles are containers that allows an toggling the display of an initially hidden content. Its main objective is to hide from view detailed information that might not be necessarily.

### 👍 Dos

- Do make your header as complex as you want, but avoid nesting interactive elements.
- Do nest collapsibles if needed, but avoid too many levels.

### 👎 Don'ts

- Don't hide information that you consider critical for the user in that given moment. For the same reason, it doesn't make sense to initialize a collapsible in the expanded state.
- Avoid using the right-aligned variation with widths larger than around 600px or if affordance might be at stake.
- Avoid using the muted variation if affordance is not well secured.

"Read-more-like" example

```js
const Input = require('../Input').default
initialState = { isOpen: false }
;<div className="w-50">
  <div className="mb3">
    <Input label="Name" />
  </div>
  <div className="mb3">
    <Input label="Email" prefix={<span>@</span>} />
  </div>
  <div className="mb5 mt5">
    <Collapsible
      header={
        <span className="c-action-primary hover-c-action-primary fw5">
          Advanced settings
        </span>
      }
      onClick={e => setState({ isOpen: e.target.isOpen })}
      isOpen={state.isOpen}>
      <div className="mt4">
        <div className="mb3">
          <Input label="Surname" />
        </div>
        <div className="mb3">
          <Input label="Nickname" />
        </div>
      </div>
    </Collapsible>
  </div>
</div>
```

Custom Caret Color Example

```js
initialState = { isOpen1: false, isOpen2: false, isOpen3: false }
;<div>
  <div className="mb5">
    <Collapsible
      header={<span>Here goes your base header</span>}
      onClick={e => setState({ isOpen1: e.target.isOpen })}
      isOpen={state.isOpen1}
      caretColor="base">
      <div className="mt4">Here goes your content</div>
    </Collapsible>
  </div>
  <div className="mb5">
    <Collapsible
      header={<span>Here goes your primary header</span>}
      onClick={e => setState({ isOpen2: e.target.isOpen })}
      isOpen={state.isOpen2}
      caretColor="primary">
      <div className="mt4">Here goes your content</div>
    </Collapsible>
  </div>
  <Collapsible
    header={<span>Here goes your muted header</span>}
    onClick={e => setState({ isOpen3: e.target.isOpen })}
    isOpen={state.isOpen3}
    caretColor="muted">
    <div className="mt4">Here goes your content</div>
  </Collapsible>
</div>
```

Navigation bar example

```js
const PageBlock = require('../PageBlock').default
initialState = { isOpen1: false, isOpen2: false, isOpen3: false }
;<div>
  <div className="w5">
    <div className="mt5">
      <Collapsible
        header={
          <div className="c-on-base hover-c-emphasis">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 8H1C0.4 8 0 8.4 0 9V15C0 15.6 0.4 16 1 16H7C7.6 16 8 15.6 8 15V9C8 8.4 7.6 8 7 8Z"
                  fill="currentColor"
                />
                <path
                  d="M11 4H2V6H10V14H12V5C12 4.4 11.6 4 11 4Z"
                  fill="currentColor"
                />
                <path
                  d="M15 0H6V2H14V10H16V1C16 0.4 15.6 0 15 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="ml5 fw5">Catalog</span>
          </div>
        }
        align="right"
        onClick={e => setState({ isOpen1: e.target.isOpen })}
        isOpen={state.isOpen1}
        caretColor="muted">
        <div className="ml6 mt4">
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Products and SKUs
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Categories
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Brands
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Import and export
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Reports
          </a>
        </div>
      </Collapsible>
    </div>

    <div className="mt5">
      <Collapsible
        header={
          <div className="c-on-base hover-c-emphasis">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 5V3C16 2.4 15.6 2 15 2H1C0.4 2 0 2.4 0 3V5H16Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 7V13C0 13.6 0.4 14 1 14H15C15.6 14 16 13.6 16 13V7H0ZM6 11H2V10H6V11ZM12 11H14V10H12V11Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="ml5 fw5">Payments</span>
          </div>
        }
        align="right"
        onClick={e => setState({ isOpen2: e.target.isOpen })}
        isOpen={state.isOpen2}
        caretColor="muted">
        <div className="ml6 mt4">
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Transactions
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Bank conciliation
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Gift card
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Settings
          </a>
        </div>
      </Collapsible>
    </div>

    <div className="mt5">
      <Collapsible
        header={
          <div className="c-on-base hover-c-emphasis">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 12H5.8C5.5 11.2 4.8 10.5 4 10.2V1C4 0.4 3.6 0 3 0H0V2H2V10.2C0.8 10.6 0 11.7 0 13C0 14.7 1.3 16 3 16C4.3 16 5.4 15.2 5.8 14H16V12Z"
                  fill="currentColor"
                />
                <path
                  d="M7 10H14C14.6 10 15 9.6 15 9V4C15 3.4 14.6 3 14 3H7C6.4 3 6 3.4 6 4V9C6 9.6 6.4 10 7 10Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="ml5 fw5">Inventory & shipping</span>
          </div>
        }
        align="right"
        onClick={e => setState({ isOpen3: e.target.isOpen })}
        isOpen={state.isOpen3}
        caretColor="muted">
        <div className="ml6 mt4">
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Dashboard
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Shipping
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Inventory
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Pickup points
          </a>
          <a href="#" className="mt3 c-muted-1 link db hover-c-link">
            Settings
          </a>
        </div>
      </Collapsible>
    </div>
  </div>
</div>
```

FAQ accordion example

```js
const PageBlock = require('../PageBlock').default
const Box = require('../Box').default

initialState = { openQuestion: null }

function toggleAccordion(questionNbr) {
  return e =>
    setState({
      openQuestion: state.openQuestion !== questionNbr ? questionNbr : null,
    })
}

;<div>
  <div className="bg-muted-5 pa8">
    <div className="w-100">
      <Box>
        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is a sub-acquirer?
            </div>
          }
          onClick={toggleAccordion(1)}
          isOpen={state.openQuestion === 1}>
          <div className="bg-muted-5 pa6">
            <p className="ma0">
              A <strong>sub-acquirer</strong> is a company that processes
              payments and transmits the generated data to the other players
              involved in the payment flow. Its role is similar to that of an
              acquirer, but it doesn't completely replace it. Thus, it can be
              understood as a kind of intermediary player between acquirer and
              store.
            </p>
          </div>
        </Collapsible>

        <hr className="ma0 bb bb-0 b--black-10" />

        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is the connector?
            </div>
          }
          onClick={toggleAccordion(2)}
          isOpen={state.openQuestion === 2}>
          <div className="bg-muted-5 pa6">
            <p className="ma0">
              Connectors are communication protocols that your store needs to
              use to enable data transmission between itself and acquirers,
              sub-acquirers, or gateways.
            </p>
            <p className="mt7 mb0">
              For example, for your web site to offer a particular payment
              method to your customers, you need to enable the connector that
              will communicate with the gateway responsible for the processing.
            </p>
          </div>
        </Collapsible>

        <hr className="ma0 bb bb-0 b--black-10" />

        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is the PCI SSC?
            </div>
          }
          onClick={toggleAccordion(3)}
          isOpen={state.openQuestion === 3}>
          <div className="bg-muted-5 pa6">
            <p>
              PCI Security Standards Council is a global forum open to
              continuous development, enhancement, storage, dissemination and
              implementation of data protection security standards.
            </p>
            <p>
              It was founded by American Express, Discover Financial Services,
              JCB International, MasterCard and Visa Inc.
            </p>
          </div>
        </Collapsible>

        <hr className="ma0 bb bb-0 b--black-10" />

        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is a transaction?
            </div>
          }
          onClick={toggleAccordion(4)}
          isOpen={state.openQuestion === 4}>
          <div className="bg-muted-5 pa6">
            <p>
              The movement that money makes when exchanged for a product or
              service is what we call <strong>transaction</strong>. Thus,
              payment is only one step in a process that involves an intense
              flow of information exchange between several parties: gateways,
              sub-acquirers and/or acquirers, brands and issuing banks.
            </p>
            <p>
              In a VTEX store, a transaction starts every time a user chooses a
              payment condition and closes their order. From there, the purchase
              data is sent for the validation of each of the members involved in
              this process. You can track each step of the transaction flow on
              the Payments. With this module, you accurately visualize the
              status of a payment through each status.
            </p>
          </div>
        </Collapsible>
      </Box>
    </div>
  </div>
</div>
```

Example dealing with popup menus inside the Collapsible

```js
const Select = require('../EXPERIMENTAL_Select/index.js').default
initialState = { isOpenNotHidden: false, isOpenHidden: false }
const options = [
  {
    value: 'first-option',
    label: 'First Option',
  },
  {
    value: 'second-option',
    label: 'Second Option',
  },
]
;<div className="w-50">
  <div className="pb3">
    <Collapsible
      header={
        <span className="c-action-primary hover-c-action-primary fw5">
          Collapsible with overflow hidden enabled
        </span>
      }
      onClick={e => setState({ isOpenHidden: e.target.isOpen })}
      isOpen={state.isOpenHidden}>
      <div className="mt4">
        <div className="mb3">
          <Select
            label="Label"
            options={options}
            multi={false}
            onChange={values => {
              console.log(
                `[Select] Selected: ${JSON.stringify(values, null, 2)}`
              )
            }}
          />
        </div>
      </div>
    </Collapsible>
  </div>

  <Collapsible
    header={
      <span className="c-action-primary hover-c-action-primary fw5">
        Collapsible with overflow hidden disabled
      </span>
    }
    isOverflowHidden={false}
    onClick={e => setState({ isOpenNotHidden: e.target.isOpen })}
    isOpen={state.isOpenNotHidden}>
    <div className="mt4">
      <div className="mb3">
        <Select
          label="Label"
          options={options}
          multi={false}
          onChange={values => {
            console.log(`[Select] Selected: ${JSON.stringify(values, null, 2)}`)
          }}
        />
      </div>
    </div>
  </Collapsible>
</div>
```
