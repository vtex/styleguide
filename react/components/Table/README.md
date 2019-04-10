#### A table displays any kind of structured data and offers controls to easily navigate, search and filter through it. Data may be from just numbers to complex entities that employ other components to represent itself, like images, tags, links, etc.

Our Table was built to be highly composable and flexible. All parts are optional, and you can compose your table with any other Styleguide components. A Table may be used from a small table with numbers to full CRUD-like functionalities, from a small data display to the main screen of a complex module. All parts are plug'n'play parts that you can turn on and off to match your needs.

### 👍 Dos

- Try to support as many of the Table features as you can in your system - if we designed there it's because it's highly recommended to have.
- Provide as many domain-specific actions as you want in the dropdown slot.
- Line actions: should be mostly for actions that are resolved in the same screen, or if it's was identified to be a very recurrent action.

<div className="center mw7 pv6">
  ![](./table.png)
</div>

Simple (high density)

```js
const sampleData = require('./sampleData').default
const itemsCopy = sampleData.items
  .slice()
  .reverse()
  .splice(15)
const defaultSchema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      width: 300,
    },
    email: {
      type: 'string',
      title: 'Email',
      minWidth: 350,
    },
    number: {
      type: 'number',
      title: 'Number',
      // default is 200px
      minWidth: 100,
    },
  },
}

;<div>
  <div className="mb5">
    <Table
      fullWidth
      schema={defaultSchema}
      items={itemsCopy}
      density="high"
      onRowClick={({ rowData }) => {
        alert(
          `you just clicked ${rowData.name}, number is ${
            rowData.number
          } and email ${rowData.email}`
        )
      }}
    />
  </div>
</div>
```

Empty state

```js
const sampleData = require('./sampleData').default
const itemsCopy = sampleData.items
  .slice()
  .reverse()
  .splice(15)
const defaultSchema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      width: 300,
    },
    email: {
      type: 'string',
      title: 'Email',
      minWidth: 350,
    },
    number: {
      type: 'number',
      title: 'Number',
      // default is 200px
      minWidth: 100,
    },
  },
}

;<div>
  <div className="mb5">
    <Table
      fullWidth
      schema={defaultSchema}
      items={[]}
      emptyStateLabel="This is my custom empty state title"
      emptyStateChildren={
        <React.Fragment>
          <p>
            A longer explanation of what should be here, and why should I care
            about what should be here.
          </p>
          <div className="pt5">
            <Button variation="secondary" size="small">
              <span className="flex align-baseline">Suggested action</span>
            </Button>
          </div>
        </React.Fragment>
      }
      onRowClick={({ rowData }) => {
        alert(
          `you just clicked ${rowData.name}, number is ${
            rowData.number
          } and email ${rowData.email}`
        )
      }}
    />
  </div>
</div>
```

Line actions

```js
const sampleData = require('./sampleData').default
const itemsCopy = sampleData.items
  .slice()
  .reverse()
  .splice(15)
const defaultSchema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    number: {
      type: 'number',
      title: 'Number',
    },
  },
}

const lineActions = [
  {
    label: ({ rowData }) => `Action for ${rowData.name}`,
    onClick: ({ rowData }) => alert(`Executed action for ${rowData.name}`),
  },
  {
    label: ({ rowData }) => `DANGEROUS action for ${rowData.name}`,
    isDangerous: true,
    onClick: ({ rowData }) =>
      alert(`Executed a DANGEROUS action for ${rowData.name}`),
  },
]

;<div>
  <div className="mb5">
    <Table
      fullWidth
      schema={defaultSchema}
      items={itemsCopy}
      onRowClick={({ rowData }) => {
        alert(
          `you just clicked ${rowData.name}, number is ${
            rowData.number
          } and email ${rowData.email}`
        )
      }}
      lineActions={lineActions}
    />
  </div>
</div>
```

Custom cell components / sortable columns

