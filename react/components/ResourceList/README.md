Working example

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
}

class ResourceListExample extends React.Component {
  constructor() {
    super()

    this.state = initialState

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this)
    this.handleInputSearchSubmit = this.handleInputSearchSubmit.bind(this)
    this.handleInputSearchClear = this.handleInputSearchClear.bind(this)
    this.handleRowsChange = this.handleRowsChange.bind(this)
  }

  handleNextClick() {
    const currentPage = this.state.currentPage
    const currentItemFrom = this.state.currentItemTo + 1
    const currentItemTo = tableLength * (currentPage + 1)

    this.setState({
      currentPage: currentPage + 1,
      currentItemFrom,
      currentItemTo,
      slicedData: sampleData.items.slice(currentItemFrom - 1, currentItemTo),
    })
  }

  handlePrevClick() {
    if (this.state.currentPage === 1) return
    const currentPage = this.state.currentPage
    const currentItemFrom = this.state.currentItemFrom - tableLength
    const currentItemTo = this.state.currentItemFrom - 1

    this.setState({
      currentPage: currentPage - 1,
      currentItemFrom,
      currentItemTo,
      slicedData: sampleData.items.slice(currentItemFrom - 1, currentItemTo),
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
        currentPage: 1,
        currentItemFrom: 1,
        currentItemTo: 4,
        slicedData: sampleData.items.slice(0, 4),
        itemsLength: 4,
      })
    }
  }

  render() {
    return (
      <ResourceList
        table={{
          schema: sampleData.defaultSchema,
          items: this.state.slicedData,
        }}
        actions={{
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
          textOf: 'de',
          totalItems: this.state.itemsLength,
          rowsOptions: [5, 10, 15, 20],
        }}
        inputSearch={{
          value: this.state.searchValue,
          placeholder: 'Search stuff...',
          onChange: this.handleInputSearchChange,
          onClear: this.handleInputSearchClear,
          onSubmit: this.handleInputSearchSubmit,
        }}
      />
    )
  }
}
;<ResourceListExample />
```
