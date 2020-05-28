#### Conditions works like a filter

- Conditions component is based on creating statements.

### Statements

- Statements are composed of 3 basic atoms (subject, verb and object), here are some use cases if you are filtering user data for example:

- Filtering a specific user by name

  - subject: User Name
  - verb: is
  - object: John Doe

- Filtering gmail users

  - subject: Email
  - verb: contains
  - object: @gmail.com

### 👍 Dos

- Use clear verbs and subjects, which should be intuitive and provide sufficient context for the user take that decision.
- Initialize it with a default value that makes sense to your needs. (example: initial render already with an active filter)

### 👎 Don'ts

- Don't use too complex components as objects for a statement. If your statement object is too complex, maybe you should break it in simpler statements options and the complex case can be contemplated by using multiple simpler statements.

Simple

```js
const Input = require('../Input').default

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      simpleStatements: [],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
    this.simpleInputObject = this.simpleInputObject.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <Input
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          this.setState({ simpleStatements: statements })
        }}
      />
    )
  }

  render() {
    const options = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: this.simpleInputObject,
              extraParams: {},
            },
          },
          {
            label: 'is not',
            value: '!=',
            object: {
              renderFn: this.simpleInputObject,
              extraParams: {},
            },
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: {
              renderFn: this.simpleInputObject,
              extraParams: {},
            },
          },
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: this.simpleInputObject,
              extraParams: {},
            },
          },
          {
            label: 'is not',
            value: '!=',
            object: {
              renderFn: this.simpleInputObject,
              extraParams: {},
            },
          },
        ],
      },
    }

    return (
      <EXPERIMENTAL_Conditions
        options={options}
        subjectPlaceholder="Select subject"
        statements={this.state.simpleStatements}
        operator={this.state.operator}
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={statements => {
          this.setState({ simpleStatements: statements })
        }}
      />
    )
  }
}
;<SimpleConditionsCase />
```

Complex