```js
const sampleData = require('./sampleData').default
const itemsCopy = sampleData.items
  .slice()
  .reverse()
  .splice(20)
const Tag = require('../Tag').default
class CustomTableExample extends React.Component {
  constructor() {
    super()
    this.state = {
      orderedItems: itemsCopy,
      dataSort: {
        sortedBy: null,
        sortOrder: null,
      },
    }

    this.sortNameAlphapeticallyASC = this.sortNameAlphapeticallyASC.bind(this)
    this.sortNameAlphapeticallyDESC = this.sortNameAlphapeticallyDESC.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  sortNameAlphapeticallyASC(a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  }
  sortNameAlphapeticallyDESC(a, b) {
    return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
  }

  handleSort({ sortOrder, sortedBy }) {
    // I'll just handle sort by 'name', but I could handle multiple properties
    if (sortedBy === 'name') {
      const orderedItems =
        sortOrder === 'ASC'
          ? itemsCopy.slice().sort(this.sortNameAlphapeticallyASC)
          : itemsCopy.slice().sort(this.sortNameAlphapeticallyDESC)
      // the above const could come out of an API call to sort items for example
      this.setState({
        orderedItems,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    }
  }

  render() {
    const customSchema = {
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          width: 300,
          // sortable boolean in a schema property makes it sortable,
          // (clicking header triggers onSort callback).
          sortable: true,
        },
        email: {
          type: 'string',
          title: 'Email',
          width: 350,
        },
        color: {
          type: 'object',
          title: 'Color',
          // you can customize cell component render (also header component with headerRenderer)
          cellRenderer: ({ cellData }) => {
            return (
              <Tag
                bgColor={cellData.color}
                color="#fff"
                onClick={e => {
                  // if you use cellRender click event AND onRowclick event
                  // you should stop the event propagation so the cell click fires and row click don't
                  e.stopPropagation()
                  alert(
                    `you just clicked a cell to remove ${
                      cellData.label
                    }, HEX: ${cellData.color}`
                  )
                }}>
                <span className="nowrap">{cellData.label}</span>
              </Tag>
            )
          },
          // you can also customize non sortable headers with the following prop
          // headerRenderer: ({ columnIndex, key, rowIndex, style, title })
        },
      },
    }

    return (
      <div>
        <div className="mb5">
          <Table
            schema={customSchema}
            items={this.state.orderedItems}
            indexColumnLabel="Index"
            onRowClick={({ rowData }) => {
              alert(`you just clicked the row with ${rowData.name}`)
            }}
            sort={{
              sortedBy: this.state.dataSort.sortedBy,
              sortOrder: this.state.dataSort.sortOrder,
            }}
            onSort={this.handleSort}
          />
        </div>
      </div>
    )
  }
}
;<CustomTableExample />
```

With Toolbar, Totalizers, Pagination and Filters

