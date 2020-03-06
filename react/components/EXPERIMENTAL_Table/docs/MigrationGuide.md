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

### Composition over Object Props

Coming from the previous `Table` version you are used to configuring internal components (Toolbar, Pagination, etc...) throughout a huge object, passed to the `Table`. This will not work in the new version.

The objects were split into dedicated and self-contained components. Check the examples down below:

#### Old Version (Object Properties):

```ts
<Table
  toolbar={{
    inputSearch: {
      value: '...',
      placeholder: '...',
      onChange: () => {},
      onClear: () => {},
      onSubmit: () => {},
    },
    density: {
      buttonLabel: 'Line density',
      lowOptionLabel: 'Low',
      mediumOptionLabel: 'Medium',
      highOptionLabel: 'High',
    },
    download: {
      label: 'Export',
      handleCallback: () => {},
    },
    upload: {
      label: 'Import',
      handleCallback: () => {},
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
          label: '...',
          handleCallback: () => {},
        },
      ],
    },
    newLine: {
      label: 'New',
      handleCallback: () => {},
    },
  }}
  bulkActions={{
    texts: {
      secondaryActionsLabel: 'Actions',
      rowsSelected: qty => {}
      selectAll: 'Select all',
      allRowsSelected: qty => {},
    },
    totalItems: 0,
    onChange: params => {},
    main: {
      label: 'Main Action',
      handleCallback: params => {},
    },
    others: [
      {
        label: 'Action 1',
        handleCallback: params => {},
      },
    ],
  }}
  pagination={/* @vtex.styleguide/Pagination */}
  totalizers={/* @vtex.styleguide/Totalizers */}
  filters={/* @vtex.styleguide/FilterBar */}
/>
```

#### New Version (composition):

```ts
const visibility = useTableVisibility({
  /*...*/
})
const measures = useTableMeasures({
  /* ... */
})

const checkboxes = useCheckboxTree({
  /*...*/
})

return (
  <Table>
    <Table.Toolbar>
      <Table.Toolbar.InputSearch
        value="..."
        placeholder="..."
        onChange={() => {}}
        onClear={() => {}}
        onSubmit={() => {}}
      />
      <Table.Toolbar.ButtonGroup>
        <Table.Toolbar.ButtonGroup.Columns
          label="Toggle visible fields"
          showAllLabel="Show All"
          hideAllLabel="Hide All"
          visibility={visibility}
        />
        <Table.Toolbar.ButtonGroup.Density
          label="Line density"
          compactLabel="Compact"
          regularLabel="Regular"
          comfortableLabel="Comfortable"
          density={measures}
        />
        <Table.Toolbar.ButtonGroup.Download label="Export" onClick={() => {}} />
        <Table.Toolbar.ButtonGroup.Upload label="Import" onClick={() => {}} />
        <Table.Toolbar.ButtonGroup.ExtraActions
          label="More options"
          actions={[
            {
              label: '...',
              onClick: () => {},
            },
          ]}
        />
        <Table.Toolbar.ButtonGroup.NewLine label="New" onClick={() => {}} />
      </Table.Toolbar.ButtonGroup>
    </Table.Toolbar>
    <Table.Bulk active={checkboxes.someChecked}>
      <Table.Bulk.Actions>
        <Table.Bulk.Actions.Primary label="Main Action" onClick={() => {}} />
        <Table.Bulk.Actions.Secondary
          label='Quantity'
          actions={[
            {
              label: 'Increase 50',
              onClick: {},
            },
          ]},
          onActionClick={action => action.onClick(checkboxes.checkedItems)}
        />
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
    <Table.Pagination {/* ...@vtex.styleguide/Pagination */} />
    <Table.Totalizers {/* ...@vtex.styleguide/Totalizers */} />
    <Table.FilterBar {/* ...@vtex.styleguide/FilterBar */} />
  </Table>
)
```

#### Notable changes

- ♻️`pagination` ➡️ `Pagination`.
- ♻️`totalizers` ➡️ `Totalizers`.
- ♻️`filters` ➡️ `FilterBar`.
- ♻️`bulk` ➡️ `BulkActions`, that is hightly composable.
- ♻️`toolbar` ➡️ `Toolbar`.
- ♻️`toolbar.inputSearch` ➡️ `Toolbar.InputSearch` with same props.
- ♻️`toolbar.fields` ➡️ `Toolbar.ButtonGroup.Columns`. Added the visibility prop as the result of `useTableVisibility` hook.
- ♻️`toolbar.density` ➡️ `Toolbar.ButtonGroup.Density`. The densities changed.
- ♻️`toolbar.download` ➡️ `Toolbar.ButtonGroup.Download` with same props.
- ♻️`toolbar.upload` ➡️ `Toolbar.ButtonGroup.Upload` with same props.
- ♻️`toolbar.extraActions` ➡️ `Toolbar.ButtonGroup.ExtraActions` with same props.
- ♻️`toolbar.newLine` ➡️ `Toolbar.ButtonGroup.NewLine` with same props.
