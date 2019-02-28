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
    onClick: () => alert('I’m sorry, Dave. I’m afraid I can’t do that.'),
  },
  {
    label: 'Have you heard about the word?',
    onClick: () => alert('sure, everybody knows that the bird is the word...'),
  },
  {
    label: 'Hey look',
    onClick: () => alert('Listen!'),
  },
  {
    label: 'Quit now and cake will be served',
    isDangerous: 'true',
    onClick: () => alert('The cake is a lie'),
  },
]

;<div className="flex">
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
          disabled: true,
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'secondary',
          disabled: true,
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        buttonProps={{
          variation: 'tertiary',
          disabled: true,
        }}
        options={options}
      />
    </div>
  </div>
</div>
```

With icons

```js
const OptionsDots = require('../icon/OptionsDots').default
const Cog = require('../icon/Cog').default

const options = [
  'General',
  'Desktop & Screen Saver',
  'Dock',
  'Language & Region',
  'Security & Privacy',
  'Notifications',
  'Displays',
  'Energy Saver',
  'Keyboard',
  'Mouse',
  'Trackpad',
  'Pronters & Scanners',
  'Sound',
  'Startup Disk',
  'Internet Accounts',
  'Software Update',
  'Network',
  'Bluetooth',
  'Extensions',
  'Sharing',
  'Users & Groups',
  'Parental Controls',
  'Date & Time',
  'Accessibility',
].map(label => ({
  label,
  onClick: () => {},
}))

;<div className="flex">
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        buttonProps={{
          variation: 'primary',
          icon: <Cog color="currentColor" />,
        }}
        label="Settings"
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <Cog color="currentColor" />,
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
        hideCaretIcon
        buttonProps={{
          variation: 'primary',
          icon: <OptionsDots color="currentColor" />,
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        hideCaretIcon
        buttonProps={{
          variation: 'tertiary',
          icon: <OptionsDots color="currentColor" />,
        }}
        options={options}
      />
    </div>
  </div>
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        label="Actions"
        hideCaretIcon
        buttonProps={{
          variation: 'primary',
          icon: <OptionsDots color="currentColor" />,
          iconPosition: 'right',
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        label="Actions"
        hideCaretIcon
        buttonProps={{
          variation: 'tertiary',
          icon: <OptionsDots color="currentColor" />,
          iconPosition: 'right',
        }}
        options={options}
      />
    </div>
  </div>
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        buttonProps={{
          variation: 'primary',
          icon: <OptionsDots color="currentColor" />,
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <OptionsDots color="currentColor" />,
        }}
        options={options}
      />
    </div>
  </div>
  <div className="flex flex-column">
    <div className="ma3">
      <ActionMenu
        buttonProps={{
          variation: 'primary',
        }}
        options={options}
      />
    </div>
    <div className="ma3">
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
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
    onClick: () => alert('I’m sorry, Dave. I’m afraid I can’t do that.'),
  },
  {
    label: 'Have you heard about the word?',
    onClick: () => alert('sure, everybody knows that the bird is the word...'),
  },
  {
    label: 'Hey look',
    onClick: () => alert('Listen!'),
  },
  {
    label: 'Quit now and cake will be served',
    isDangerous: 'true',
    onClick: () => alert('The cake is a lie'),
  },
]

;<div className="flex items-center">
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
