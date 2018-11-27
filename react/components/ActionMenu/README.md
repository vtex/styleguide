#### An ActionMenu lets a user choose an action to perform from a list of options (menu).

### 👍 Dos

- Give a comprehensive title (label) that helps the user to choose the best action to take.
- Use `isDangerous` prop for options that perform dangerous actions like deleting.
- Use `shouldCloseOnClick` prop for auto closing menu after clicking an option.
- Use `isSimpleIcon` prop when you want an icon (not a button with an icon) to identify your menu.

### 👎 Don'ts

- Don't use an ActionMenu if you want to provide a list of options that doesn't represent actions.

### Related components

- Consider a <a href="#/Components/Forms?id=dropdown">Dropdown</a> if you expect the user to select a value from a list of options that doesn't represent actions.
- This component uses the Menu component (the list of actions) that should never be used alone.


Alignment

```js
<div className="flex flex-row w-100 justify-between">
  <div className="ma3">
    <ActionMenu
      label="box aligned left"
      align="left"
      boxWidth="100%"
      options={[
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
          handleCallback: () => alert('The cake is a lie')
        },
      ]}
    />
  </div>
  <div className="ma3">
    <ActionMenu
      label="box aligned right"
      boxWidth="100%"
      options={[
        {
          label: 'Start front engines motors',
          handleCallback: () => alert('beep!')
        },
        {
          label: 'Engage side thrusters heating',
          handleCallback: () => alert('boop!')
        },
        {
          label: 'Commence take off immediatelly',
          handleCallback: () => alert('meerp!')
        },
        {
          label: 'Prepare for Adama maneuver',
          handleCallback: () => alert('Do a barrel roll!')
        },
      ]}
    />
  </div>
</div>
```

With toggles

```js
class MenusExample extends React.Component {
  constructor() {
    super()
    this.state = {
      songOption0: true,
      songOption1: true,
      songOption2: false,
      songOption3: false,
      songOption4: true,
      songOption5: true,
      songOption6: false,
      songOption7: true,
      songOption8: true,
      songOption9: false,
      songOption10: true,
    }
  }

  render() {
    return (
      <div>
        <ActionMenu
          label="big list example"
          align="left"
          options={[
            {
              label: 'Syncopation',
              handleCallback: () => this.setState({ songOption0: !this.state.songOption0 }),
              toggle: {
                checked: this.state.songOption0,
                handleChange: () => {},
              }
            },
            {
              label: 'Beat',
              handleCallback: () => this.setState({ songOption1: !this.state.songOption1 }),
              toggle: {
                checked: this.state.songOption1,
                handleChange: () => {},
              }
            },
            {
              label: 'Meter',
              handleCallback: () => this.setState({ songOption2: !this.state.songOption2 }),
              toggle: {
                checked: this.state.songOption2,
                handleChange: () => {},
              }
            },
            {
              label: 'Tempo',
              handleCallback: () => this.setState({ songOption3: !this.state.songOption3 }),
              toggle: {
                checked: this.state.songOption3,
                handleChange: () => {},
              }
            },
            {
              label: 'Melody',
              handleCallback: () => this.setState({ songOption4: !this.state.songOption4 }),
              toggle: {
                checked: this.state.songOption4,
                handleChange: () => {},
              }
            },
            {
              label: 'Harmony',
              handleCallback: () => this.setState({ songOption5: !this.state.songOption5 }),
              toggle: {
                checked: this.state.songOption5,
                handleChange: () => {},
              }
            },
            {
              label: 'Chord',
              handleCallback: () => this.setState({ songOption6: !this.state.songOption6 }),
              toggle: {
                checked: this.state.songOption6,
                handleChange: () => {},
              }
            },
            {
              label: 'Progression',
              handleCallback: () => this.setState({ songOption7: !this.state.songOption7 }),
              toggle: {
                checked: this.state.songOption7,
                handleChange: () => {},
              }
            },
            {
              label: 'Tone',
              handleCallback: () => this.setState({ songOption8: !this.state.songOption8 }),
              toggle: {
                checked: this.state.songOption8,
                handleChange: () => {},
              }
            },
            {
              label: 'Texture',
              handleCallback: () => this.setState({ songOption9: !this.state.songOption9 }),
              toggle: {
                checked: this.state.songOption9,
                handleChange: () => {},
              }
            },
            {
              label: 'Form',
              handleCallback: () => this.setState({ songOption10: !this.state.songOption10 }),
              toggle: {
                checked: this.state.songOption10,
                handleChange: () => {},
              }
            },
          ]}
        />
      </div>
    );
  }
};<MenusExample />
```

Button with icon
```js
const Cog = require('../icon/Cog').default;
<div className="ma3">
  <ActionMenu
    icon={<Cog color="currentColor" size={13} />}
    label="Settings"
    align="left"
    boxWidth="100%"
    options={[
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
        handleCallback: () => alert('The cake is a lie')
      },
    ]}
  />
</div>
```

Button only with icon
```js
const Cog = require('../icon/Cog').default;
<div className="ma3">
  <ActionMenu
    icon={<Cog color="currentColor" size={13} />}
    showCaretIcon={false}
    align="left"
    boxWidth="100%"
    options={[
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
        handleCallback: () => alert('The cake is a lie')
      },
    ]}
  />
</div>
```

Without caret
```js
<div className="ma3">
  <ActionMenu
    label="Options"
    align="left"
    boxWidth="100%"
    showCaretIcon={false}
    options={[
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
        handleCallback: () => alert('The cake is a lie')
      },
    ]}
  />
</div>
```

Simple icon right aligned
```js
const OptionsDots = require('../icon/OptionsDots').default;
<div className="ma3">
  <ActionMenu
    isSimpleIcon
    shouldCloseOnClick
    icon={<OptionsDots />}
    showCaretIcon={false}
    boxWidth="100%"
    options={[
      {
        label: 'Remove something',
        isDangerous: true,
        handleCallback: () => alert('you are removing something important')
      },
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
        handleCallback: () => alert('The cake is a lie')
      },
    ]}
  />
</div>
```
