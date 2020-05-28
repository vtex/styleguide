Button group receives a list of button components with an extra available prop `isActiveOfGroup` as a boolean to display an active state. This has to be handled on the app side.

### Related components

- <a href="#/Components/Navigation/Tabs">tabs</a>

Default

```js
const Button = require('../Button').default
initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <Button
        isActiveOfGroup={state.active === 1}
        onClick={() => setState({ active: 1 })}>
        one
      </Button>,
      <Button
        isActiveOfGroup={state.active === 2}
        onClick={() => setState({ active: 2 })}>
        two
      </Button>,
      <Button
        isActiveOfGroup={state.active === 3}
        onClick={() => setState({ active: 3 })}>
        three
      </Button>,
    ]}
  />
</div>
```

Sizes

```js
const Button = require('../Button').default
initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <Button
        size="small"
        isActiveOfGroup={state.active === 1}
        onClick={() => setState({ active: 1 })}>
        {state.active === 1 ? 'loading' : 'load'}
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 2}
        onClick={() => setState({ active: 2 })}>
        two
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 3}
        onClick={() => setState({ active: 3 })}>
        three
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 4}
        onClick={() => setState({ active: 4 })}>
        four
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 5}
        onClick={() => setState({ active: 5 })}>
        five
      </Button>,
      <Button
        size="small"
        isActiveOfGroup={state.active === 6}
        onClick={() => setState({ active: 6 })}
        isLoading={state.active === 1}>
        Load?
      </Button>,
    ]}
  />
</div>
```

Misc

```js
const Button = require('../Button').default
initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <Button
        disabled
        isActiveOfGroup={state.active === 1}
        onClick={() => setState({ active: 1 })}>
        disabled
      </Button>,
      <Button
        variation="secondary"
        isActiveOfGroup={state.active === 2}
        onClick={() => setState({ active: 2 })}>
        secondary
      </Button>,
      <Button
        variation="tertiary"
        isActiveOfGroup={state.active === 3}
        onClick={() => setState({ active: 3 })}>
        tertiary
      </Button>,
      <Button
        variation="danger"
        isActiveOfGroup={state.active === 4}
        onClick={() => setState({ active: 4 })}>
        danger
      </Button>,
      <Button
        variation="danger-tertiary"
        isActiveOfGroup={state.active === 5}
        onClick={() => setState({ active: 5 })}>
        danger-tertiary
      </Button>,
    ]}
  />
</div>
```

Buttons with icon

```js
const ArrowBack = require('../icon/ArrowBack').default
const Delete = require('../icon/Delete').default
const Edit = require('../icon/Edit').default
const PlusLines = require('../icon/PlusLines').default
const ButtonWithIcon = require('../ButtonWithIcon').default

const arrow = <ArrowBack />
const remove = <Delete />
const edit = <Edit />
const plus = <PlusLines />

initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <ButtonWithIcon
        isActiveOfGroup={state.active === 1}
        onClick={() => setState({ active: 1 })}
        icon={arrow}>
        Back
      </ButtonWithIcon>,
      <ButtonWithIcon
        isActiveOfGroup={state.active === 2}
        onClick={() => setState({ active: 2 })}
        icon={edit}
      />,
      <ButtonWithIcon
        isActiveOfGroup={state.active === 3}
        onClick={() => setState({ active: 3 })}
        icon={plus}
        iconPosition="right"
      />,
      <ButtonWithIcon
        isActiveOfGroup={state.active === 4}
        onClick={() => setState({ active: 4 })}
        icon={remove}
      />,
    ]}
  />
</div>
```

Split Button

```js
const Button = require('../Button').default
const ActionMenu = require('../ActionMenu').default
const CaretDown = require('../icon/CaretDown').default
const caretDown = <CaretDown />

const options = [
  'General',
  'Desktop & Screen Saver',
  'Dock',
  'Language & Region',
].map(label => ({
  label,
  onClick: () => {},
}))

initialState = { active: 1 }
;<div>
  <ButtonGroup
    buttons={[
      <Button isActiveOfGroup>new</Button>,
      <ActionMenu
        isActiveOfGroup
        hideCaretIcon
        buttonProps={{
          variation: 'primary',
          icon: <CaretDown color="currentColor" />,
          iconPosition: 'right',
        }}
        options={options}
      />,
    ]}
  />
</div>
```
