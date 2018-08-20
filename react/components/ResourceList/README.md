Working example

```js
const sampleData = require('./sampleData').default
const tableLength = 5

class ResourceListExample extends React.Component {
  constructor() {
    super()

    this.state = {
      currentPage: 1,
      slicedData: sampleData.items.slice(0, tableLength),
      currentItemFrom: 1,
      currentItemTo: tableLength,
    }

    this.onNextClick = this.onNextClick.bind(this)
    this.onPrevClick = this.onPrevClick.bind(this)
  }

  onNextClick() {
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

  onPrevClick() {
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

  render() {
    return (
      <ResourceList
        table={{
          schema: sampleData.defaultSchema,
          items: this.state.slicedData,
        }}
        exportBtn={{ show: true }}
        pagination={{
          onNextClick: this.onNextClick,
          onPrevClick: this.onPrevClick,
          currentItemFrom: this.state.currentItemFrom,
          currentItemTo: this.state.currentItemTo,
          textOf: 'de',
        }}
      />
    )
  }
}
;<ResourceListExample />
```
