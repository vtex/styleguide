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

### Supported locales

You can check out the list of supported locales [here](https://github.com/date-fns/date-fns/blob/master/src/locale/index.js).

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

#### Variations

```js
const { subDays, addDays, setHours, setMinutes } = require('date-fns')
const DatePicker = require('./index.js').default

class DatePickerExample extends React.Component {
  constructor() {
    super()
    this.state = {
      customTimeIntervalsDate: new Date(),
      dateRangeDate: new Date(),
      disabledDate: new Date(),
      errorDate: new Date(),
      excludeDatesDate: new Date(),
      excludeTimesDate: new Date(),
      helpTextDate: new Date(),
      includeDatesDate: new Date(),
      includeTimesDate: new Date(),
      placeholderDate: new Date(),
      readOnlyDate: new Date(),
      requiredDate: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    })
  }

  render() {
    return (
      <div>
        <div className="mb5">
          <DatePicker
            disabled
            label="Disabled"
            value={this.state.disabledDate}
            onChange={date => this.setState({ disabledDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Read only"
            readOnly
            value={this.state.readOnlyDate}
            onChange={date => this.setState({ readOnlyDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Required"
            required
            value={this.state.requiredDate}
            onChange={date => this.setState({ requiredDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Placeholder"
            placeholder="Your placeholder text goes here"
            value={this.state.placeholderDate}
            onChange={date => this.setState({ placeholderDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            helpText="Your help text goes here"
            label="Help text"
            value={this.state.helpTextDate}
            onChange={date => this.setState({ helpTextDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            errorMessage="Invalid field value"
            label="Error"
            value={this.state.errorDate}
            onChange={date => this.setState({ errorDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Custom time intervals"
            timeIntervals={5}
            useTime
            value={this.state.customTimeIntervalsDate}
            onChange={date => this.setState({ customTimeIntervalsDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Date range"
            maxDate={addDays(new Date(), 5)}
            minDate={new Date()}
            value={this.state.dateRangeDate}
            onChange={date => this.setState({ dateRangeDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            excludeDates={[
              subDays(new Date(), 4),
              subDays(new Date(), 2),
              new Date(),
              addDays(new Date(), 2),
              addDays(new Date(), 4),
            ]}
            label="Exclude dates"
            value={this.state.excludeDatesDate}
            onChange={date => this.setState({ excludeDatesDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            includeDates={[
              subDays(new Date(), 4),
              subDays(new Date(), 2),
              new Date(),
              addDays(new Date(), 2),
              addDays(new Date(), 4),
            ]}
            label="Include dates"
            value={this.state.includeDatesDate}
            onChange={date => this.setState({ includeDatesDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
              setHours(setMinutes(new Date(), 30), 18),
              setHours(setMinutes(new Date(), 30), 19),
              setHours(setMinutes(new Date(), 30), 17),
            ]}
            label="Exclude times"
            useTime
            value={this.state.excludeTimesDate}
            onChange={date => this.setState({ excludeTimesDate: date })}
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Include times"
            includeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
              setHours(setMinutes(new Date(), 30), 18),
              setHours(setMinutes(new Date(), 30), 19),
              setHours(setMinutes(new Date(), 30), 17),
            ]}
            useTime
            value={this.state.includeTimesDate}
            onChange={date => this.setState({ includeTimesDate: date })}
          />
        </div>
      </div>
    )
  }
}

;<DatePickerExample />
```