```js
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default
const sampleData = require('./sampleData').default
const tableLength = 5
const initialState = {
  tableLength,
  currentPage: 1,
  slicedData: sampleData.items.slice(0, tableLength),
  currentItemFrom: 1,
  currentItemTo: tableLength,
  searchValue: '',
  itemsLength: sampleData.items.length,
  emptyStateLabel: 'Nothing to show.',
  filterStatements: [],
}
const jsonschema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    email: {
      type: 'string',
      title: 'Email',
      width: 300,
    },
    number: {
      type: 'number',
      title: 'Number',
      width: 150,
    },
    color: {
      type: 'object',
      properties: {
        color: {
          type: 'string',
        },
        label: {
          type: 'string',
        },
      },
      title: 'Color',
      cellRenderer: ({ cellData }) => {
        return (
          <Tag bgColor={cellData.color} color="#fff">
            <span className="nowrap">{cellData.label}</span>
          </Tag>
        )
      },
    },
  },
}

class ResourceListExample extends React.Component {
  constructor() {
    super()
    this.state = initialState

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this)
    this.handleInputSearchSubmit = this.handleInputSearchSubmit.bind(this)
    this.handleInputSearchClear = this.handleInputSearchClear.bind(this)
    this.handleRowsChange = this.handleRowsChange.bind(this)
    this.simpleInputObject = this.simpleInputObject.bind(this)
    this.simpleInputVerbsAndLabel = this.simpleInputVerbsAndLabel.bind(this)
    this.numberInputObject = this.numberInputObject.bind(this)
    this.numberInputRangeObject = this.numberInputRangeObject.bind(this)
    this.colorSelectorObject = this.colorSelectorObject.bind(this)
    this.handleFiltersChange = this.handleFiltersChange.bind(this)
  }

  handleNextClick() {
    const newPage = this.state.currentPage + 1
    const itemFrom = this.state.currentItemTo + 1
    const itemTo = tableLength * newPage
    const data = sampleData.items.slice(itemFrom - 1, itemTo)
    this.goToPage(newPage, itemFrom, itemTo, data)
  }

  handlePrevClick() {
    if (this.state.currentPage === 0) return
    const newPage = this.state.currentPage - 1
    const itemFrom = this.state.currentItemFrom - tableLength
    const itemTo = this.state.currentItemFrom - 1
    const data = sampleData.items.slice(itemFrom - 1, itemTo)
    this.goToPage(newPage, itemFrom, itemTo, data)
  }

  goToPage(currentPage, currentItemFrom, currentItemTo, slicedData) {
    this.setState({
      currentPage,
      currentItemFrom,
      currentItemTo,
      slicedData,
    })
  }

  handleRowsChange(e, value) {
    this.setState(
      {
        tableLength: parseInt(value),
        currentItemTo: parseInt(value),
      },
      () => {
        // this callback garantees new sliced items respect filters and tableLength
        const { filterStatements } = this.state
        this.handleFiltersChange(filterStatements)
      }
    )
  }

  handleInputSearchChange(e) {
    this.setState({ searchValue: e.target.value })
  }

  handleInputSearchClear(e) {
    this.setState({ ...initialState })
  }

  handleInputSearchSubmit(e) {
    e.preventDefault()

    if (!this.state.searchValue) {
      this.setState({ ...initialState })
    } else {
      this.setState({
        currentPage: 0,
        currentItemFrom: 0,
        currentItemTo: 0,
        slicedData: [],
        emptyStateLabel: 'No results found.',
        itemsLength: 0,
      })
    }
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

  simpleInputVerbsAndLabel() {
    return {
      renderFilterLabel: st => {
        if (!st || !st.object) {
          // you should treat empty object cases only for alwaysVisibleFilters
          return 'Any'
        }
        return `${
          st.verb === '=' ? 'is' : st.verb === '!=' ? 'is not' : 'contains'
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
    }
  }

  numberInputObject({
    statements,
    values,
    statementIndex,
    error,
    onChangeObjectCallback,
  }) {
    return (
      <Input
        placeholder="Insert number…"
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

  numberInputRangeObject({
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
          placeholder="Number from…"
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
          placeholder="Number to…"
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

  colorSelectorObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
    onChangeObjectCallback,
  }) {
    const initialValue = {
      pink: true,
      black: true,
      blue: true,
      gray: true,
      ...(values || {}),
    }
    const toggleValueByKey = key => {
      const newValues = {
        ...(values || initialValue),
        [key]: values ? !values[key] : false,
      }
      return newValues
    }
    return (
      <div>
        {Object.keys(initialValue).map((opt, index) => {
          return (
            <div className="mb3" key={`class-statment-object-${opt}-${index}`}>
              <Checkbox
                checked={values ? values[opt] : initialValue[opt]}
                label={opt}
                name="default-checkbox-group"
                onChange={() => {
                  const newValue = toggleValueByKey(`${opt}`)
                  const newValueKeys = Object.keys(newValue)
                  const isEmptyFilter = !newValueKeys.some(
                    key => !newValue[key]
                  )
                  onChangeObjectCallback(isEmptyFilter ? null : newValue)
                }}
                value={opt}
              />
            </div>
          )
        })}
      </div>
    )
  }

  handleFiltersChange(statements = []) {
    // here you should receive filter values, so you can fire mutations ou fetch filtered data from APIs
    // For the sake of example I'll filter the data manually since there is no API
    const { tableLength } = this.state
    let newData = sampleData.items.slice()
    statements.forEach(st => {
      if (!st || !st.object) return
      const { subject, verb, object } = st
      switch (subject) {
        case 'color':
          if (!object) return
          const colorsMap = {
            '#F71963': 'pink',
            '#00BBD4': 'blue',
            '#D6D8E0': 'gray',
            '#142032': 'black',
          }
          newData = newData.filter(item => object[colorsMap[item.color.color]])
          break
        case 'name':
        case 'email':
          if (verb === 'contains') {
            newData = newData.filter(item => item[subject].includes(object))
          } else if (verb === '=') {
            newData = newData.filter(item => item[subject] === object)
          } else if (verb === '!=') {
            newData = newData.filter(item => item[subject] !== object)
          }
          break
        case 'number':
          if (verb === '=') {
            newData = newData.filter(item => item.number === parseInt(object))
          } else if (verb === 'between') {
            newData = newData.filter(
              item =>
                item.number >= parseInt(object.first) &&
                item.number <= parseInt(object.last)
            )
          }
          break
      }
    })
    const newDataLength = newData.length
    const newSlicedData = newData.slice(0, tableLength)
    this.setState({
      filterStatements: statements,
      slicedData: newSlicedData,
      itemsLength: newDataLength,
      currentItemTo: tableLength > newDataLength ? newDataLength : tableLength,
    })
  }

  render() {
    return (
      <Table
        schema={jsonschema}
        items={this.state.slicedData}
        emptyStateLabel={this.state.emptyStateLabel}
        toolbar={{
          inputSearch: {
            value: this.state.searchValue,
            placeholder: 'Search stuff...',
            onChange: this.handleInputSearchChange,
            onClear: this.handleInputSearchClear,
            onSubmit: this.handleInputSearchSubmit,
          },
          density: {
            buttonLabel: 'Line density',
            lowOptionLabel: 'Low',
            mediumOptionLabel: 'Medium',
            highOptionLabel: 'High',
          },
          download: {
            label: 'Export',
            handleCallback: () => alert('Callback()'),
          },
          upload: {
            label: 'Import',
            handleCallback: () => alert('Callback()'),
          },
          fields: {
            label: 'Toggle visible fields',
            showAllLabel: 'Show All',
            hideAllLabel: 'Hide All',
          },
          extraActions: {
            label: 'More options',
            actions: [
              {
                label: 'An action',
                handleCallback: () => alert('An action'),
              },
              {
                label: 'Another action',
                handleCallback: () => alert('Another action'),
              },
              {
                label: 'A third action',
                handleCallback: () => alert('A third action'),
              },
            ],
          },
          newLine: {
            label: 'New',
            handleCallback: () => alert('handle new line callback'),
          },
        }}
        pagination={{
          onNextClick: this.handleNextClick,
          onPrevClick: this.handlePrevClick,
          currentItemFrom: this.state.currentItemFrom,
          currentItemTo: this.state.currentItemTo,
          onRowsChange: this.handleRowsChange,
          textShowRows: 'Show rows',
          textOf: 'of',
          totalItems: this.state.itemsLength,
          rowsOptions: [5, 10, 15, 25],
        }}
        totalizers={[
          {
            label: 'Saldo em conta',
            value: 23837,
          },
          {
            label: 'Entradas',
            value: 'R$ 36239,05',
            iconBackgroundColor: '#eafce3',
            icon: <ArrowUp color="#79B03A" size={14} />,
          },

          {
            label: 'Saídas',
            value: '- R$ 13.485,26',
            icon: <ArrowDown size={14} />,
          },
          {
            label: 'Vendas',
            value: 23837,
            isLoading: true,
          },
        ]}
        filters={{
          alwaysVisibleFilters: ['color', 'name'],
          statements: this.state.filterStatements,
          onChangeStatements: this.handleFiltersChange,
          clearAllFiltersButtonLabel: 'Clear Filters',
          collapseLeft: true,
          options: {
            color: {
              label: 'Color',
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
                    renderFn: this.colorSelectorObject,
                    extraParams: {},
                  },
                },
              ],
            },
            name: {
              label: 'Name',
              ...this.simpleInputVerbsAndLabel(),
            },
            email: {
              label: 'Email',
              ...this.simpleInputVerbsAndLabel(),
            },
            number: {
              label: 'Number',
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
                    renderFn: this.numberInputObject,
                    extraParams: {},
                  },
                },
                {
                  label: 'is between',
                  value: 'between',
                  object: {
                    renderFn: this.numberInputRangeObject,
                    extraParams: {},
                  },
                },
              ],
            },
          },
        }}
      />
    )
  }
}
;<ResourceListExample />
```

Lots of columns

```js
const sampleData = require('./sampleData').default
const tableLength = 5
const initialState = {
  tableLength,
  currentPage: 1,
  slicedData: sampleData.items.slice(0, tableLength),
  currentItemFrom: 1,
  currentItemTo: tableLength,
  searchValue: '',
  itemsLength: sampleData.items.length,
  emptyStateLabel: 'Nothing to show.',
}

class ResourceListExample extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.customColorTagProperty = this.customColorTagProperty.bind(this)
  }

  customColorTagProperty(index) {
    return {
      type: 'object',
      title: `Color${index ? ` ${index}` : ''}`,
      cellRenderer: ({ cellData }) => {
        return (
          <Tag bgColor={cellData.color} color="#fff">
            <span className="nowrap">{cellData.label}</span>
          </Tag>
        )
      },
    }
  }

  render() {
    const customSchema = {
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
        email: {
          type: 'string',
          title: 'Email',
          width: 300,
        },
        number: {
          type: 'number',
          title: 'Number',
        },
        color: this.customColorTagProperty(),
        color1: this.customColorTagProperty(1),
        color2: this.customColorTagProperty(2),
        color3: this.customColorTagProperty(3),
        color4: this.customColorTagProperty(4),
        color5: this.customColorTagProperty(5),
        color6: this.customColorTagProperty(6),
      },
    }

    return (
      <Table
        schema={customSchema}
        items={this.state.slicedData}
        fixFirstColumn
        emptyStateLabel={this.state.emptyStateLabel}
      />
    )
  }
}
;<ResourceListExample />
```
