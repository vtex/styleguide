#### A Datepicker lets the user select a single date and time by interacting with a calendar.

### 👍 Dos

- Combine with Dropdowns or other components if you need more input from the user such as choosing a timezone or for different ways of selecting times.
- For birthdates or other dates that span far to the past or to the future do disable the calendar popover. It's not (yet) built for that, and the user might see herself forced to do a lot of clicks.

### 👎 Don'ts

- For complex tasks such as selecting dates you might be tempted to design a slightly different behavior and build a customization on top of the component. Avoid doing that locally, and consider contributing to the library. More often than you think your need is the same as someone's else.

### Supported locales

You can check out the list of supported locales [here](https://github.com/date-fns/date-fns/blob/master/src/locale/index.js).

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
            locale="pt-BR"
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Regular"
            value={this.state.startDate}
            onChange={this.handleChange}
            locale="pt-BR"
          />
        </div>

        <div className="mb5">
          <DatePicker
            label="Large"
            size="large"
            value={this.state.startDate}
            onChange={this.handleChange}
            locale="pt-BR"
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
      placeholderDate: null,
      readOnlyDate: new Date(),
      requiredDate: null,
      rightAlignedDate: new Date(),
      upwardsDirectedDate: new Date(),
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
          <span className="mr4">
            <DatePicker
              label="Custom time intervals"
              timeIntervals={5}
              useTime
              value={this.state.customTimeIntervalsDate}
              onChange={date =>
                this.setState({ customTimeIntervalsDate: date })
              }
              locale="pt-BR"
            />
          </span>
          <span className="mr4">
            <DatePicker
              label="Date range"
              maxDate={addDays(new Date(), 5)}
              minDate={new Date()}
              value={this.state.dateRangeDate}
              onChange={date => this.setState({ dateRangeDate: date })}
              locale="pt-BR"
            />
          </span>
          <span className="mr4">
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
              locale="pt-BR"
            />
          </span>
        </div>

        <div className="mb5">
          <span className="mr4">
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
              locale="pt-BR"
            />
          </span>
          <span className="mr4">
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
              locale="pt-BR"
            />
          </span>
          <span className="mr4">
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
              locale="pt-BR"
            />
          </span>
        </div>

        <div className="mb5">
          <span className="mr4">
            <DatePicker
              align="right"
              label="Right-aligned"
              locale="pt-BR"
              onChange={date => this.setState({ rightAlignedDate: date })}
              value={this.state.rightAlignedDate}
            />
          </span>
          <span className="mr4">
            <DatePicker
              direction="up"
              label="Upwards-directed"
              locale="pt-BR"
              onChange={date => this.setState({ upwardsDirectedDate: date })}
              value={this.state.upwardsDirectedDate}
            />
          </span>
        </div>
      </div>
    )
  }
}

;<DatePickerExample />
```

#### Using ref

```js
const DatePicker = require('./index.js').default
const Button = require('../Button/index.js').default

class DatePickerExample extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
    this.state = {
      startDate: new Date(),
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
            ref={this.ref}
            label="Click in the button below to focus on this DatePicker"
            value={this.state.startDate}
            onChange={this.handleChange}
            locale="pt-BR"
          />
        </div>

        <div className="mb5">
          <Button onClick={() => this.ref.current.focus()}>Focus!</Button>
        </div>
      </div>
    )
  }
}

;<DatePickerExample />
```
