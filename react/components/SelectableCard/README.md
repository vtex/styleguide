#### A Selectable Card represents a need for the user to make a choice among a few offered options.

### 👍 Dos

- Keep the list of options short. More than 4 options might start looking weird.
- Always leave an option from the list selected by default.

### 👎 Don'ts

- Don't offer overlapping options, they should be clearly mutually exclusive.

### Related components

- Consider using a <a href="#/Components/Forms/RadioGroup">Radio Group</a> if you prefer your options to be displayed vertically.
- Consider using a <a href="#/Components/Forms/Checkbox">Checkbox</a> if you need the user to select more than one option.
- Consider using a <a href="#/Components/Forms/Dropdown">Dropdown</a> if you have several options and they don't need much explanation.

Default

```js
class SelectableCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 'card1' }
  }

  isSelected(opt) {
    return opt === this.state.selected
  }

  changeSelected(opt) {
    this.setState({ selected: opt })
  }

  render() {
    return (
      <div className="pa5 flex justify-center">
        <SelectableCard
          hasGroupRigth
          noPadding
          selected={this.isSelected('card1')}
          onClick={() => this.setState({ selected: 'card1' })}>
          <div className="pa7">
            <div className="f3 tc">Card 1</div>
          </div>
        </SelectableCard>
        <SelectableCard
          hasGroupRigth
          hasGroupLeft
          noPadding
          selected={this.isSelected('card2')}
          onClick={() => this.setState({ selected: 'card2' })}>
          <div className="pa7">
            <div className="f3 tc">Card 2</div>
          </div>
        </SelectableCard>
        <SelectableCard
          hasGroupRigth
          hasGroupLeft
          noPadding
          selected={this.isSelected('card3')}
          onClick={() => this.setState({ selected: 'card3' })}>
          <div className="pa7">
            <div className="f3 tc">Card 3</div>
          </div>
        </SelectableCard>
        <SelectableCard
          hasGroupLeft
          noPadding
          selected={this.isSelected('card4')}
          onClick={() => this.setState({ selected: 'card4' })}>
          <div className="pa7">
            <div className="f3 tc">Card 4</div>
          </div>
        </SelectableCard>
      </div>
    )
  }
}

;<SelectableCards />
```
