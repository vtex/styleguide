Sizes

```js
<div>
  <div className="mb5">
    <Dropdown
      label="Default"
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>

  <div className="mb5">
    <Dropdown
      label="Large"
      size="large"
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>

  <div>
    <Dropdown
      label="Extra Large"
      size="x-large"
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>
</div>
```

Variations

```js
<div className="w-40">
  <div className="mb5">
    <Dropdown
      label="Placeholder"
      placeholder="Select an artist"
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value=""
      onChange={() => {}}
    />
  </div>
  <div className="mb5">
    <Dropdown
      label="Disabled"
      disabled
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>
  <div className="mb5">
    <Dropdown
      label="Error"
      errorMessage="Required field"
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>
  <div className="mb5">
    <Dropdown
      label="Help text"
      helpText={<span>Your help text goes here!</span>}
      options={[
        { value: 'chagall', label: 'Chagall' },
        { value: 'dali', label: 'Dali' },
        { value: 'goya', label: 'Goya' },
        { value: 'monet', label: 'Monet' },
        { value: 'picasso', label: 'Picasso' },
        { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>
  <div>
    <Dropdown
      label="Prevent truncate"
      preventTruncate
      options={[
        {
          value: 'chagall',
          label: 'Marc Zakharovich Chagall, born Moishe Zakharovich Shagal',
        },
        {
          value: 'dali',
          label:
            'Salvador Domingo Felipe Jacinto Dalí i Domènech, Marquis of Dalí de Púbol, known professionally as Salvador Dalí',
        },
        { value: 'goya', label: 'Francisco José de Goya y Lucientes' },
        { value: 'monet', label: 'Oscar-Claude Monet' },
        { value: 'picasso', label: 'Pablo Picasso' },
        {
          value: 'tolouseLautrec',
          label:
            'Henri Marie Raymond de Toulouse-Lautrec-Monfa, also known as Henri de Toulouse-Lautrec',
        },
      ]}
      value="tolouseLautrec"
      onChange={() => {}}
    />
  </div>
</div>
```

Example: Working React Component

```js
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [
        { value: 'painterChagall', label: 'Chagall' },
        { value: 'painterDali', label: 'Dali' },
        { value: 'painterGoya', label: 'Goya' },
        { value: 'painterMonet', label: 'Monet' },
        { value: 'painterPicasso', label: 'Picasso' },
        { value: 'painterTolouseLautrec', label: 'Toulouse-Lautrec' },
      ],
      selectedPainter: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, value) {
    this.setState({ selectedPainter: value })
  }

  render() {
    const selectedPainter = this.state.options.find(
      painter => painter.value === this.state.selectedPainter,
    )

    const { label, value } = selectedPainter || {}

    return (
      <div className="w-40">
        <div>
          <Dropdown
            label="Painter"
            options={this.state.options}
            onChange={this.handleChange}
            value={this.state.selectedPainter}
            placeholder="Select a painter"
            {...this.props}
          />
        </div>
        <div className="mt6">
          <div className="fw5 mb3">Selected Painter</div>
          <p>Label: {label || <span className="gray">undefined</span>}</p>
          <p>Value: {value || <span className="gray">undefined</span>}</p>
        </div>
      </div>
    )
  }
}
;<Example />
```

One liner

```js
<Dropdown
  onliner
  label="Default"
  options={[
    { value: 'chagall', label: 'Chagall' },
    { value: 'dali', label: 'Dali' },
    { value: 'goya', label: 'Goya' },
    { value: 'monet', label: 'Monet' },
    { value: 'picasso', label: 'Picasso' },
    { value: 'tolouseLautrec', label: 'Toulouse-Lautrec' },
  ]}
  value="tolouseLautrec"
  onChange={() => {}}
/>
```
