#### Action Menus are contextual menus that let the user chose and execute actions from a list.

### 👍 Dos
- Use _isDangerous_ for destructive actions that delete data or lead to a state that is hard to recover. Danger buttons should always have a confirmation dialog.

### 👎 Don'ts
- It's OK to hide the caret when using the OptionsDots icon, but avoid otherwise. It's important to signify that this button behaves differently than normal ones.


Using button variations

```js
const options = [
  {
    label: 'Open pod doors, HAL',
    handleCallback: () => alert('I’m sorry, Dave. I’m afraid I can’t do that.')
  },
  {
    label: 'Have you heard about the word?',
    handleCallback: () => alert('sure, everybody knows that the bird is the word...')
  },
  {
    label: 'Hey look',
    handleCallback: () => alert('Listen!')
  },
  {
    label: 'Quit now and cake will be served',
    isDangerous: 'true',
    handleCallback: () => alert('The cake is a lie')
  },
];

<div className="flex">
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'primary',
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'secondary',
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'tertiary',
        }}
        options={options}
      />
    </div>
  </div>
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'primary',
          disabled: 'true'
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'secondary',
          disabled: 'true'
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'tertiary',
          disabled: 'true'
        }}
        options={options}
      />
    </div>
  </div>
</div>
```

With icons

```js
const OptionsDots = require('../icon/OptionsDots').default;
const Cog = require('../icon/Cog').default;

const options = [
  {
    label: 'Open pod doors, HAL',
    handleCallback: () => alert('I’m sorry, Dave. I’m afraid I can’t do that.')
  },
  {
    label: 'Have you heard about the word?',
    handleCallback: () => alert('sure, everybody knows that the bird is the word...')
  },
  {
    label: 'Hey look',
    handleCallback: () => alert('Listen!')
  },
  {
    label: 'Quit now and cake will be served',
    isDangerous: 'true',
    handleCallback: () => alert('The cake is a lie')
  },
];

<div className="flex">
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        icon={<Cog color="currentColor"/>}
        buttonProps={{
          variation: 'primary',
        }}
        label="Settings"
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        icon={<Cog color="currentColor"/>}
        buttonProps={{
          variation: 'secondary',
        }}
        label="Settings"
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        icon={<Cog color="currentColor"/>}
        buttonProps={{
          variation: 'tertiary',
        }}
        label="Settings"
        options={options}
      />
    </div>
  </div>
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        label="Actions"
        icon={<OptionsDots color="currentColor"/>}
        hideCaretIcon
        buttonProps={{
          variation: 'primary',
          icon: true
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        icon={<OptionsDots />}
        hideCaretIcon
        buttonProps={{
          variation: 'secondary',
          icon: true
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        icon={<OptionsDots />}
        hideCaretIcon
        buttonProps={{
          variation: 'tertiary',
          icon: true
        }}
        options={options}
      />
    </div>
  </div>
</div>

```

Menu Alignment

```js
const options = [
  {
    label: 'Open pod doors, HAL',
    handleCallback: () => alert('I’m sorry, Dave. I’m afraid I can’t do that.')
  },
  {
    label: 'Have you heard about the word?',
    handleCallback: () => alert('sure, everybody knows that the bird is the word...')
  },
  {
    label: 'Hey look',
    handleCallback: () => alert('Listen!')
  },
  {
    label: 'Quit now and cake will be served',
    isDangerous: 'true',
    handleCallback: () => alert('The cake is a lie')
  },
];

<div className="flex flex-column items-center">
  <div className="ma3">
    <ActionMenu
      label="left-aligned"
      align="left"
      buttonProps={{
        variation: 'primary',
      }}
      options={options}
    />
  </div>
  <div className="ma3">
    <ActionMenu
      label="right-aligned"
      align="right"
      buttonProps={{
        variation: 'primary',
      }}
      options={options}
    />
  </div>
</div>
```