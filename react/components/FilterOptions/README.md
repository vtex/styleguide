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
const Input = require('../Input').default
const CheckboxGroup = require('../CheckboxGroup').default

function ClassSelectorObject({
  statements,
  value,
  statementIndex,
  error,
  extraParams,
  onChange,
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
    Object.entries({ ...initialValue, ...(value || {}) }).map(toCheckedMap)
  )
  return (
    <CheckboxGroup
      id="simpleCheckboxGroup"
      name="simpleCheckboxGroup"
      label="All Filters"
      checkedMap={checkedMap}
      onGroupChange={checkedMap => {
        const newValues = Object.fromEntries(
          Object.entries(checkedMap).map(toValues)
        )
        onChange(newValues)
      }}
    />
  )
}

function CpfInputObject({ value, onChange }, shouldValidate = false) {
  function validateCPF(cpf) {
    if (!cpf) {
      return false
    }

    let sum = 0
    let remainder

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }
    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.substring(10, 11))) return false
    return true
  }

  const errorMessage =
    shouldValidate && value ? (validateCPF(value) ? null : 'Invalid CPF') : null
  return (
    <Input
      placeholder="Insert cpf…"
      type="number"
      errorMessage={errorMessage}
      min={0}
      maxLength={11}
      value={value || ''}
      onChange={e => {
        onChange(e.target.value.replace(/\D/g, ''))
      }}
    />
  )
}

function SimpleInputObject({ value, onChange }) {
  return <Input value={value || ''} onChange={e => onChange(e.target.value)} />
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
  return (
    <div className="flex">
      <Input
        placeholder="Age from…"
        errorMessage={
          value && parseInt(value.first) >= parseInt(value.last)
            ? 'Must be smaller than other input'
            : ''
        }
        value={value && value.first ? value.first : ''}
        onChange={e => {
          const currentObject = value || {}
          currentObject.first = e.target.value.replace(/\D/g, '')

          onChange(currentObject)
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <Input
        placeholder="Age to…"
        value={value && value.last ? value.last : ''}
        onChange={e => {
          const currentObject = value || {}
          currentObject.last = e.target.value.replace(/\D/g, '')

          onChange(currentObject)
        }}
      />
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
                object: props => <CpfInputObject {...props} />,
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
const CheckboxGroup = require('../CheckboxGroup').default
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
  }
  const toCheckedMap = ([key, value]) => [key, { label: key, checked: value }]
  const toValues = ([key, value]) => [key, value.checked]

  const checkedMap = Object.fromEntries(
    Object.entries({ ...initialValue, ...(value || {}) }).map(toCheckedMap)
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
        onChange(newValues)
      }}
    />
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

Filter Options with Modal Example

```js
const Modal = require('../Modal').default
const Button = require('../Button').default
const Input = require('../Input').default
const CheckboxGroup = require('../CheckboxGroup').default

function ClassSelectorObject({
  statements,
  value,
  statementIndex,
  error,
  extraParams,
  onChange,
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
    Object.entries({ ...initialValue, ...(value || {}) }).map(toCheckedMap)
  )
  return (
    <CheckboxGroup
      id="simpleCheckboxGroup"
      name="simpleCheckboxGroup"
      label="All Filters"
      checkedMap={checkedMap}
      onGroupChange={checkedMap => {
        const newValues = Object.fromEntries(
          Object.entries(checkedMap).map(toValues)
        )
        onChange(newValues)
      }}
    />
  )
}

function CpfInputObject({ value, onChange }, shouldValidate = false) {
  function validateCPF(cpf) {
    if (!cpf) {
      return false
    }

    let sum = 0
    let remainder

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }
    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.substring(10, 11))) return false
    return true
  }

  const errorMessage =
    shouldValidate && value ? (validateCPF(value) ? null : 'Invalid CPF') : null
  return (
    <Input
      placeholder="Insert cpf…"
      type="number"
      errorMessage={errorMessage}
      min={0}
      maxLength={11}
      value={value || ''}
      onChange={e => {
        onChange(e.target.value.replace(/\D/g, ''))
      }}
    />
  )
}

function SimpleInputObject({ value, onChange }) {
  return <Input value={value || ''} onChange={e => onChange(e.target.value)} />
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
  return (
    <div className="flex">
      <Input
        placeholder="Age from…"
        errorMessage={
          value && parseInt(value.first) >= parseInt(value.last)
            ? 'Must be smaller than other input'
            : ''
        }
        value={value && value.first ? value.first : ''}
        onChange={e => {
          const currentObject = value || {}
          currentObject.first = e.target.value.replace(/\D/g, '')

          onChange(currentObject)
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <Input
        placeholder="Age to…"
        value={value && value.last ? value.last : ''}
        onChange={e => {
          const currentObject = value || {}
          currentObject.last = e.target.value.replace(/\D/g, '')

          onChange(currentObject)
        }}
      />
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
                object: props => <CpfInputObject {...props} />,
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
