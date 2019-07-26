#### Collapsibles are containers that allows an toggling the display of an initially hidden content. Its main objective is to hide from view detailed information that might not be necessarily.

### 👍 Dos

- Do make your header as complex as you want, but avoid nesting interactive elements.
- Do nest collapsibles if needed, but avoid too many levels.

### 👎 Don'ts

- Don't hide information that you consider critical for the user in that given moment. For the same reason, it doesn't make sense to initialize a collapsible in the expanded state.
- Avoid using the right-aligned variation with widths larger than around 600px or if affordance might be at stake.
- Avoid using the muted variation if affordance is not well secured.


Usage
 
```js
initialState = { isOpen1: false, isOpen2: false }
;<div>
  <Collapsible
    header={<span>Here goes your header</span>}
    onClick={e => setState({ isOpen1: e.target.isOpen })}
    isOpen={state.isOpen1}
    >
      <div className="mt4">
        Here goes your content
      </div>
  </Collapsible>
</div>
```

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
      isOpen={state.isOpen}
      >
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
  <Collapsible
    header={<span>Here goes your base header</span>}
    onClick={e => setState({ isOpen1: e.target.isOpen })}
    isOpen={state.isOpen1}
    caretColor="base"
    >
      <div className="mt4">
        Here goes your content
      </div>
  </Collapsible>
  <Collapsible
    header={<span>Here goes your primary header</span>}
    onClick={e => setState({ isOpen2: e.target.isOpen })}
    isOpen={state.isOpen2}
    caretColor="primary"
    >
      <div className="mt4">
        Here goes your content
      </div>
  </Collapsible>
  <Collapsible
    header={<span>Here goes your muted header</span>}
    onClick={e => setState({ isOpen3: e.target.isOpen })}
    isOpen={state.isOpen3}
    caretColor="muted"
    >
      <div className="mt4">
        Here goes your content
      </div>
  </Collapsible>
</div>
```

Navigation bar example

```js
const PageBlock = require('../PageBlock').default
initialState = { isOpen1: false, isOpen2: false, isOpen3: false }

;<div>
  <div className="w5">
    <div className="mt4">
      <Collapsible
          header={
            <div className="c-on-base hover-c-emphasis">
              <span>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M7 8H1C0.4 8 0 8.4 0 9V15C0 15.6 0.4 16 1 16H7C7.6 16 8 15.6 8 15V9C8 8.4 7.6 8 7 8Z'
                  fill='currentColor' />
                  <path d='M11 4H2V6H10V14H12V5C12 4.4 11.6 4 11 4Z' fill='currentColor' />
                  <path d='M15 0H6V2H14V10H16V1C16 0.4 15.6 0 15 0Z' fill='currentColor' />
                </svg>
              </span>
              <span className="ml5 fw5">
                Catalog
              </span>
            </div>
          }
          align="right"
          onClick={e => setState({ isOpen1: e.target.isOpen })}
          isOpen={state.isOpen1}
          caretColor="muted"
          >
            <div className="ml6 mt4">
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Products and SKUs</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Categories</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Brands</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Import and export</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Reports</a>
            </div>
        </Collapsible>
      </div>

      <div className="mt4">
        <Collapsible
          header={
            <div className="c-on-base hover-c-emphasis">
              <span>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M16 5V3C16 2.4 15.6 2 15 2H1C0.4 2 0 2.4 0 3V5H16Z' fill='currentColor'
                    />
                    <path fillRule='evenodd' clipRule='evenodd' d='M0 7V13C0 13.6 0.4 14 1 14H15C15.6 14 16 13.6 16 13V7H0ZM6 11H2V10H6V11ZM12 11H14V10H12V11Z'
                    fill='currentColor' />
                </svg>
              </span>
              <span className="ml5 fw5">
                Payments
              </span>
            </div>
          }
          align="right"
          onClick={e => setState({ isOpen2: e.target.isOpen })}
          isOpen={state.isOpen2}
          caretColor="muted"
          >
            <div className="ml6 mt4">
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Transactions</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Bank conciliation</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Gift card</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Settings</a>
            </div>
        </Collapsible>
      </div>

      <div className="mt4">
        <Collapsible
          header={
            <div className="c-on-base hover-c-emphasis">
              <span>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M16 12H5.8C5.5 11.2 4.8 10.5 4 10.2V1C4 0.4 3.6 0 3 0H0V2H2V10.2C0.8 10.6 0 11.7 0 13C0 14.7 1.3 16 3 16C4.3 16 5.4 15.2 5.8 14H16V12Z'
                  fill='currentColor' />
                  <path d='M7 10H14C14.6 10 15 9.6 15 9V4C15 3.4 14.6 3 14 3H7C6.4 3 6 3.4 6 4V9C6 9.6 6.4 10 7 10Z'
                  fill='currentColor' />
              </svg>
              </span>
              <span className="ml5 fw5">
                Inventory & shipping
              </span>
            </div>
          }
          align="right"
          onClick={e => setState({ isOpen3: e.target.isOpen })}
          isOpen={state.isOpen3}
          caretColor="muted"
          >
            <div className="ml6 mt4">
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Dashboard</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Shipping</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Inventory</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Pickup points</a>
              <a href="#" className="mt3 c-muted-1 link db hover-c-link">Settings</a>
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
  return e => setState(
    { openQuestion: state.openQuestion !== questionNbr ? questionNbr : null }
  );
}

;<div>
  <div className="bg-muted-5 pa8">
    <div className="w-100">
      <Box>
        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is your name?
            </div>
          }
          onClick={toggleAccordion(1)}
          isOpen={ state.openQuestion===1 }
          >
            <div className="bg-muted-5 pa6">
              Arthur, King of the Britons.
            </div>
        </Collapsible>

        <hr className="ma0 bb bb-0 b--black-10"/>

        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is your quest?
            </div>
          }
          onClick={toggleAccordion(2)}
          isOpen={ state.openQuestion===2 }
          >
            <div className="bg-muted-5 pa6">
              To seek the Holy Grail.
            </div>
        </Collapsible>

        <hr className="ma0 bb bb-0 b--black-10"/>

        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is your favorite color?
            </div>
          }
          onClick={toggleAccordion(3)}
          isOpen={ state.openQuestion===3 }
          >
            <div className="bg-muted-5 pa6">
              Pink.
            </div>
        </Collapsible>

        <hr className="ma0 bb bb-0 b--black-10"/>

        <Collapsible
          header={
            <div className="pv6 hover-c-on-action-secondary">
              What is the air-speed velocity of an unladen swallow?
            </div>
          }
          onClick={toggleAccordion(4)}
          isOpen={ state.openQuestion===4 }
          >
            <div className="bg-muted-5 pa6">
              What do you mean? An African or European swallow?
            </div>
        </Collapsible>
      </Box>
    </div>
  </div>
</div>
```
