Sizes
```js
<div>
  <div className="mb5">
    <Dropdown
      id="sizeDefault"
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
      id="sizeLarge"
      label="Large"
      large
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
      id="sizeExtraLarge"
      label="Extra Large"
      xLarge
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

Widths
```js
<div>
  <div className="mb5">
    <Dropdown
      id="widthShort"
      label="Short"
      short
      options={[
        {value: '10', label: '10'},
        {value: '11', label: '11'},
        {value: '12', label: '12'}
      ]}
      value="10"
      onChange={() => {}} />
  </div>

  <div className="mb5">
    <Dropdown
      id="widthDefault"
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
      id="widthLong"
      label="Long"
      long
      options={[
        {value: 'address01', label: '512 Academy Ave, Sanger, CA 93657, USA'},
        {value: 'address02', label: '765 N Temperance Ave, Clovis, CA 93611, USA'},
        {value: 'address03', label: '1845 Herndon Ave F, Clovis, CA 93611, USA'},
      ]}
      value="address03"
      onChange={() => {}} />
  </div>
</div>
```

Box types

```js
<div>
  <div className="mb5">
    <Dropdown
      id="boxDefault"
      label="Default"
      xLarge
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
  <div className="">
    <Dropdown
      id="boxBlock"
      label="Block"
      block
      xLarge
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

Disabled
```js
  <Dropdown
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
      <div>
        <div>
          <Dropdown
            label="Painter"
            id="painter"
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
