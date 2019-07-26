#### A Datepicker lets the user select a single date and time by interacting with a calendar.

### 👍 Dos

- Combine with Dropdowns or other components if you need more input from the user such as choosing a timezone.
- Combine with the **TimePicker** component for specifing a time when choosing a date.
- For birthdates or other dates that span far to the past or to the future do disable the calendar popover. It's not (yet) built for that, and the user might see herself forced to do a lot of clicks.

### 👎 Don'ts

- For complex tasks such as selecting dates you might be tempted to design a slightly different behavior and build a customization on top of the component. Avoid doing that locally, and consider contributing to the library. More often than you think your need is the same as someone's else.

### Supported locales

You can check out the list of supported locales [here](https://github.com/date-fns/date-fns/blob/master/src/locale/index.js).

#### Simple DatePicker

```js
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

#### Variations

```js
const { subDays, addDays, setHours, setMinutes } = require('date-fns')

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
      timeRangeDate: new Date(),
      upwardsDate: new Date(),
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
        <div className="mv4">
          <DatePicker
            label="Date range"
            maxDate={addDays(new Date(), 5)}
            minDate={new Date()}
            value={this.state.dateRangeDate}
            onChange={date => this.setState({ dateRangeDate: date })}
            locale="pt-BR"
          />
        </div>
        <div className="mv4">
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
        </div>
        <div className="mv4">
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
        </div>
        <div className="mv4">
          <DatePicker
            align="right"
            label="Right-aligned"
            locale="pt-BR"
            onChange={date => this.setState({ rightAlignedDate: date })}
            value={this.state.rightAlignedDate}
          />
        </div>
        <div>
          <span className="mv4">
            <DatePicker
              direction="up"
              label="Upwards"
              locale="pt-BR"
              onChange={date => this.setState({ upwardsDate: date })}
              value={this.state.upwardsDate}
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
          <Button onClick={() => this.ref.current.setFocus()}>Focus!</Button>
        </div>
      </div>
    )
  }
}

;<DatePickerExample />
```
