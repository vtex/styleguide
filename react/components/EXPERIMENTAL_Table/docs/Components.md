<div className="center mw7 pv6">
 ![](./table.png)
</div>

### Toolbar

The toolbar is a bundle of features, including search input, autocomplete, columns visibility toggle, density controls, import and export buttons, extra actions menu using ActionMenu component and a newLine button to help with entry creation (you can see the illustrative diagram in the beginning of the page for a better visualization of this structure)

#### InputSearch

- A wrapper around `InputSearch` component. The props are the same.

#### InputAutocomplete

- A wrapper around `AutocompleteInput` component. The props are the same.

#### Button Group

Represents the group of buttons located at the right. It has other composites that are described down below.

##### Columns

- A button that toggles columns visibility.
- It is recommended to combine it with the `useTableVisibility` hook.

```ts
enum Alignment {
  Left = 'left',
  Right = 'right',
}
```

| Property     | Type                         | Required | Default | Description                      |
| ------------ | ---------------------------- | -------- | ------- | -------------------------------- |
| label        | string                       | ✅       | 🚫      | General label                    |
| showAllLabel | string                       | ✅       | 🚫      | Label for the show all button    |
| hideAllLabel | string                       | ✅       | 🚫      | Label for the hide all button    |
| visibility   | Return of useTableVisibility | ✅       | 🚫      | Visibility of the columns        |
| alignMenu    | Alignment                    | 🚫       | 🚫      | Menu alignment                   |
| disabled     | boolean                      | 🚫       | false   | If the button is disabled or not |

##### Density

- A button that changes the row's density.
- It is recommended to combine it with the `useTableMeasures` hook.

```ts
enum Alignment {
  Left = 'left',
  Right = 'right',
}

enum Density {
  Compact = 'compact',
  Regular = 'regular',
  Comfortable = 'comfortable',
}
```

| Property         | Type                       | Required | Default | Description                      |
| ---------------- | -------------------------- | -------- | ------- | -------------------------------- |
| density          | Return of useTableMeasures | ✅       | 🚫      | Density object                   |
| compactLabel     | string                     | ✅       | 🚫      | Label of the compact option      |
| regularLabel     | string                     | ✅       | 🚫      | Label of the regular option      |
| comfortableLabel | string                     | ✅       | 🚫      | Label of the comfortable option  |
| alignMenu        | Alignment                  | 🚫       | 🚫      | Menu alignment                   |
| handleCallback   | (density: Density) => void | 🚫       | 🚫      | Triggered on change density      |
| disabled         | boolean                    | 🚫       | false   | If the button is disabled or not |

##### Download

- Button to handle download or export actions.

| Property | Type       | Required | Default | Description                      |
| -------- | ---------- | -------- | ------- | -------------------------------- |
| onClick  | () => void | ✅       | 🚫      | Action on click button           |
| label    | string     | 🚫       | ""      | Button text                      |
| disabled | boolean    | 🚫       | false   | If the button is disabled or not |

##### Upload

- Button to handle upload or import actions.

| Property | Type       | Required | Default | Description                      |
| -------- | ---------- | -------- | ------- | -------------------------------- |
| onClick  | () => void | ✅       | 🚫      | Action on click button           |
| label    | string     | 🚫       | 🚫      | Button text                      |
| disabled | boolean    | 🚫       | false   | If the button is disabled or not |

##### ExtraActions

- Button to perform extra actions.

```ts
enum Alignment {
  Left = 'left',
  Right = 'right',
}

type MenuAction = {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
}
```

| Property  | Type         | Required | Default | Description                      |
| --------- | ------------ | -------- | ------- | -------------------------------- |
| actions   | MenuAction[] | ✅       | 🚫      | Action on click button           |
| label     | string       | 🚫       | 🚫      | Button label                     |
| isLoading | boolean      | 🚫       | false   | If the button is loading or not  |
| disabled  | boolean      | 🚫       | false   | If the button is disabled or not |
| alignMenu | Alignment    | 🚫       | 🚫      | Menu alignment                   |

##### NewLine

- A button that represents creational purposes.

```ts
type MenuAction = {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
}
```

