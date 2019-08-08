#### A table displays any kind of structured data and offers controls to easily navigate, search and filter through it. Data may be from just numbers to complex entities that employ other components to represent itself, like images, tags, links, etc.

Our Table was built to be highly composable and flexible. All parts are optional, and you can compose your table with any other Styleguide components. A Table may be used from a small table with numbers to full CRUD-like functionalities, from a small data display to the main screen of a complex module. All parts are plug'n'play parts that you can turn on and off to match your needs.

# Features

<div className="center mw7 pv6">
  ![](./table.png)
</div>

#### Simple Table

```js
const useTableState = require('./hooks/useTableState.ts').default
const Tag = require('../Tag/index.js').default

columns = {
  name: {
    title: 'Name',
  },
  email: {
    title: 'Email',
  },
  number: {
    title: 'Number',
    renderer: ({ data }) => {
      return <Tag>{data}</Tag>
    },
  },
  country: {
    title: 'Country',
  },
}

items = [
  {
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    number: 1.88191,
    country: '🇰🇪Wakanda',
  },
  {
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    number: 3.09191,
    country: '🇺🇸USA',
  },
  {
    name: 'Shang-Chi',
    email: 'kungfu.master@gmail.com',
    number: 39.09222,
    country: '🇨🇳China',
  },
  {
    name: 'Natasha Romanoff',
    email: 'black.widow@gmail.com',
    number: 5.09291,
    country: '🇷🇺Russia',
  },
]

function Example() {
  const tableState = useTableState({
    columns: columns,
    items: items,
  })

  return <Table {...tableState} />
}
;<Example />
```
