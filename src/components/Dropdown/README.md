Sizes
```js
<div>
  <div className="mb5">
    <Dropdown
      label="Default"
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value="tolouseLautrec"
      onChange={() => {}} />
  </div>

  <div className="mb5">
    <Dropdown
      label="Large"
      size="large"
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value="tolouseLautrec"
      onChange={() => {}} />
  </div>

  <div>
    <Dropdown
      label="Extra Large"
      size="x-large"
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value="tolouseLautrec"
      onChange={() => {}} />
  </div>
</div>
```

Variations
```js
<div className="w-40">
  <div className="mb5">
    <Dropdown
      label="Caption"
      optionsCaption="Select an artist"
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value=""
      onChange={() => {}} />
  </div>
  <div className="mb5">
    <Dropdown
      label="Disabled"
      disabled
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value="tolouseLautrec"
      onChange={() => {}} />
  </div>
  <div className="mb5">
    <Dropdown
      label="Error"
      errorMessage="Required field"
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value="tolouseLautrec"
      onChange={() => {}} />
  </div>
  <div>
    <Dropdown
      label="Help text"
      helpText={<span>Your help text goes here!</span>}
      options={[
        {value: 'chagall', label: 'Chagall'},
        {value: 'dali', label: 'Dali'},
        {value: 'goya', label: 'Goya'},
        {value: 'monet', label: 'Monet'},
        {value: 'picasso', label: 'Picasso'},
        {value: 'tolouseLautrec', label: 'Toulouse-Lautrec'}
      ]}
      value="tolouseLautrec"
      onChange={() => {}} />
  </div>
</div>
```

Example: Working React Component
```js
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        selectedPainter: {},
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, painter) {
    this.setState({ selectedPainter: painter })
  }

  render() {
    return (
      <div className="w-40">
        <div>
          <Dropdown
            label="Painter"
            options={[
              {value: 'painterChagall', label: 'Chagall'},
              {value: 'painterDali', label: 'Dali'},
              {value: 'painterGoya', label: 'Goya'},
              {value: 'painterMonet', label: 'Monet'},
              {value: 'painterPicasso', label: 'Picasso'},
              {value: 'painterTolouseLautrec', label: 'Toulouse-Lautrec'}
            ]}
            onChange={this.handleChange}
            value={this.state.selectedPainter.value}
            {...this.props}
          />
        </div>
        <div className="mt6">
          <div className="fw5 mb3">
            Selected Painter
          </div>
          <p>Label: {this.state.selectedPainter.label || <span className="gray">undefined</span>}</p>
          <p>Value: {this.state.selectedPainter.value || <span className="gray">undefined</span>}</p>
        </div>
      </div>
    )
  }
};
<Example />
```