| Property  | Type         | Required | Default | Description                      |
| --------- | ------------ | -------- | ------- | -------------------------------- |
| onClick   | () => void   | ✅       | 🚫      | Action on click button           |
| label     | string       | 🚫       | 🚫      | Button text                      |
| actions   | MenuAction[] | 🚫       | 🚫      | Action on click button           |
| isLoading | boolean      | 🚫       | false   | If the button is loading or not  |
| disabled  | boolean      | 🚫       | false   | If the button is disabled or not |

##### Working example

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useTableVisibility from '../hooks/useTableVisibility'
import Tag from '../../Tag'
import Icons from 'react-icons/fa'
import data from './sampleData'

const columns = [
  {
    id: 'id',
    title: 'ID',
  },
  {
    id: 'icon',
    title: 'Icon',
    cellRenderer: ({ data, rowHeight, motion }) => (
      <Icon name={data} style={motion} height={rowHeight} />
    ),
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'status',
    title: 'Status',
    cellRenderer: ({ data }) => <Status status={data} />,
  },
]

function Icon({ name, height, style }) {
  const SelectedIcon = Icons[name]
  return <SelectedIcon style={style} className="c-muted-1" size={height - 5} />
}

function Status({ status }) {
  const type = status === 'ACTIVE' ? 'success' : 'neutral'
  return <Tag type={type}>{status}</Tag>
}

const items = data.payments

function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const { value } = action
      return {
        ...state,
        inputValue: value,
      }
    }
    case 'clear': {
      return {
        inputValue: '',
        displayItems: items,
      }
    }
    case 'submit': {
      const inputClear = state.input === ''
      const filterFn = item =>
        item.name.toLowerCase().includes(state.inputValue.toLowerCase())
      return {
        ...state,
        displayItems: inputClear ? items : items.filter(filterFn),
      }
    }
    default: {
      return state
    }
  }
}

function ToolbarExample() {
  const [state, dispatch] = React.useReducer(reducer, {
    inputValue: '',
    displayItems: items,
  })

  const visibility = useTableVisibility({
    columns,
    items,
    hiddenColumns: ['id'],
  })

  const measures = useTableMeasures({
    size: state.displayItems.length,
  })

  const inputSearch = {
    value: state.inputValue,
    placeholder: 'Search stuff...',
    onChange: e => dispatch({ type: 'change', value: e.currentTarget.value }),
    onClear: () => {
      dispatch({ type: 'clear' })
    },
    onSubmit: e => {
      e.preventDefault()
      dispatch({ type: 'submit' })
    },
  }

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
    visibility,
  }

  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
  }

  const download = {
    label: 'Export',
    onClick: () => alert('Clicked EXPORT'),
  }

  const upload = {
    label: 'Import',
    onClick: () => alert('Clicked IMPORT'),
  }

  const extraActions = {
    label: 'More options',
    actions: [
      {
        label: 'An action',
        onClick: () => alert('An action'),
      },
      {
        label: 'Another action',
        onClick: () => alert('Another action'),
      },
      {
        label: 'A third action',
        onClick: () => alert('A third action'),
      },
    ],
  }

  const newLine = {
    label: 'New',
    onClick: () => alert('handle new line callback'),
    actions: [
      'General',
      'Desktop & Screen Saver',
      'Dock',
      'Language & Region',
    ].map(label => ({
      label,
      onClick: () => alert(`Clicked ${label}`),
    })),
  }

  const emptyState = {
    label: 'The table is empty',
  }

  const empty = React.useMemo(
    () =>
      state.displayItems.length === 0 ||
      Object.keys(visibility.visibleColumns).length === 0,
    [visibility.visibleColumns, state.displayItems]
  )

  return (
    <Table
      empty={empty}
      measures={measures}
      items={state.displayItems}
      columns={visibility.visibleColumns}
      emptyState={emptyState}>
      <Table.Toolbar>
        <Table.Toolbar.InputSearch {...inputSearch} />
        <Table.Toolbar.ButtonGroup>
          <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
          <Table.Toolbar.ButtonGroup.Density density={measures} {...density} />
          <Table.Toolbar.ButtonGroup.Download {...download} />
          <Table.Toolbar.ButtonGroup.Upload {...upload} />
          <Table.Toolbar.ButtonGroup.ExtraActions {...extraActions} />
          <Table.Toolbar.ButtonGroup.NewLine {...newLine} />
        </Table.Toolbar.ButtonGroup>
      </Table.Toolbar>
    </Table>
  )
}
;<ToolbarExample />
```

### Totalizer

This uses the Totalizer component between the toolbar and the table content. You can find the full specs on the [Totalizer specific docs](https://styleguide.vtex.com/#/Components/Display/Totalizer).

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import data from './sampleData'
import ArrowUp from '../../icon/ArrowUp'
import ArrowDown from '../../icon/ArrowDown'

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: ({ data }) => <Currency value={data} />,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: ({ data }) => <Currency value={data} />,
  },
]

const formatCurrency = value => parseFloat(value).toFixed(2)

function Currency({ value }) {
  return <span>$ {formatCurrency(value)}</span>
}

const items = data.products

function TotalizerExample() {
  const measures = useTableMeasures({
    size: items.length,
  })

  const totalizer = React.useMemo(() => {
    const sum = items.reduce(
      (acc, item) => {
        const { stock, cost, retail } = acc

        return {
          stock: stock + item.qty,
          cost: cost + item.qty * item.costPrice,
          retail: retail + item.qty * item.retailPrice,
        }
      },
      {
        stock: 0,
        cost: 0,
        retail: 0,
      }
    )
    return {
      items: [
        {
          label: 'Stock',
          value: sum.stock,
        },

        {
          label: 'Total cost',
          value: `$ ${formatCurrency(sum.cost)}`,
          iconBackgroundColor: '#fda4a4',
          icon: <ArrowDown color="#dd1616" size={14} />,
        },
        {
          label: 'Total retail',
          value: `$ ${formatCurrency(sum.retail)}`,
          iconBackgroundColor: '#eafce3',
          icon: <ArrowUp color="#79B03A" size={14} />,
        },
        {
          label: 'Expected Profit',
          value: `$ ${formatCurrency(sum.retail - sum.cost)}`,
        },
      ],
    }
  }, [items])

  return (
    <Table measures={measures} columns={columns} items={items}>
      <Table.Totalizer {...totalizer} />
    </Table>
  )
}

;<TotalizerExample />
```

