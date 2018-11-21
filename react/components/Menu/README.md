#### A Menu is a list of actions that a user can perform.

### 👍 Dos

- Use Menu component to create more complex components that need to list actions.

### 👎 Don'ts

- Don't use a Menu alone, check the related components below.

### Related components

- Consider a <a href="#/Components/Forms?id=dropdownmenu">DropdownMenu</a> when you want to present a group of actions the user can take.
- Consider a <a href="#/Components/Forms?id=contextmenu">ContextMenu</a> if you want to provide a list of actions that change following the context.
- Consider a <a href="#/Components/Forms?id=dropdown">Dropdown</a> if you expect the user to select a value from a preset of options.

Left Aligned

```js
<div style={{ height: '10rem' }}>
  <Menu
    isOpen
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

Right Aligned (default)

```js
<div style={{ height: '10rem' }}>
  <Menu
    isOpen
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
      <div style={{ height: '14rem' }}>
        <Menu
          isOpen
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
