#### The FilterOptions is a more horizontally compacted way of displaying filter atoms. Although designed to be used with the Modal component, it can also be used on its own with any other way you chose to display your data.

The FilterOptions is optimized for small viewport applications which do not provide enough horizontal space to work with. Making use of vertical collapsible components, it displays filter data to the user allowing them to choose which filter suits their needs.

### 👍 Dos

- Use the FilterOptions near of the content that will be filtered.
- Try offering as many filters and operators as possible. With the diversity of operations VTEX supports, we can never predict all the diverse use cases our merchants need.
- Hide the component when possible. After applying the filters is possible to display which filters are applied with other components.

### 👎 Don'ts

- Don't present too many filters in one single FilterOptions.

### Related components

- For applications with a larger viewport or when working with tables prefer using the <a href="#/Components/Display/FilterBar">FilterBar</a> component.

Simple product filter example

```js
const Input = require('../Input').default

class MySimpleFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
    this.simpleInputObject = this.simpleInputObject.bind(this)
    this.getSimpleVerbs = this.getSimpleVerbs.bind(this)
    this.renderSimpleFilterLabel = this.renderSimpleFilterLabel.bind(this)
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        value={values || ''}
        onChange={e => onChangeObjectCallback(e.target.value)}
      />
    )
  }

  getSimpleVerbs() {
    return [
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
      {
        label: 'contains',
        value: 'contains',
        object: {
          renderFn: this.simpleInputObject,
          extraParams: {},
        },
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
      <FilterOptions
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
class MyUsersFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
    this.simpleInputObject = this.simpleInputObject.bind(this)
    this.cpfInputObject = this.cpfInputObject.bind(this)
    this.ageInputObject = this.ageInputObject.bind(this)
    this.ageInputRangeObject = this.ageInputRangeObject.bind(this)
    this.classSelectorObject = this.classSelectorObject.bind(this)
    this.cpfValidationRegex = RegExp(
      '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})'
    )
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        value={values || ''}
        onChange={e => onChangeObjectCallback(e.target.value)}
      />
    )
  }

  cpfInputObject(
    { statements, values, statementIndex, error, onChangeObjectCallback },
    shouldValidate = false
  ) {
    const errorMessage =
      shouldValidate && values
        ? this.cpfValidationRegex.test(values)
          ? null
          : 'Invalid CPF'
        : null
    return (
      <Input
        placeholder="Insert cpf…"
        type="number"
        errorMessage={errorMessage}
        min={0}
        value={values || ''}
        onChange={e => {
          onChangeObjectCallback(e.target.value.replace(/\D/g, ''))
        }}
      />
    )
  }

  ageInputObject({
    statements,
    values,
    statementIndex,
    error,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        placeholder="Insert age…"
        type="number"
        min="0"
        max="180"
        value={values || ''}
        onChange={e => {
          onChangeObjectCallback(e.target.value.replace(/\D/g, ''))
        }}
      />
    )
  }

  ageInputRangeObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <div className="flex">
        <Input
          placeholder="Age from…"
          errorMessage={
            statements[statementIndex].object &&
            parseInt(statements[statementIndex].object.first) >=
              parseInt(statements[statementIndex].object.last)
              ? 'Must be smaller than other input'
              : ''
          }
          value={values && values.first ? values.first : ''}
          onChange={e => {
            const currentObject = values || {}
            currentObject.first = e.target.value.replace(/\D/g, '')

            onChangeObjectCallback(currentObject)
          }}
        />

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <Input
          placeholder="Age to…"
          value={values && values.last ? values.last : ''}
          onChange={e => {
            const currentObject = values || {}
            currentObject.last = e.target.value.replace(/\D/g, '')

            onChangeObjectCallback(currentObject)
          }}
        />
      </div>
    )
  }

  classSelectorObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    const initialValue = {
      vip: true,
      gold: true,
      silver: true,
      platinum: true,
    }

    const toCheckedMap = ([key, value]) => [key, { label: key, checked: value }]
    const toValues = ([key, value]) => [key, value.checked]

    const checkedMap = Object.fromEntries(
      Object.entries({ ...initialValue, ...(values || {}) }).map(toCheckedMap)
    )
    return (
      <CheckboxGroup
        name="simpleCheckboxGroup"
        label="All Filters"
        checkedMap={checkedMap}
        onGroupChange={checkedMap => {
          const newValues = Object.fromEntries(
            Object.entries(checkedMap).map(toValues)
          )
          onChangeObjectCallback(newValues)
        }}
      />
    )
  }

  render() {
    return (
      <FilterOptions
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
              {
                label: 'contains',
                value: 'contains',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: this.classSelectorObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: this.ageInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'is between',
                value: 'between',
                object: {
                  renderFn: this.ageInputRangeObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: obj => this.cpfInputObject(obj, true),
                  extraParams: {},
                },
              },
              {
                label: 'contains',
                value: 'contains',
                object: {
                  renderFn: this.cpfInputObject,
                  extraParams: {},
                },
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
class MyOrdersFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
    this.simpleInputObject = this.simpleInputObject.bind(this)
    this.simpleInputVerbs = this.simpleInputVerbs.bind(this)
    this.datePickerObject = this.datePickerObject.bind(this)
    this.datePickerRangeObject = this.datePickerRangeObject.bind(this)
    this.statusSelectorObject = this.statusSelectorObject.bind(this)
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        value={values || ''}
        onChange={e => onChangeObjectCallback(e.target.value)}
      />
    )
  }

  simpleInputVerbs() {
    return [
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
      {
        label: 'contains',
        value: 'contains',
        object: {
          renderFn: this.simpleInputObject,
          extraParams: {},
        },
      },
    ]
  }

  datePickerObject({
    statements,
    values,
    statementIndex,
    error,
    onChangeObjectCallback,
  }) {
    return (
      <div className="w-100">
        <DatePicker
          value={values || new Date()}
          onChange={date => {
            onChangeObjectCallback(date)
          }}
          locale="pt-BR"
        />
      </div>
    )
  }

  datePickerRangeObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <div className="flex flex-column w-100">
        <br />
        <DatePicker
          label="from"
          value={(values && values.from) || new Date()}
          onChange={date => {
            onChangeObjectCallback({ ...(values || {}), from: date })
          }}
          locale="pt-BR"
        />
        <br />
        <DatePicker
          label="to"
          value={(values && values.to) || new Date()}
          onChange={date => {
            onChangeObjectCallback({ ...(values || {}), to: date })
          }}
          locale="pt-BR"
        />
      </div>
    )
  }

  statusSelectorObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
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
    }
    const toCheckedMap = ([key, value]) => [key, { label: key, checked: value }]
    const toValues = ([key, value]) => [key, value.checked]

    const checkedMap = Object.fromEntries(
      Object.entries({ ...initialValue, ...(values || {}) }).map(toCheckedMap)
    )
    return (
      <CheckboxGroup
        name="simpleCheckboxGroup"
        label="All Filters"
        checkedMap={checkedMap}
        onGroupChange={checkedMap => {
          const newValues = Object.fromEntries(
            Object.entries(checkedMap).map(toValues)
          )
          onChangeObjectCallback(newValues)
        }}
      />
    )
  }

  render() {
    return (
      <FilterOptions
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
                object: {
                  renderFn: this.statusSelectorObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: this.datePickerObject,
                  extraParams: {},
                },
              },
              {
                label: 'is between',
                value: 'between',
                object: {
                  renderFn: this.datePickerRangeObject,
                  extraParams: {},
                },
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

Filter Options with Modal Example

```js
const Button = require('../Button').default
const Modal = require('../Modal').default
const Input = require('../Input').default
const CheckboxGroup = require('../CheckboxGroup').default