### Bulk Actions

- Bulk actions allow the user to select some or all the rows to apply an action.
- It is recommended the usage along with the `EXPERIMENTAL_useCheckboxTree` hook which [has its docs](https://styleguide.vtex.com/#/Components/%F0%9F%91%BB%20Experimental/EXPERIMENTALUseCheckboxTree).
- Like the `Toolbar`, `BulkActions` is a compound component.

#### Actions

##### Primary

- Button to handle primary.

| Property | Type       | Required | Default | Description            |
| -------- | ---------- | -------- | ------- | ---------------------- |
| label    | string     | ✅       | 🚫      | Button text            |
| onClick  | () => void | ✅       | 🚫      | Action on click button |

##### Secondary

- Button to handle secondary actions.

| Property      | Type                    | Required | Default | Description             |
| ------------- | ----------------------- | -------- | ------- | ----------------------- |
| label         | string                  | ✅       | 🚫      | Button text             |
| onClick       | () => void              | ✅       | 🚫      | Action on click button  |
| onActionClick | (e: MenuAction) => void | 🚫       | 🚫      | Action on click actions |

#### Tail

##### Info

- Displays information of any kind.
- Often used to display selected rows count.

| Property | Type           | Required | Default | Description     |
| -------- | -------------- | -------- | ------- | --------------- |
| children | React.ReacNode | 🚫       | 🚫      | Info to display |

##### Toggle

- Action that hidden when active, showing it's children.
- It is inactive, shows a Button.

```ts
type Button = {
  text: string
  onClick: () => void
}
```

| Property | Type           | Required | Default | Description                   |
| -------- | -------------- | -------- | ------- | ----------------------------- |
| button   | Button         | ✅       | 🚫      | Button props                  |
| active   | boolean        | 🚫       | false   | Action on click button        |
| children | React.ReacNode | 🚫       | 🚫      | Item to show when is inactive |

##### Dismiss

- Button to handle download or export actions.

| Property | Type       | Required | Default | Description            |
| -------- | ---------- | -------- | ------- | ---------------------- |
| onClick  | () => void | ✅       | 🚫      | Action on click button |

##### Working Example

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import data from './sampleData'
import useCheckboxTree from '../../EXPERIMENTAL_useCheckboxTree'

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
  },
  {
    id: 'qty',
    title: 'Qty',
  },
  {
    id: 'costPrice',
    title: 'Cost',
    cellRenderer: props => <Currency {...props} />,
  },
  {
    id: 'wholesalePrice',
    title: 'Wholesale',
    cellRenderer: props => <Currency {...props} />,
  },
  {
    id: 'retailPrice',
    title: 'Retail',
    cellRenderer: props => <Currency {...props} />,
  },
]

