Sizes
```js
<div>
  <div className="mb5">
    <div className="mb3">Default</div>
    <Dropdown
    options={['Chagall', 'Dali', 'Goya', 'Monet', 'Picasso', 'Toulouse-Lautrec']}
      onChange={() => {}}
      value={'Toulouse-Lautrec'} />
  </div>

  <div className="mb5">
    <div className="mb3">Large</div>
    <Dropdown
      large
      options={['Chagall', 'Dali', 'Goya', 'Monet', 'Picasso', 'Toulouse-Lautrec']}
      onChange={() => {}}
      value={'Toulouse-Lautrec'} />
  </div>

  <div className="mb5">
    <div className="mb3">Extra large</div>
    <Dropdown
      xLarge
      options={['Chagall', 'Dali', 'Goya', 'Monet', 'Picasso', 'Toulouse-Lautrec']}
      onChange={() => {}}
      value={'Toulouse-Lautrec'} />
  </div>
</div>
```

Widths
```js
<div>
  <div className="mb5">
    <div className="mb3">Short</div>
    <Dropdown
      short
      options={['10', '11', '12']}
      onChange={() => {}}
      value={'10'} />
  </div>

  <div className="mb5">
    <div className="mb3">Default</div>
    <Dropdown
    options={['Chagall', 'Dali', 'Goya', 'Monet', 'Picasso', 'Toulouse-Lautrec']}
      onChange={() => {}}
      value={'Toulouse-Lautrec'} />
  </div>

  <div className="mb5">
    <div className="mb3">Long</div>
    <Dropdown
      long
      options={['512 Academy Ave, Sanger, CA 93657, USA', '765 N Temperance Ave, Clovis, CA 93611, USA', '1845 Herndon Ave F, Clovis, CA 93611, USA', '1845 Herndon Ave F, Clovis, CA 93611, USA']}
      onChange={() => {}}
      value={'1845 Herndon Ave F, Clovis, CA 93611, USA'} />
  </div>
</div>
```

Box types

```js
<div>
  <div className="mb5">
    <div className="mb3">Default</div>
    <Dropdown
      xLarge
      options={['Chagall', 'Dali', 'Goya', 'Monet', 'Picasso', 'Toulouse-Lautrec']}
      onChange={() => {}}
      value={'Toulouse-Lautrec'} />
  </div>
  <div className="">
    <div className="mb3">Block</div>
    <Dropdown
      block
      xLarge
      options={['Chagall', 'Dali', 'Goya', 'Monet', 'Picasso', 'Toulouse-Lautrec']}
      onChange={() => {}}
      value={'Toulouse-Lautrec'} />
  </div>
</div>
```

Active
```js
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        open: false,
        value: undefined,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value) {
    this.setState({ value })
  }

  render() {
    return (
      <Dropdown
        options={['Value 1', 'Value 2', 'Value 3', 'Value 4']}
        onChange={this.handleChange}
        value={this.state.value}
        {...this.props}
      />
    )
  }
};
<Example />
```

Disabled
```js
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      value: undefined,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value) {
    this.setState({ value })
  }

  render() {
    return (
      <Dropdown
        options={['Value 1', 'Value 2', 'Value 3', 'Value 4']}
        onChange={this.handleChange}
        value={this.state.value}
        {...this.props}
      />
    )
  }
};
<Example disabled />
```
