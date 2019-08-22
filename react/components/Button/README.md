#### Buttons are independent interactive elements used to trigger actions or to perform navigation.

### Chosing a variation
Our Styleguide defines 3 main variations based on the button visual proeminence. As with any UI element, the proeminence should be proportional to the importance of that element.
- Do mix variations as needed.
- Avoid having more than one Primary button, save this kind for the most important or most recommended action in a given screen.
- Use the Danger variation for destructive actions that delete data or lead to a state that is hard to recover. Danger buttons should _always_ have a confirmation dialog.
- In doubt, use Secondary buttons.
- Since reading speed can be slowed down by up to 20% when reading all caps (Breland & Breland - 1944), beware of "phrase long" button texts. Keep it short, and make your point in 3 words or less.


Types

```js
<div className="flex justify-center">
  <div className="flex flex-column items-center w-100">
    <span className="mb4">
      <Button variation="primary">Primary</Button>
    </span>
    <span className="mb4">
      <Button variation="secondary">Secondary</Button>
    </span>
    <span className="mb4">
      <Button variation="tertiary">Tertiary</Button>
    </span>
    <span className="mb4">
      <Button variation="danger">Danger</Button>
    </span>
    <span className="mb4">
      <Button variation="danger-tertiary">Danger Tertiary</Button>
    </span>
    <span className="bg-base--inverted w-100 pa4 flex justify-center">
      <span className="mb4">
        <Button variation="inverted-tertiary">Inverted Tertiary</Button>
      </span>
    </span>
  </div>
  <div className="flex flex-column items-center w-100">
    <span className="mb4">
      <Button variation="primary" disabled>Primary</Button>
    </span>
    <span className="mb4">
      <Button variation="secondary" disabled>Secondary</Button>
    </span>
    <span className="mb4">
      <Button variation="tertiary" disabled>Tertiary</Button>
    </span>
    <span className="mb4">
      <Button variation="danger" disabled>Danger</Button>
    </span>
    <span className="mb4">
      <Button variation="danger-tertiary" disabled>Danger Tertiary</Button>
    </span>
    <span className="bg-base--inverted w-100 pa4 flex justify-center">
      <span className="mb4">
        <Button variation="inverted-tertiary" disabled>Inverted Tertiary</Button>
      </span>
    </span>
  </div>
</div>
```

Sizes

```js
<div>
  <div className="mb4">
    <span className="mr4">
      <Button variation="primary" size="small">
        Small
      </Button>
    </span>
    <span className="mr4">
      <Button variation="primary">
        Regular
      </Button>
    </span>
    <span className="mr4">
      <Button variation="primary" size="large">
        Large
      </Button>
    </span>
  </div>
  <div className="mb4">
    <span className="mr4">
      <Button variation="secondary" size="small">
        Small
      </Button>
    </span>
    <span className="mr4">
      <Button variation="secondary" size="regular">
        Regular
      </Button>
    </span>
    <span className="mr4">
      <Button variation="secondary" size="large">
        Large
      </Button>
    </span>
  </div>
  <div className="mb4">
    <span className="mr4">
      <Button variation="tertiary" size="small">
        Small
      </Button>
    </span>
    <span className="mr4">
      <Button variation="tertiary" size="regular">
        Regular
      </Button>
    </span>
    <span className="mr4">
      <Button variation="tertiary" size="large">
        Large
      </Button>
    </span>
  </div>
  <div className="mb4">
    <span className="mr4">
      <Button variation="danger" size="small">
        Small
      </Button>
    </span>
    <span className="mr4">
      <Button variation="danger" size="regular">
        Regular
      </Button>
    </span>
    <span className="mr4">
      <Button variation="danger" size="large">
        Large
      </Button>
    </span>
  </div>
  <div className="mb4">
    <span className="mr4">
      <Button variation="danger-tertiary" size="small">
        Small
      </Button>
    </span>
    <span className="mr4">
      <Button variation="danger-tertiary" size="regular">
        Regular
      </Button>
    </span>
    <span className="mr4">
      <Button variation="danger-tertiary" size="large">
        Large
      </Button>
    </span>
  </div>
</div>
```

Box types

```js
<div>
  <div className="mb4">
    <Button variation="primary">Default</Button>
  </div>
  <div className="mb4">
    <Button variation="primary" block>
      Block
    </Button>
  </div>
</div>
```

Link mode

```js
<div className="mb4">
  <Button variation="primary" href="http://vtex.com" target="_blank">Sign in</Button>
</div>
```

Cancelling out button paddings. Useful for visually aligning tertiary buttons

```js
const Box = require('../Box').default

;<>
  <div className="flex justify-center">
    <div className="flex flex-column w-60">
      <div className="t-heading-6 mb4">Use collapse props when tertiary button is alone, to align it with the other elements</div>
      <div className="w-100 mb4">
        <Box />
      </div>
      <div className="mb4 flex justify-between">
        <Button variation="tertiary" collapseLeft>Collapse left</Button>
        <Button variation="tertiary" collapseRight>Collapse right</Button>
      </div>
    </div>
  </div>
  <div className="flex justify-center mt6">
    <div className="flex flex-column w-60">
      <div className="t-heading-6 mb4">Don't collapse when the button is not alone</div>
      <div className="w-100 mb4">
        <Box />
      </div>
      <div className="mb4 flex">
        <Button variation="tertiary">Default</Button>
        <div className="ml2">
          <Button variation="secondary">Another Button</Button>
        </div>
      </div>
    </div>
  </div>
  <div className="flex justify-center mt6">
    <div className="flex flex-column w-60">
      <div className="t-heading-6 mb4">Collapse props don't work on primary and secondary variations (and it shouldn't)</div>
      <div className="w-100 mb4">
        <Box />
      </div>
      <div className="mb4 flex justify-between">
        <Button variation="primary" collapseLeft>Collapse left</Button>
        <Button variation="primary" collapseRight>Collapse right</Button>
      </div>
      <div className="w-100 mb4">
        <Box />
      </div>
      <div className="mb4 flex justify-between">
        <Button variation="secondary" collapseLeft>Collapse left</Button>
        <Button variation="secondary" collapseRight>Collapse right</Button>
      </div>
    </div>
  </div>
</>;
```
Colored container background

```js
<div className="bg-warning--faded pa5">
  <div>
    <span className="mr4">
      <Button variation="primary">Primary</Button>
    </span>
    <span className="mr4">
      <Button variation="secondary">Secondary</Button>
    </span>
    <span className="mr4">
      <Button variation="tertiary">Neutral</Button>
    </span>
  </div>
  <div className="mt4">
    <span className="mr4">
      <Button variation="primary" disabled>Primary</Button>
    </span>
    <span className="mr4">
      <Button variation="secondary" disabled>Secondary</Button>
    </span>
    <span className="mr4">
      <Button variation="tertiary" disabled>Neutral</Button>
    </span>
  </div>
</div>
```

Loading state

```js
initialState = { isLoading1: true, isLoading2: true, isLoading3: true  };
<div>
  <div className="mt4">
    <Button
      variation="primary"
      onClick={() => setState({ isLoading2: !state.isLoading2 })}
      isLoading={state.isLoading2}
    >
      Toggle loading state
    </Button>
  </div>
</div>
```
