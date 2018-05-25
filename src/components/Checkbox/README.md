Master

```js
class MasterCheckboxExample extends React.Component {
  constructor() {
    this.state = {
      isChecked: true,
    }
  }

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.isChecked}
          id="master-checkbox-0"
          label="Checked"
          name="master-checkbox-group"
          onChange={() => this.setState({isChecked: !this.state.isChecked})}
          value="option-0"
        />
      </div>
    )
  }
}
;<MasterCheckboxExample />
```

Default

```js
class DefaultCheckboxExample extends React.Component {
  constructor() {
    super()

    this.state = {
      defaultCheckboxes: ['option-0'],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value){
    let checkBoxes = this.state.defaultCheckboxes.slice()
    let valueIndex = checkBoxes.indexOf(value)
    if (valueIndex === -1) {
      checkBoxes = checkBoxes.concat(value)
    } else {
      checkBoxes.splice(valueIndex, 1)
    }
    this.setState({
      defaultCheckboxes: checkBoxes,
    })
  }

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.defaultCheckboxes.indexOf('option-0') !== -1}
          id="default-checkbox-0"
          label="Option 0"
          name="default-checkbox-group"
          onChange={this.handleChange}
          value="option-0"
        />
        <Checkbox
        checked={this.state.defaultCheckboxes.indexOf('option-1') !== -1}
          id="default-checkbox-1"
          label="Option 1"
          name="default-checkbox-group"
          onChange={this.handleChange}
          value="option-1"
        />
      </div>
    )
  }
}
;<DefaultCheckboxExample />
```

Disabled

```js
class DisabledCheckboxExample extends React.Component {
  constructor() {
    this.state = {
      disabledCheckboxes: ['option-0'],
    }
  }

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.disabledCheckboxes.indexOf('option-0') !== -1}
          disabled
          id="disabled-checkbox-0"
          label="Option 0"
          name="disabledcheckbox-group"
          onChange={() => {}}
          value="option-0"
        />
        <Checkbox
          checked={this.state.disabledCheckboxes.indexOf('option-1') !== -1}
          disabled
          id="disabled-checkbox-1"
          label="Option 1"
          name="disabled-checkbox-group"
          onChange={() => {}}
          value="option-1"
        />
      </div>
    )
  }
}
;<DisabledCheckboxExample />
```