function Currency({ data }) {
  return <>$ {parseFloat(data).toFixed(2)}</>
}

function useProducts() {
  const [items, setItems] = React.useState(data.products)

  const bulkUpdate = group => positive => {
    const groupIds = group.map(item => item.id)
    setItems(oldItems =>
      oldItems.map(item => (groupIds.includes(item.id) ? positive(item) : item))
    )
  }

  const discountCurry = amt => value => value - value * amt

  const applyDiscount = React.useCallback(
    (group, amt) => {
      const calcDiscount = discountCurry(amt)
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        retailPrice: calcDiscount(item.retailPrice),
        wholesalePrice: calcDiscount(item.wholesalePrice),
      }))
    },
    [items]
  )

  const increaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty + amt,
      }))
    },
    [items]
  )

  const decreaseQty = React.useCallback(
    (group, amt) => {
      const update = bulkUpdate(group)
      update(item => ({
        ...item,
        qty: item.qty - amt,
      }))
    },
    [items]
  )

  return { items, applyDiscount, increaseQty, decreaseQty }
}

function BulkFullExample() {
  const { items, applyDiscount, increaseQty, decreaseQty } = useProducts()

  const primaryAction = {
    label: 'Apply 50% Discount',
    onClick: () => applyDiscount(checkboxes.checkedItems, 0.5),
  }

  const secondaryActions = {
    label: 'Quantity',
    actions: [
      {
        label: 'Increase 50',
        onClick: checked => increaseQty(checked, 50),
      },
      {
        label: 'Decrease 50',
        onClick: checked => decreaseQty(checked, 50),
      },
    ],
    onActionClick: action => action.onClick(checkboxes.checkedItems),
  }

  const measures = useTableMeasures({
    size: items.length,
  })

  const checkboxes = useCheckboxTree({
    items,
    onToggle: ({ checkedItems }) => console.table(checkedItems),
  })

  return (
    <>
      <Table
        measures={measures}
        checkboxes={checkboxes}
        columns={columns}
        items={items}>
        <Table.Bulk active={checkboxes.someChecked}>
          <Table.Bulk.Actions>
            <Table.Bulk.Actions.Primary {...primaryAction} />
            <Table.Bulk.Actions.Secondary {...secondaryActions} />
          </Table.Bulk.Actions>
          <Table.Bulk.Tail>
            {!checkboxes.allChecked && (
              <Table.Bulk.Tail.Info>
                All rows selected: {checkboxes.checkedItems.length}
              </Table.Bulk.Tail.Info>
            )}
            <Table.Bulk.Tail.Toggle
              button={{
                text: `Select all ${items.length}`,
                onClick: checkboxes.checkAll,
              }}
              active={checkboxes.allChecked}>
              Selected rows: {items.length}
            </Table.Bulk.Tail.Toggle>
            <Table.Bulk.Tail.Dismiss onClick={checkboxes.uncheckAll} />
          </Table.Bulk.Tail>
        </Table.Bulk>
      </Table>
    </>
  )
}

;<BulkFullExample />
```

### Autocomplete, Filters & Pagination

Each component has it's own documentation ([Autocomplete](https://styleguide.vtex.com/#/Components/Forms/AutocompleteInput), [Filters](https://styleguide.vtex.com/#/Components/Display/FilterBar), [Pagination](https://styleguide.vtex.com/#/Components/Navigation/Pagination)), so it's important to you check it out to see the full capabilities.

```js
import Table from '../index'
import useTableMeasures from '../hooks/useTableMeasures'
import useTableProportion from '../hooks/useTableProportion'
import Input from '../../Input'
import Checkbox from '../../Checkbox'
import data from './sampleData'

