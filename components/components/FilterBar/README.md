#### The FilterBar is a slim, optimized way of displaying filter atoms. Although tailored to be used with the Table component, it can also be used on its own with any other way you chose to display your data.

<div className="center mw7 pv6">
  ![](./filters_table.png)
</div>

Different from regular filter panels, ours optimizes for both the screen real-estate and discoverability of new filters. You can have dozens of different, complex available filters, and still present to the user a slim and simple-to-use interface.

### 👍 Dos

- Apply user research to choose which filters to show in the highlighted section.
- Use the FilterBar always on top of the content that will be filtered.
- Try offering as many filters and operators as possible. With the diversity of operations VTEX supports, we can never predict all the diverse use cases our merchants need.

### 👎 Don'ts

- Don't present too many filters in the highlighted zone.

### Related components

- For applications with a small viewport or when working with modals prefer using the <a href="#/Components/Display/FilterOptions">FilterOptions</a> component.

Simple product filter example

```js
const Input = require('../Input').default

function SimpleInputObject({ value, onChange }) {
  return <Input value={value || ''} onChange={e => onChange(e.target.value)} />
}

class MySimpleFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
    this.getSimpleVerbs = this.getSimpleVerbs.bind(this)
    this.renderSimpleFilterLabel = this.renderSimpleFilterLabel.bind(this)
  }

  getSimpleVerbs() {
    return [
      {
        label: 'is',
        value: '=',
        object: props => <SimpleInputObject {...props} />,
      },
      {
        label: 'is not',
        value: '!=',
        object: props => <SimpleInputObject {...props} />,
      },
      {
        label: 'contains',
        value: 'contains',
        object: props => <SimpleInputObject {...props} />,
      },
    ]
  }

  renderSimpleFilterLabel(statement) {
    if (!statement || !statement.object) {
      // you should treat empty object cases only for alwaysVisibleFilters
      return 'Any'
    }
    return `${
      statement.verb === '='
        ? 'is'
        : statement.verb === '!='
        ? 'is not'
        : 'contains'
    } ${statement.object}`
  }

  render() {
    return (
      <FilterBar
        alwaysVisibleFilters={['id', 'category', 'brand']}
        statements={this.state.statements}
        onChangeStatements={statements => this.setState({ statements })}
        clearAllFiltersButtonLabel="Clear Filters"
        options={{
          id: {
            label: 'ID',
            renderFilterLabel: this.renderSimpleFilterLabel,
            verbs: this.getSimpleVerbs(),
          },
          category: {
            label: 'Category',
            renderFilterLabel: this.renderSimpleFilterLabel,
            verbs: this.getSimpleVerbs(),
          },
          brand: {
            label: 'Brand',
            renderFilterLabel: this.renderSimpleFilterLabel,
            verbs: this.getSimpleVerbs(),
          },
        }}
      />
    )
  }
}
;<MySimpleFilter />
```

Filter users example

