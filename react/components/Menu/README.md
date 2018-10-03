WIP docs. this is menu, pls use with caution.
When it haz some documentation it will be really awesome. And you will never use it wrongly (I hope)
Thanks for the attention. For all the lovelly ppl who did read this far, many thanks...

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
        <div className="flex flex-row">
          <div className="mh3">
            <Menu
              label="aligned right"
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
                  label: 'Does wise men also have fears?',
                  handleCallback: () => alert('There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.')
                },
                {
                  label: 'Quit now and cake will be served',
                  handleCallback: () => alert('The cake is a lie')
                },
              ]}
            />
          </div>
          <div className="mh3">
            <Menu
              label="aligned left"
              align="left"
              boxWidth="100%"
              options={[
                {
                  label: 'Start front engines',
                  handleCallback: () => alert('beep!')
                },
                {
                  label: 'Engage side thrusters',
                  handleCallback: () => alert('boop!')
                },
                {
                  label: 'Commence take off',
                  handleCallback: () => alert('meerp!')
                },
              ]}
            />
          </div>
          <div className="mh3">
            <Menu
              label="big list example"
              align="left"
              options={[
                {
                  label: 'Syncopation',
                  handleCallback: () => this.setState({ songOption0: !this.state.songOption0 }),
                  toggle: {
                    checked: this.state.songOption0,
                  }
                },
                {
                  label: 'Beat',
                  handleCallback: () => this.setState({ songOption1: !this.state.songOption1 }),
                  toggle: {
                    checked: this.state.songOption1,
                  }
                },
                {
                  label: 'Meter',
                  handleCallback: () => this.setState({ songOption2: !this.state.songOption2 }),
                  toggle: {
                    checked: this.state.songOption2,
                  }
                },
                {
                  label: 'Tempo',
                  handleCallback: () => this.setState({ songOption3: !this.state.songOption3 }),
                  toggle: {
                    checked: this.state.songOption3,
                  }
                },
                {
                  label: 'Melody',
                  handleCallback: () => this.setState({ songOption4: !this.state.songOption4 }),
                  toggle: {
                    checked: this.state.songOption4,
                  }
                },
                {
                  label: 'Harmony',
                  handleCallback: () => this.setState({ songOption5: !this.state.songOption5 }),
                  toggle: {
                    checked: this.state.songOption5,
                  }
                },
                {
                  label: 'Chord',
                  handleCallback: () => this.setState({ songOption6: !this.state.songOption6 }),
                  toggle: {
                    checked: this.state.songOption6,
                  }
                },
                {
                  label: 'Progression',
                  handleCallback: () => this.setState({ songOption7: !this.state.songOption7 }),
                  toggle: {
                    checked: this.state.songOption7,
                  }
                },
                {
                  label: 'Tone',
                  handleCallback: () => this.setState({ songOption8: !this.state.songOption8 }),
                  toggle: {
                    checked: this.state.songOption8,
                  }
                },
                {
                  label: 'Texture',
                  handleCallback: () => this.setState({ songOption9: !this.state.songOption9 }),
                  toggle: {
                    checked: this.state.songOption9,
                  }
                },
                {
                  label: 'Form',
                  handleCallback: () => this.setState({ songOption10: !this.state.songOption10 }),
                  toggle: {
                    checked: this.state.songOption10,
                  }
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
};<MenusExample />
```