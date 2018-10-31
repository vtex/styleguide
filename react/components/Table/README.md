### Overview
A table displays any kind of structured data and offers controls to easily navigate, search and filter through it. Data may be from just numbers to complex entities that employ other components to represent itself, like images, tags, links, etc.

Our Table was built to be highly composable and flexible. All parts are optional, and you can compose your table with any other Styleguide components. A Table may be used from a small table with numbers to full CRUD-like functionalities, from a small data display to the main screen of a complex module. All parts are plug'n'play parts that you can turn on and off to match your needs.

### Dos
- Try to support as many of the Table features as you can in your system - if we designed there it's because it's highly recommended to have.
- Provide as many domain-specific actions as you want in the dropdown slot.
- Line actions: should be mostly for actions that are resolved in the same screen, or if it's was identified to be a very recurrent action.

<div class="center mw7 pv6">
  ![](./table.png)
</div>

Simple (high density)

```js
const sampleData = require('./sampleData').default;
const itemsCopy = sampleData.items.slice().reverse().splice(15);
const defaultSchema = {
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
    },
  };

<div>
  <div className="mb5">
    <Table
      schema={defaultSchema}
      items={itemsCopy}
      density="high"
      onRowClick={({ rowData }) => {
        alert(`you just clicked ${
          rowData.name
        }, number is ${
          rowData.number
        } and email ${
          rowData.email
        }`)
      }}
    />
  </div>
</div>
```

Custom Cell components

```js
const sampleData = require('./sampleData').default;
const itemsCopy = sampleData.items.slice().reverse().splice(20);
const Badge = require('../Badge').default;
class CustomTableExample extends React.Component {
  constructor() {
    super()
    this.state = {
      orderedItems: itemsCopy,
      dataSort: {
        sortedBy: null,
        sortOrder: null,
      }
    }

    this.sortNameAlphapeticallyASC = this.sortNameAlphapeticallyASC.bind(this)
    this.sortNameAlphapeticallyDESC = this.sortNameAlphapeticallyDESC.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  sortNameAlphapeticallyASC(a, b) { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0 }
  sortNameAlphapeticallyDESC(a, b) { return (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0 }

  handleSort({ sortOrder, sortedBy }) {
     // I'll just handle sort by 'name', but I could handle multiple properties
    if (sortedBy === 'name') {
      const orderedItems = sortOrder === 'ASC'
        ? itemsCopy.slice().sort(this.sortNameAlphapeticallyASC)
        : itemsCopy.slice().sort(this.sortNameAlphapeticallyDESC)
      // the above const could come out of an API call to sort items for example
      this.setState({
        orderedItems,
        dataSort: {
          sortedBy,
          sortOrder,
        }
      })
    }
  }

  render() {
    const customSchema = {
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          // sortable boolean in a schema property makes it sortable,
          // (clicking header triggers onSort callback).
          sortable: true,
        },
        email: {
          type: 'string',
          title: 'Email',
          width: 300,
        },
        color: {
          type: 'object',
          title: 'Color',
          // you can customize cell component render (also header component with headerRenderer)
          cellRenderer: ({ cellData }) => {
            return (
              <Badge bgColor={cellData.color} color="#fff">
                <span className="nowrap">
                  {cellData.label}
                </span>
              </Badge>
            )
          },
        },
      },
    };

    return (
      <div>
        <div className="mb5">
          <Table
            schema={customSchema}
            items={this.state.orderedItems}
            indexColumnLabel="Index"
            sort={{
              sortedBy: this.state.dataSort.sortedBy,
              sortOrder: this.state.dataSort.sortOrder,
            }}
            onSort={this.handleSort}
          />
        </div>
      </div>
    );
  }
};<CustomTableExample />
```

With Toolbar and Pagination

```js
const sampleData = require('./sampleData').default
const tableLength = 5
const initialState = {
  tableLength,
  currentPage: 0,
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

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this)
    this.handleInputSearchSubmit = this.handleInputSearchSubmit.bind(this)
    this.handleInputSearchClear = this.handleInputSearchClear.bind(this)
    this.handleRowsChange = this.handleRowsChange.bind(this)
    this.customColorBadgeProperty = this.customColorBadgeProperty.bind(this)
  }

  handleNextClick() {
    const newPage = this.state.currentPage + 1
    const itemFrom = this.state.currentItemTo + 1
    const itemTo = tableLength * (newPage)
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
    this.setState({
      tableLength: parseInt(value),
      slicedData: sampleData.items.slice(0, parseInt(value)),
      currentItemTo: parseInt(value),
    })
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

  customColorBadgeProperty(index) {
    return {
      type: 'object',
      title: `Color${index ? ` ${index}` : ''}`,
      cellRenderer: ({ cellData }) => {
        return (
          <Badge bgColor={cellData.color} color="#fff">
            <span className="nowrap">
              {cellData.label}
            </span>
          </Badge>
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
        color: this.customColorBadgeProperty(),
        color1: this.customColorBadgeProperty(1),
        color2: this.customColorBadgeProperty(2),
        color3: this.customColorBadgeProperty(3),
        color4: this.customColorBadgeProperty(4),
        color5: this.customColorBadgeProperty(5),
        color6: this.customColorBadgeProperty(6),
      },
    };

    return (
      <Table
        schema={customSchema}
        items={this.state.slicedData}
        fixFirstColumn
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
            buttonLabel: 'Density',
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
            label: 'Fields',
            showAllLabel: 'Show All',
            hideAllLabel: 'Hide All',
          },
          extraActions: {
            label: 'More',
            actions: [
              {
                label: 'alert 1',
                handleCallback: () => alert('1')
              },
              {
                label: 'alert 2',
                handleCallback: () => alert('2')
              },
              {
                label: 'alert 3',
                handleCallback: () => alert('3')
              },
            ],
          },
          newLine: {
            label: 'New',
            handleCallback: () => alert('handle new line callback')
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
      />
    )
  }
}
;<ResourceListExample />
```