const columns = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'email',
    title: 'Email',
  },
  {
    id: 'location',
    title: 'Location',
  },
]

const items = data.customers

/** hook that handles pagination state */
function usePagination(initialSize, items) {
  const [state, setState] = React.useState({
    tableSize: initialSize,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: initialSize,
    slicedItems: [...items].slice(0, initialSize),
  })

  /** resets state on items change */
  React.useEffect(() => {
    setState({
      tableSize: initialSize,
      currentPage: 1,
      currentItemFrom: 1,
      currentItemTo: initialSize,
      slicedItems: [...items].slice(0, initialSize),
    })
  }, [items])

  /** gets the next page */
  const onNextClick = React.useCallback(() => {
    const newPage = state.currentPage + 1
    const itemFrom = state.currentItemTo + 1
    const itemTo = state.tableSize * newPage
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }, [state, items])

  /** gets the previous page */
  const onPrevClick = React.useCallback(() => {
    if (state.currentPage === 0) return
    const newPage = state.currentPage - 1
    const itemFrom = state.currentItemFrom - state.tableSize
    const itemTo = state.currentItemFrom - 1
    const newItems = [...items].slice(itemFrom - 1, itemTo)
    setState(state => ({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    }))
  }, [state, items])

  /** deals rows change of Pagination component */
  const onRowsChange = React.useCallback(
    (e, value) => {
      const rowValue = parseInt(value)
      setState(state => ({
        ...state,
        tableSize: rowValue,
        currentItemTo: rowValue,
        slicedItems: [...items].slice(state.currentItemFrom - 1, rowValue),
      }))
    },
    [state, items]
  )

  return {
    onNextClick,
    onPrevClick,
    onRowsChange,
    ...state,
  }
}

function PaginationExample() {
  const ITEMS_PER_PAGE = 5

  /** handles sizes */
  const measures = useTableMeasures({ size: ITEMS_PER_PAGE })

  /** handles filtering */
  const [filteredItems, setFilteredItems] = React.useState(items)
  const [filterStatements, setFilterStatements] = React.useState([])

  /* handles pagination */
  const { slicedItems, ...paginationProps } = usePagination(
    ITEMS_PER_PAGE,
    filteredItems
  )

  /** handles proportion consistency on change pages */
  const { sizedColumns } = useTableProportion({ columns, ratio: [1, 1] })

  /** handles autocomplete */
  const [term, setTerm] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const timeoutRef = React.useRef(null)

  /** props of the PaginationComponent */
  const pagination = {
    ...paginationProps,
    textOf: 'of',
    rowsOptions: [5, 10, 15],
    textShowRows: 'Show rows',
    totalItems: filteredItems.length,
  }

  /** function to handle filter changes more info @ Styleguides FilterBar docs */
  function handleFiltersChange(statements = []) {
    let newData = items.slice()
    statements.forEach(st => {
      if (!st || !st.object) return
      const { subject, verb, object } = st
      switch (subject) {
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

        case 'location':
          if (!object) return
          const selectedLocations = Object.keys(object).reduce(
            (acc, item) => (object[item] ? [...acc, item] : acc),
            []
          )
          newData = newData.filter(item =>
            selectedLocations.includes(item[subject])
          )
          break
      }
    })
    setFilteredItems(newData)
    setFilterStatements(statements)
  }

  /** FilterBar props */
  const filters = {
    alwaysVisibleFilters: ['name', 'location'],
    statements: filterStatements,
    onChangeStatements: handleFiltersChange,
    clearAllFiltersButtonLabel: 'Clear Filters',
    collapseLeft: true,
    options: {
      name: {
        label: 'Name',
        ...simpleInputVerbsAndLabel(),
      },
      email: {
        label: 'Email',
        ...simpleInputVerbsAndLabel(),
      },
      location: {
        label: 'Location',
        renderFilterLabel: st => {
          if (!st || !st.object) {
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
              renderFn: locationSelectorObject,
              extraParams: {},
            },
          },
        ],
      },
    },
  }

  /** Autocomplete options prop */
  const options = {
    onSelect: (...args) => console.log('onSelect: ', ...args),
    loading,
    value: !term.length
      ? []
      : filteredItems
          .map(item => item.name)
          .filter(name =>
            typeof name === 'string'
              ? name.toLowerCase().includes(term.toLowerCase())
              : name.label.toLowerCase().includes(term.toLowerCase())
          ),
  }

  /** Autocomplete input prop */
  const input = {
    onChange: term => {
      if (term) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(term)
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(term)
      }
    },
    onSearch: (...args) => console.log('onSearch:', ...args),
    onClear: () => setTerm(''),
    placeholder: 'Search name... (e.g.: Peter)',
    value: term,
  }

  return (
    <Table measures={measures} items={slicedItems} columns={sizedColumns}>
      <Table.Toolbar>
        <Table.Toolbar.InputAutocomplete input={input} options={options} />
      </Table.Toolbar>
      <Table.FilterBar {...filters} />
      <Table.Pagination {...pagination} />
    </Table>
  )
}

