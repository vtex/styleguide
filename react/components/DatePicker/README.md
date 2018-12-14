## DatePicker

#### Simple DatePicker

```js
const DatePicker = require('./index.js').default

class DatePickerExample extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div>
        <div className="mb5">
          <DatePicker
            label="Small"
            size="small"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Regular"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Large"
            size="large"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    })
  }
}

;<DatePickerExample />
```

#### DateTimePicker

```js
const DatePicker = require('./index.js').default

class DatePickerExample extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <DatePicker
        value={this.state.startDate}
        onChange={this.handleChange}
        useTime
      />
    )
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    })
  }
}

;<DatePickerExample />
```

#### DateTimePicker with locale

```js
const DatePicker = require('./index.js').default

class DatePickerExample extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
      locale: 'pt-BR',
    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleLocaleChange = this.handleLocaleChange.bind(this)
  }

  handleDateChange(date) {
    this.setState({
      startDate: date,
    })
  }

  handleLocaleChange(event) {
    this.setState({
      locale: event.currentTarget.value,
    })
  }

  render() {
    return (
      <div>
        <div className="mb5">
          <RadioGroup
            name="locale"
            label="Choose locale for DateTimePicker"
            options={[
              { value: 'pt-BR', label: 'pt-BR' },
              { value: 'en-US', label: 'en-US' },
              { value: 'en-GB', label: 'en-GB' },
              { value: 'es', label: 'es' },
            ]}
            value={this.state.locale}
            onChange={this.handleLocaleChange}
          />
        </div>
        <div className="mb5">
          <DatePicker
            locale={this.state.locale}
            onChange={this.handleDateChange}
            useTime={true}
            value={this.state.startDate}
          />
        </div>
      </div>
    )
  }
}

;<DatePickerExample />
```

### Supported locales

You can check out the list of supported locales [here](https://github.com/date-fns/date-fns/blob/master/src/locale/index.js).

#### Variations

```js
const DatePicker = require('./index.js').default

class DatePickerExample extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div>
        <div className="mb5">
          <DatePicker
            disabled
            label="Disabled"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb5">
          <DatePicker
            helpText="Your help text goes here"
            label="Help text"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Error"
            value={this.state.startDate}
            onChange={this.handleChange}
            errorMessage="Invalid field value"
          />
        </div>
      </div>
    )
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    })
  }
}

;<DatePickerExample />
```
