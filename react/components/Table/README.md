Default

```js
const sampleData = require('./sampleData').default;
const defaultSchema = {
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      email: {
        type: 'string',
        title: 'Email',
        width: 35,
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
      items={sampleData}
    />
  </div>
</div>
```

Custom components

```js
const sampleData = require('./sampleData').default;
const Badge = require('../Badge').default;
class CustomTableExample extends React.Component {
  constructor() {
    super()
    this.state = {
      orderedItems: sampleData,
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
        ? sampleData.slice(0).sort(this.sortNameAlphapeticallyASC)
        : sampleData.slice(0).sort(this.sortNameAlphapeticallyDESC)
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
          width: 35,
        },
        color: {
          type: 'object',
          title: 'Color',
          // you can customize cell component render (also header component with headerRenderer)
          cellRenderer: ({ cellData }) => {
            return (
              <div className="mh4">
                <Badge bgColor={cellData.color} color="#fff">
                  <span className="nowrap">
                    {cellData.label}
                  </span>
                </Badge>
              </div>
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
            indexColumn
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