```js
const Input = require('../Input').default
const Checkbox = require('../Checkbox').default

const CPF_VALIDATION_REGEX = RegExp('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}')

function SimpleInputObject({ value, onChange }) {
  return <Input value={value || ''} onChange={e => onChange(e.target.value)} />
}

function CpfInputObject({ value, error, onChange }) {
  return (
    <Input
      placeholder="Insert cpf (with punctuation)…"
      errorMessage={value && error}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
    />
  )
}

function CpfInputObjectWithValidation({ onChange, ...props }) {
  return (
    <CpfInputObject
      {...props}
      onChange={value => {
        if (value && value.length < 15 && CPF_VALIDATION_REGEX.test(value)) {
          onChange(value)
        } else {
          onChange(value, 'Invalid CPF')
        }
      }}
    />
  )
}

function AgeInputObject({ value, onChange }) {
  return (
    <Input
      placeholder="Insert age…"
      type="number"
      min="0"
      max="180"
      value={value || ''}
      onChange={e => {
        onChange(e.target.value.replace(/\D/g, ''))
      }}
    />
  )
}

function AgeInputRangeObject({ value, onChange }) {
  const { from = '', to = '' } = value
  return (
    <div className="flex">
      <Input
        placeholder="Age from…"
        errorMessage={
          parseInt(from) >= parseInt(to)
            ? 'Must be smaller than other input'
            : ''
        }
        value={from}
        onChange={e => {
          const newValue = { from, to }
          newValue.from = e.target.value.replace(/\D/g, '')

          onChange(newValue)
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <Input
        placeholder="Age to…"
        value={to}
        onChange={e => {
          const newValue = { from, to }
          newValue.to = e.target.value.replace(/\D/g, '')

          onChange(newValue)
        }}
      />
    </div>
  )
}

function ClassSelectorObject({ value, error, onChange }) {
  const initialValue = {
    vip: true,
    gold: true,
    silver: true,
    platinum: true,
    ...(value || {}),
  }
  const toggleValueByKey = key => {
    const newValues = {
      ...(value || initialValue),
      [key]: value ? !value[key] : false,
    }
    return newValues
  }
  return (
    <div>
      {Object.keys(initialValue).map((opt, index) => {
        return (
          <div className="mb3" key={`class-statment-object-${opt}-${index}`}>
            <Checkbox
              checked={value ? value[opt] : initialValue[opt]}
              id={`class-${opt}`}
              label={opt}
              name="class-checkbox-group"
              onChange={() => {
                const newValue = toggleValueByKey(`${opt}`)
                onChange(newValue)
              }}
              value={opt}
            />
          </div>
        )
      })}
    </div>
  )
}

class MyUsersFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
  }

  render() {
    return (
      <FilterBar
        alwaysVisibleFilters={['name', 'email', 'class']}
        statements={this.state.statements}
        onChangeStatements={statements => this.setState({ statements })}
        clearAllFiltersButtonLabel="Clear Filters"
        options={{
          name: {
            label: 'Name',
            renderFilterLabel: st => {
              if (!st || !st.object) {
                // you should treat empty object cases only for alwaysVisibleFilters
                return 'Any'
              }
              return `${
                st.verb === '='
                  ? 'is'
                  : st.verb === '!='
                  ? 'is not'
                  : 'contains'
              } ${st.object}`
            },
            verbs: [
              {
                label: 'is',
                value: '=',
                object: props => <SimpleInputObject {...props} />,
              },
              {
                label: 'is not',
                value: '!=',
                object: props => <SimpleInputObject {...props} />,
              },
              {
                label: 'contains',
                value: 'contains',
                object: props => <SimpleInputObject {...props} />,
              },
            ],
          },
          email: {
            label: 'Email',
            renderFilterLabel: st => {
              if (!st || !st.object) {
                // you should treat empty object cases only for alwaysVisibleFilters
                return 'Any'
              }
              return `${
                st.verb === '='
                  ? 'is'
                  : st.verb === '!='
                  ? 'is not'
                  : 'contains '
              } ${st.object}`
            },
            verbs: [
              {
                label: 'contains',
                value: 'contains',
                object: props => <SimpleInputObject {...props} />,
              },
              {
                label: 'is',
                value: '=',
                object: props => <SimpleInputObject {...props} />,
              },
              {
                label: 'is not',
                value: '!=',
                object: props => <SimpleInputObject {...props} />,
              },
            ],
          },
          class: {
            label: 'Class',
            renderFilterLabel: st => {
              if (!st || !st.object) {
                // you should treat empty object cases only for alwaysVisibleFilters
                return 'All'
              }
              const keys = st.object ? Object.keys(st.object) : {}
              const isAllTrue = !keys.some(key => !st.object[key])
              const isAllFalse = !keys.some(key => st.object[key])
              const trueKeys = keys.filter(key => st.object[key])
              let trueKeysLabel = ''
              trueKeys.forEach((key, index) => {
                trueKeysLabel += `${key}${
                  index === trueKeys.length - 1 ? '' : ', '
                }`
              })
              return `${
                isAllTrue ? 'All' : isAllFalse ? 'None' : `${trueKeysLabel}`
              }`
            },
            verbs: [
              {
                label: 'includes',
                value: 'includes',
                object: props => <ClassSelectorObject {...props} />,
              },
            ],
          },
          age: {
            label: 'Age',
            renderFilterLabel: st =>
              `${
                st.verb === 'between'
                  ? `between ${st.object.first} and ${st.object.last}`
                  : `is ${st.object}`
              }`,
            verbs: [
              {
                label: 'is',
                value: '=',
                object: props => <AgeInputObject {...props} />,
              },
              {
                label: 'is between',
                value: 'between',
                object: props => <AgeInputRangeObject {...props} />,
              },
            ],
          },
          cpf: {
            label: 'Document',
            renderFilterLabel: st =>
              `${st.verb === '=' ? 'is' : 'contains'} ${st.object}`,
            verbs: [
              {
                label: 'is',
                value: '=',
                object: props => <CpfInputObjectWithValidation {...props} />,
              },
              {
                label: 'contains',
                value: 'contains',
                object: props => <CpfInputObject {...props} />,
              },
            ],
          },
        }}
      />
    )
  }
}
;<MyUsersFilter />
```

Filter orders example

