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

function SimpleInputObject({ object, onChange }) {
  return <Input value={object || ''} onChange={e => onChange(e.target.value)} />
}

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      simpleStatements: [],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  render() {
    const options = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: <SimpleInputObject />,
          },
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
      },
    }

    return (
      <Conditions
        canDelete
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={statements => {
          console.log('Changed statements to:', statements)
          this.setState({ simpleStatements: statements })
        }}
        operator={this.state.operator}
        options={options}
        subjectPlaceholder="Select subject"
        statements={this.state.simpleStatements}
      />
    )
  }
}
;<SimpleConditionsCase />
```

Unique

```js
const Input = require('../Input').default

function SimpleInputObject({ object, onChange }) {
  return <Input value={object || ''} onChange={e => onChange(e.target.value)} />
}

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      simpleStatements: [],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  render() {
    const options = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
        unique: true,
      },
      surname: {
        label: 'Last name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
        unique: true,
      },
      country: {
        label: 'Country of residence',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
        unique: true,
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: <SimpleInputObject />,
          },
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
      },
    }

    return (
      <Conditions
        canDelete
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={statements => {
          console.log('Changed statements to:', statements)
          this.setState({ simpleStatements: statements })
        }}
        operator={this.state.operator}
        options={options}
        subjectPlaceholder="Select subject"
        statements={this.state.simpleStatements}
      />
    )
  }
}
;<SimpleConditionsCase />
```

Mobile

```js
const Input = require('../Input').default

function SimpleInputObject({ object, onChange }) {
  return <Input value={object || ''} onChange={e => onChange(e.target.value)} />
}

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      simpleStatements: [],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  render() {
    const options = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: <SimpleInputObject />,
          },
          {
            label: 'is',
            value: '=',
            object: <SimpleInputObject />,
          },
          {
            label: 'is not',
            value: '!=',
            object: <SimpleInputObject />,
          },
        ],
      },
    }

    return (
      <Conditions
        canDelete
        isFullWidth
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={statements => {
          console.log('Changed statements to:', statements)
          this.setState({ simpleStatements: statements })
        }}
        operator={this.state.operator}
        options={options}
        subjectPlaceholder="Select subject"
        statements={this.state.simpleStatements}
      />
    )
  }
}
;<SimpleConditionsCase />
```

Complex

```js
const DatePicker = require('../DatePicker').default
const Dropdown = require('../Dropdown').default
const Input = require('../Input').default
const Select = require('../EXPERIMENTAL_Select').default

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

function SimpleInputObject({ object, onChange }) {
  return <Input value={object || ''} onChange={e => onChange(e.target.value)} />
}

function ComplexDropdownObject({ object, onChange }) {
  return (
    <Dropdown
      value={object}
      options={possibleColors}
      onChange={(e, value) => {
        onChange(value)
      }}
    />
  )
}

function ComplexSelectObject({ object, onChange }) {
  return (
    <Select
      multi
      onChange={values => onChange(values)}
      options={possibleColors}
    />
  )
}

function ComplexNumericInputObject({ object, onChange }) {
  return (
    <Input
      min="0"
      onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
      placeholder="Insert age..."
      type="number"
      value={object || ''}
    />
  )
}

function ComplexNumericInputRangeObject({ object, onChange }) {
  return (
    <div className="flex">
      <Input
        type="number"
        min="0"
        placeholder="Age from..."
        errorMessage={
          object && parseInt(object.first) >= parseInt(object.last)
            ? 'Must be smaller than other input'
            : ''
        }
        value={object && object.first ? object.first : ''}
        onChange={e =>
          onChange({
            ...object,
            first: e.target.value.replace(/\D/g, ''),
          })
        }
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <Input
        type="number"
        min={(object && `${parseInt(object.first) + 1}`) || '0'}
        placeholder="Age to..."
        value={object && object.last ? object.last : ''}
        onChange={e =>
          onChange({
            ...object,
            last: e.target.value.replace(/\D/g, ''),
          })
        }
      />
    </div>
  )
}

function ComplexDatePickerObject({ object, onChange }) {
  console.log(object)
  return (
    <DatePicker
      locale="en-US"
      onChange={date => onChange(date)}
      value={object}
    />
  )
}

function ComplexDatePickerRangeObject({ object, onChange }) {
  return (
    <div className="flex">
      <div style={{ maxWidth: 140 }}>
        <DatePicker
          errorMessage={
            object && object.from >= object.to ? 'Must be before end date' : ''
          }
          locale="en-US"
          onChange={date =>
            onChange({
              ...object,
              from: date,
            })
          }
          value={object && object.from}
        />
      </div>

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <div style={{ maxWidth: 140 }}>
        <DatePicker
          locale="en-US"
          onChange={date =>
            onChange({
              ...object,
              to: date,
            })
          }
          value={object && object.to}
        />
      </div>
    </div>
  )
}

class ComplexConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = {
      statements: [],
      operator: 'all',
    }

    this.handleToggleOperator = this.handleToggleOperator.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
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
            object: <ComplexNumericInputObject />,
          },
          {
            label: 'is between',
            value: 'between',
            object: <ComplexNumericInputRangeObject />,
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
            object: <ComplexDropdownObject />,
          },
          {
            label: 'is any of',
            value: 'any',
            object: <ComplexSelectObject />,
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
            object: <ComplexDatePickerObject />,
          },
          {
            label: 'is between',
            value: 'between',
            object: <ComplexDatePickerRangeObject />,
          },
        ],
      },
    }

    return (
      <Conditions
        onChangeStatements={statements => {
          console.log('Changed statements to:', statements)
          this.setState({ statements })
        }}
        onChangeOperator={this.handleToggleOperator}
        operator={this.state.operator}
        options={options}
        statements={this.state.statements}
        subjectPlaceholder="Select subject"
      />
    )
  }
}
;<ComplexConditionsCase />
```