```js
const Dropdown = require('../Dropdown').default

const possibleColors = [
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
  { label: 'Grey', value: 'grey' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Dark-blue', value: 'dark-blue' },
  { label: 'Dark-red', value: 'dark-red' },
  { label: 'Light-blue', value: 'light-blue' },
]

class ComplexConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      statements: [],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
    this.complexDropdownObject = this.complexDropdownObject.bind(this)
    this.complexMultiselectObject = this.complexMultiselectObject.bind(this)
    this.complexDatePickerObject = this.complexDatePickerObject.bind(this)
    this.complexDatePickerRangeObject = this.complexDatePickerRangeObject.bind(
      this
    )
    this.complexNumericInputObject = this.complexNumericInputObject.bind(this)
    this.complexNumericInputRangeObject = this.complexNumericInputRangeObject.bind(
      this
    )
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  complexDropdownObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <Dropdown
        value={values}
        options={possibleColors}
        onChange={(e, value) => {
          statements[statementIndex].object = value

          this.setState({ statements })
        }}
      />
    )
  }

  complexMultiselectObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <div className="nt3">
        <MultiSelect
          emptyState={term => {
            return `Your search for the color "${term}" did not find any results.`
          }}
          options={possibleColors}
          onChange={selected => {
            statements[statementIndex].object = selected

            this.setState({ statements })
          }}
          selected={values || []}
        />
      </div>
    )
  }

  complexDatePickerObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <DatePicker
        value={values || new Date()}
        onChange={date => {
          statements[statementIndex].object = date
          this.setState({ statements })
        }}
        locale="en-US"
      />
    )
  }

  complexDatePickerRangeObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <div className="flex">
        <div style={{ maxWidth: 140 }}>
          <DatePicker
            style={{ maxWidth: 140 }}
            value={values && values.from}
            errorMessage={
              statements[statementIndex].object &&
              statements[statementIndex].object.from >=
                statements[statementIndex].object.to
                ? 'Must be before end date'
                : ''
            }
            onChange={date => {
              statements[statementIndex].object = {
                ...(statements[statementIndex].object || {}),
                from: date,
              }

              this.setState({ statements })
            }}
            locale="en-US"
          />
        </div>

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <div style={{ maxWidth: 140 }}>
          <DatePicker
            value={values && values.to}
            onChange={date => {
              statements[statementIndex].object = {
                ...(statements[statementIndex].object || {}),
                to: date,
              }

              this.setState({ statements })
            }}
            locale="en-US"
          />
        </div>
      </div>
    )
  }

  complexNumericInputObject({ statements, values, statementIndex, error }) {
    return (
      <Input
        placeholder="Insert age..."
        type="number"
        min={0}
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value.replace(/\D/g, '')
          this.setState({ statements })
        }}
      />
    )
  }

  complexNumericInputRangeObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <div className="flex">
        <Input
          placeholder="Age from..."
          errorMessage={
            statements[statementIndex].object &&
            parseInt(statements[statementIndex].object.first) >=
              parseInt(statements[statementIndex].object.last)
              ? 'Must be smaller than other input'
              : ''
          }
          value={values && values.first ? values.first : ''}
          onChange={e => {
            const currentObject = statements[statementIndex].object || {}
            currentObject.first = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            this.setState({ statements })
          }}
        />

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <Input
          placeholder="Age to..."
          value={values && values.last ? values.last : ''}
          onChange={e => {
            const currentObject = statements[statementIndex].object || {}
            currentObject.last = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            this.setState({ statements })
          }}
        />
      </div>
    )
  }

  render() {
    const options = {
      age: {
        unique: true,
        label: 'User age',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: this.complexNumericInputObject,
              extraParams: {},
            },
          },
          {
            label: 'is between',
            value: 'between',
            object: {
              renderFn: this.complexNumericInputRangeObject,
              extraParams: {},
            },
          },
        ],
      },
      color: {
        unique: true,
        label: 'User favorite color',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: this.complexDropdownObject,
              extraParams: {},
            },
          },
          {
            label: 'is any of',
            value: 'any',
            object: {
              renderFn: this.complexMultiselectObject,
              extraParams: {},
            },
          },
        ],
      },
      birthday: {
        unique: true,
        label: 'User birthday',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: this.complexDatePickerObject,
              extraParams: {},
            },
          },
          {
            label: 'is between',
            value: 'between',
            object: {
              renderFn: this.complexDatePickerRangeObject,
              extraParams: {},
            },
          },
        ],
      },
    }

    return (
      <EXPERIMENTAL_Conditions
        options={options}
        subjectPlaceholder="Select subject"
        statements={this.state.statements}
        operator={this.state.operator}
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={statements => {
          this.setState({ statements })
        }}
      />
    )
  }
}
;<ComplexConditionsCase />
```

Using ref

```js
const Button = require('../Button').default
const Input = require('../Input').default

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      simpleStatements: [
        { subject: 'name', verb: '=', object: 'a', error: null },
        { subject: 'name', verb: '=', object: 'b', error: null },
        { subject: 'name', verb: '=', object: 'c', error: null },
      ],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
    this.simpleInputObject = this.simpleInputObject.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <Input
        ref={statements[statementIndex].refs.object}
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          this.setState({ simpleStatements: statements })
        }}
      />
    )
  }

  render() {
    const options = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: {
              renderFn: this.simpleInputObject,
              extraParams: {},
            },
          },
        ],
      },
    }

    return (
      <div>
        <EXPERIMENTAL_Conditions
          options={options}
          subjectPlaceholder="Select subject"
          statements={this.state.simpleStatements}
          operator={this.state.operator}
          onChangeOperator={this.handleToggleOperator}
          onChangeStatements={statements => {
            this.setState({ simpleStatements: statements })
          }}
        />
        <div className="mt4">
          <span className="mr4">
            <Button
              onClick={() =>
                this.state.simpleStatements[0].refs.subject.current.focus()
              }>
              Focus on first subject
            </Button>
          </span>
          <span className="mr4">
            <Button
              onClick={() =>
                this.state.simpleStatements[0].refs.verb.current.focus()
              }>
              Focus on first verb
            </Button>
          </span>
          <span className="mr4">
            <Button
              onClick={() =>
                this.state.simpleStatements[0].refs.object.current.focus()
              }>
              Focus on first object
            </Button>
          </span>
        </div>
      </div>
    )
  }
}
;<SimpleConditionsCase />
```
