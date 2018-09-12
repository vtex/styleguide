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
      orderedItems: sampleData.sort(this.sortNameAlphapeticallyASC)
    }

    this.sortNameAlphapeticallyASC = this.sortNameAlphapeticallyASC.bind(this)
    this.sortNameAlphapeticallyDESC = this.sortNameAlphapeticallyDESC.bind(this)
    this.sortName = this.sortName.bind(this)
  }

  sortNameAlphapeticallyASC(a, b) { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0 }
  sortNameAlphapeticallyDESC(a, b) { return (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0 }

  sortName({ sortOrder, sortedBy }) {
    const orderedItems = sortOrder === 'ASC'
        ? sampleData.sort(this.sortNameAlphapeticallyASC)
        : sampleData.sort(this.sortNameAlphapeticallyDESC)
    this.setState({ orderedItems })
  }

  render() {
    const customSchema = {
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          // just by passing a sortCallback in a schema property makes it sortable,
          // you should do this to handle each property you want to be sortable
          sortCallback: this.sortName,
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
            initialSortProperty="name"
            initialSortOrder="ASC"
          />
        </div>
      </div>
    );
  }
};<CustomTableExample />
```