/** simple input renderer */
function simpleInputObject({ values, onChangeObjectCallback }) {
  return (
    <Input
      value={values || ''}
      onChange={e => onChangeObjectCallback(e.target.value)}
    />
  )
}

/** simple input verbs renderer */
function simpleInputVerbsAndLabel() {
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
          renderFn: simpleInputObject,
          extraParams: {},
        },
      },
      {
        label: 'is not',
        value: '!=',
        object: {
          renderFn: simpleInputObject,
          extraParams: {},
        },
      },
      {
        label: 'contains',
        value: 'contains',
        object: {
          renderFn: simpleInputObject,
          extraParams: {},
        },
      },
    ],
  }
}

/** location input renderer */
function locationSelectorObject({ values, onChangeObjectCallback }) {
  const initialValue = {
    '🇰🇪Wakanda': true,
    '🇺🇸USA': true,
    '🇨🇳China': true,
    '🇷🇺Russia': true,
    '🇬🇧Great Britain': true,
    '🇸🇦Saudi Arabia': true,
    '🇨🇺Cuba': true,
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
                const isEmptyFilter = !newValueKeys.some(key => !newValue[key])
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

;<PaginationExample />
```
<<<<<<< HEAD:react/components/EXPERIMENTAL_Table/docs/Components.md
=======

# 🧪 E2E Testing

The Table has a lot of internal components. To avoid receiving a huge object containing id's of each component, they are semantically created based on the `testId` property.

You can reference as `[data-testid]=id` on your e2e testing tool, such as cypress.

#### Table of semantic generated data-testid's:

💡[id] represents the value of `testId` property, which is `vtex-table-v2` by default.

| Targets                               | Decription                                                        |
| ------------------------------------- | ----------------------------------------------------------------- |
| `[id]`                                | Internal `table`                                                  |
| `[id]__container`                     | `table`'s container                                               |
| `[id]__header`                        | `table`'s `thead`                                                 |
| `[id]__body`                          | `table`'s `tbody`                                                 |
| `[id]__loading`                       | `Loading` container                                               |
| `[id]__empty-state`                   | `EmptyState` component                                            |
| `[id]__filter-bar`                    | `Table.FilterBar` wrapper                                         |
| `[id]__totalizer`                     | `Table.Totalizer` wrapper                                         |
| `[id]__pagination`                    | `Table.Pagination` wrapper                                        |
| `[id]__toolbar`                       | `Table.Toolbar` root                                              |
| `[toolbar]__search-form`              | `Table.Toolbar.InputSearch` `form` tag                            |
| `[toolbar]__search-form__input`       | `Table.Toolbar.InputSearch` input                                 |
| `[toolbar]__input-autocomplete`       | `Table.Toolbar.InputAutocomplete` wrapper                         |
| `[toolbar]__button-group`             | `Table.Toolbar.ButtonGroup` root                                  |
| `[button-group]__columns`             | `Table.Toolbar.ButtonGroup.Columns` button                        |
| `[button-group]__columns__box`        | `Table.Toolbar.ButtonGroup.Columns` box                           |
| `[columns-box]__group-actions`        | `Table.Toolbar.ButtonGroup.Columns` box actions                   |
| `[columns-box]__group-actions--[key]` | `Table.Toolbar.ButtonGroup.Columns` box action of key (1, 2, ...) |
| `[columns-box]__items`                | `Table.Toolbar.ButtonGroup.Columns` box items                     |
| `[button-group]__density`             | `Table.Toolbar.ButtonGroup.Density` button                        |
| `[button-group]__density__box`        | `Table.Toolbar.ButtonGroup.Density` box                           |
| `[density-box]__items`                | `Table.Toolbar.ButtonGroup.Density` box items                     |
| `[button-group]__download`            | `Table.Toolbar.ButtonGroup.Download` button                       |
| `[button-group]__upload`              | `Table.Toolbar.ButtonGroup.Upload` button                         |
| `[button-group]__extra-actions`       | `Table.Toolbar.ButtonGroup.ExtraActions` button                   |
| `[button-group]__new-line`            | `Table.Toolbar.ButtonGroup.NewLine` button                        |

# 📚 Migration Guide

This section is designed to `Table V1` users that desire to upgrade and enjoy the `V2` benefits. Will be discussed the key differences between the two. The reading of the V2 documentation is essential, though.

### Schema vs Columns

The V1 introduced the concept of the table schema, which was a JSON object of type:

```ts
type Schema = {
  properties: {
    [key: string]: {
      title: string
      width: number
      minWidth: number
      cellRenderer: ({
        cellData,
        rowData,
        updateCellMeasurements,
      }) => React.ReactNode
      headerRight: boolean
      sortable: boolean
      headerRenderer: ({ columnIndex, key, title }) => React.ReactNode
    }
  }
}
```

The V2 take on the same problem is the `columns` property, which is an array of columns of type:

```ts
type Column = {
  id?: string
  title?: string | Element | Function
  width?: number | string
  cellRenderer?: (cellData: {
    data: unknown | object
    rowHeight: number
    currentDensity: Density
    motion: ReturnType<typeof useTableMotion>
  }) => React.ReactNode
  sortable?: boolean
  extended?: boolean
  condensed?: string[]
}
```

We can conclude that:

- ➕ The `title` now supports strings or objects.
- ➕ The `width` that was a number, is now a string or a number.
- ➕ We have two new props: `extended` and `condensed`, to handle what rowData was supposed to deal with.
- ♻️ The `key` was converted to an `id` prop of the column object.
- ♻️ `sortable` is kept and did not even change its purpose or type.
- The `cellRenderer` props:
- ➕ The cell can react to `rowHeight`, `currentDensity` and `motion`.
- ♻️ `cellData` is now called `data`
- 🚫 `rowData` is deprecated
- 🚫 `updateCellMeasurements` is deprecated
- 🚫 The `minWidth` is deprecated.
- 🚫 `headerRight` is deprecated
- 🚫 `headerRenderer` is deprecated since its job is done by title.

# Advanced

#### Render Agnostic

```js
const useMeasures = require('./hooks/useTableMeasures.tsx').default
const customers = require('./sampleData.ts').customers
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Can't touch this, tun dun dun dun 🎵
import { DataTable, Tbody, Row } from './DataTable/RadioactiveTableParts.tsx'

const columns = [
  {
    id: 'name',
    title: 'Name',
    width: 300,
  },
  {
    id: 'location',
    title: 'Location',
    width: 300,
  },
]

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
})

function RenderAgnostic() {
  const [items, setItems] = React.useState(customers)
  const measures = useMeasures({ size: items.length })
  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
    density: measures,
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const draftItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(draftItems)
  }

  return (
    <Table
      measures={measures}
      columns={columns}
      items={items}
      __unsafe__giveMeMyRender>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <DataTable ref={provided.innerRef}>
              <Table.Head columns={columns} />
              <Tbody
                columns={columns}
                renderer={({ rowData, rowIndex, rowProps }) => (
                  <Draggable
                    key={rowData.id}
                    draggableId={rowData.id.toString()}
                    index={rowIndex}>
                    {(provided, snapshot) => (
                      <Row
                        ref={provided.innerRef}
                        style={{
                          userSelect: 'none',
                          ...provided.draggableProps.style,
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...rowProps}
                      />
                    )}
                  </Draggable>
                )}
              />
              {provided.placeholder}
            </DataTable>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  )
}

;<RenderAgnostic />
```
>>>>>>> Added unstable parts:react/components/EXPERIMENTAL_Table/README.md