class MyUsersFilter extends React.Component {
  constructor() {
    super()
    this.state = { statements: [] }
    this.simpleInputObject = this.simpleInputObject.bind(this)
    this.cpfInputObject = this.cpfInputObject.bind(this)
    this.ageInputObject = this.ageInputObject.bind(this)
    this.ageInputRangeObject = this.ageInputRangeObject.bind(this)
    this.classSelectorObject = this.classSelectorObject.bind(this)
    this.cpfValidationRegex = RegExp(
      '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})'
    )
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        value={values || ''}
        onChange={e => onChangeObjectCallback(e.target.value)}
      />
    )
  }

  cpfInputObject(
    { statements, values, statementIndex, error, onChangeObjectCallback },
    shouldValidate = false
  ) {
    const errorMessage =
      shouldValidate && values
        ? this.cpfValidationRegex.test(values)
          ? null
          : 'Invalid CPF'
        : null
    return (
      <Input
        placeholder="Insert cpf…"
        type="number"
        errorMessage={errorMessage}
        min={0}
        value={values || ''}
        onChange={e => {
          onChangeObjectCallback(e.target.value.replace(/\D/g, ''))
        }}
      />
    )
  }

  ageInputObject({
    statements,
    values,
    statementIndex,
    error,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        placeholder="Insert age…"
        type="number"
        min="0"
        max="180"
        value={values || ''}
        onChange={e => {
          onChangeObjectCallback(e.target.value.replace(/\D/g, ''))
        }}
      />
    )
  }

  ageInputRangeObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    return (
      <div className="flex">
        <Input
          placeholder="Age from…"
          errorMessage={
            statements[statementIndex].object &&
            parseInt(statements[statementIndex].object.first) >=
              parseInt(statements[statementIndex].object.last)
              ? 'Must be smaller than other input'
              : ''
          }
          value={values && values.first ? values.first : ''}
          onChange={e => {
            const currentObject = values || {}
            currentObject.first = e.target.value.replace(/\D/g, '')

            onChangeObjectCallback(currentObject)
          }}
        />

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <Input
          placeholder="Age to…"
          value={values && values.last ? values.last : ''}
          onChange={e => {
            const currentObject = values || {}
            currentObject.last = e.target.value.replace(/\D/g, '')

            onChangeObjectCallback(currentObject)
          }}
        />
      </div>
    )
  }

  classSelectorObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    const initialValue = {
      vip: true,
      gold: true,
      silver: true,
      platinum: true,
    }

    const toCheckedMap = ([key, value]) => [key, { label: key, checked: value }]
    const toValues = ([key, value]) => [key, value.checked]

    const checkedMap = Object.fromEntries(
      Object.entries({ ...initialValue, ...(values || {}) }).map(toCheckedMap)
    )
    return (
      <CheckboxGroup
        name="simpleCheckboxGroup"
        label="All Filters"
        checkedMap={checkedMap}
        onGroupChange={checkedMap => {
          const newValues = Object.fromEntries(
            Object.entries(checkedMap).map(toValues)
          )
          onChangeObjectCallback(newValues)
        }}
      />
    )
  }

  render() {
    return (
      <FilterOptions
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
              {
                label: 'contains',
                value: 'contains',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: this.classSelectorObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: this.ageInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'is between',
                value: 'between',
                object: {
                  renderFn: this.ageInputRangeObject,
                  extraParams: {},
                },
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
                object: {
                  renderFn: obj => this.cpfInputObject(obj, true),
                  extraParams: {},
                },
              },
              {
                label: 'contains',
                value: 'contains',
                object: {
                  renderFn: this.cpfInputObject,
                  extraParams: {},
                },
              },
            ],
          },
        }}
      />
    )
  }
}

class ModalExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpenModal}>Filters</Button>

        <Modal
          isOpen={this.state.isModalOpen}
          title="User Filters"
          responsiveFullScreen
          centered
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button variation="tertiary" onClick={this.handleCloseModal}>
                  Clear
                </Button>
              </span>
              <span>
                <Button variation="secondary" onClick={this.handleCloseModal}>
                  Apply
                </Button>
              </span>
            </div>
          }
          onClose={this.handleCloseModal}>
          <div style={{ width: '300px' }}>
            <MyUsersFilter />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

;<ModalExample />
```