```js
const Input = require('../Input').default
const Checkbox = require('../Checkbox').default
const DatePicker = require('../DatePicker').default

function SimpleInputObject({ value, onChange }) {
  return <Input value={value || ''} onChange={e => onChange(e.target.value)} />
}

function DatePickerObject({ value, onChange }) {
  return (
    <div className="w-100">
      <DatePicker
        value={value || new Date()}
        onChange={date => {
          onChange(date)
        }}
        locale="pt-BR"
      />
    </div>
  )
}

function DatePickerRangeObject({ value, onChange }) {
  return (
    <div className="flex flex-column w-100">
      <br />
      <DatePicker
        label="from"
        value={(value && value.from) || new Date()}
        onChange={date => {
          onChange({ ...(value || {}), from: date })
        }}
        locale="pt-BR"
      />
      <br />
      <DatePicker
        label="to"
        value={(value && value.to) || new Date()}
        onChange={date => {
          onChange({ ...(value || {}), to: date })
        }}
        locale="pt-BR"
      />
    </div>
  )
}

function StatusSelectorObject({ value, onChange }) {
  const initialValue = {
    'Window to cancelation': true,
    Canceling: true,
    Canceled: true,
    'Payment pending': true,
    'Payment approved': true,
    'Ready for handling': true,
    'Handling shipping': true,
    'Ready for invoice': true,
    Invoiced: true,
    Complete: true,
    ...(value || {}),
  }
  const toggleValueByKey = key => {
    return {
      ...(value || initialValue),
      [key]: value ? !value[key] : false,
    }
  }
  return (
    <div>
      {Object.keys(initialValue).map((opt, index) => {
        return (
          <div className="mb3" key={`class-statment-object-${opt}-${index}`}>
            <Checkbox
              checked={value ? value[opt] : initialValue[opt]}
              id={`status-${opt}`}
              label={opt}
              name="status-checkbox-group"
              onChange={() => {
                const newValue = toggleValueByKey(`${opt}`)
                onChange(newValue)
              }}
              value={opt}
            />
          </div>
        )
      })}
    </div>
  )
}

class MyOrdersFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
    this.simpleInputVerbs = this.simpleInputVerbs.bind(this)
  }

  simpleInputVerbs() {
    return [
      {
        label: 'is',
        value: '=',
        object: props => <SimpleInputObject {...props} />,
      },
      {
        label: 'is not',
        value: '!=',
        object: props => <SimpleInputObject {...props} />,
      },
      {
        label: 'contains',
        value: 'contains',
        object: props => <SimpleInputObject {...props} />,
      },
    ]
  }

  render() {
    return (
      <FilterBar
        alwaysVisibleFilters={['id', 'email', 'status', 'invoicedate']}
        statements={this.state.statements}
        onChangeStatements={statements => this.setState({ statements })}
        clearAllFiltersButtonLabel="Clear Filters"
        options={{
          id: {
            label: 'Order ID',
            renderFilterLabel: st => {
              if (!st || !st.object) {
                // you should treat empty object cases only for alwaysVisibleFilters
                return 'Any'
              }
              return `${
                st.verb === '='
                  ? 'is'
                  : st.verb === '!='
                  ? 'is not'
                  : 'contains'
              } ${st.object}`
            },
            verbs: this.simpleInputVerbs(),
          },
          email: {
            label: 'Email',
            renderFilterLabel: st => {
              if (!st || !st.object) {
                // you should treat empty object cases only for alwaysVisibleFilters
                return 'Any'
              }
              return `${
                st.verb === '='
                  ? 'is'
                  : st.verb === '!='
                  ? 'is not'
                  : 'contains '
              } ${st.object}`
            },
            verbs: this.simpleInputVerbs(),
          },
          status: {
            label: 'Status',
            renderFilterLabel: st => {
              if (!st || !st.object) {
                // you should treat empty object cases only for alwaysVisibleFilters
                return 'All'
              }
              const keys = st.object ? Object.keys(st.object) : {}
              const isAllTrue = !keys.some(key => !st.object[key])
              const isAllFalse = !keys.some(key => st.object[key])
              const trueKeys = keys.filter(key => st.object[key])
              let trueKeysLabel = ''
              trueKeys.forEach((key, index) => {
                trueKeysLabel += `${key}${
                  index === trueKeys.length - 1 ? '' : ', '
                }`
              })
              return `${
                isAllTrue ? 'All' : isAllFalse ? 'None' : `${trueKeysLabel}`
              }`
            },
            verbs: [
              {
                label: 'includes',
                value: 'includes',
                object: props => <StatusSelectorObject {...props} />,
              },
            ],
          },
          invoicedate: {
            label: 'Invoiced date',
            renderFilterLabel: st => {
              if (!st || !st.object) return 'All'
              return `${
                st.verb === 'between'
                  ? `between ${st.object.from} and ${st.object.to}`
                  : `is ${st.object}`
              }`
            },
            verbs: [
              {
                label: 'is',
                value: '=',
                object: props => <DatePickerObject {...props} />,
              },
              {
                label: 'is between',
                value: 'between',
                object: props => <DatePickerRangeObject {...props} />,
              },
            ],
          },
          utm: {
            label: 'UTM Source',
            renderFilterLabel: st =>
              `${st.verb === '=' ? 'is' : 'contains'} ${st.object}`,
            verbs: this.simpleInputVerbs(),
          },
          seller: {
            label: 'Seller',
            renderFilterLabel: st =>
              `${st.verb === '=' ? 'is' : 'contains'} ${st.object}`,
            verbs: this.simpleInputVerbs(),
          },
        }}
      />
    )
  }
}
;<MyOrdersFilter />
```
