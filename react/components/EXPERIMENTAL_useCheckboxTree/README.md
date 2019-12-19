The `EXPERIMENTAL_useChecbokTree` is a hook to helps holding state the state of checboxes lists or trees.

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

function Case() {
  const checkboxes = useCheckboxTree({
    items,
  })

  return (
    <>
      <Checkbox
        key={checkboxes.itemTree}
        checked={checkboxes.allChecked}
        partial={checkboxes.someChecked}
        onChange={checkboxes.toggleAll}
        label="Root"
      />

      {checkboxes.itemTree.children.map(item => (
        <Checkbox
          key={item.id}
          id={item.id}
          checked={checkboxes.isChecked(item)}
          partial={checkboxes.isPartiallyChecked(item)}
          onChange={() => checkboxes.toggle(item)}
          label={`item ${item.id}`}
        />
      ))}
    </>
  )
}
;<Case />
```

### Handling disabled items

The disabled items are controled by the `isDisabled`. In the following example we have a collection of --something--.

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const items = [
  { id: 1, name: 'White sneakers', qtd: 12 },
  { id: 2, name: 'Red shirt', qtd: 0 },
  { id: 3, name: 'Blue shorts', qtd: 8 },
  { id: 4, name: 'Pink hat', qtd: 0 },
]

function DisabledExample() {
  const isDisabled = item => item.qtd < 1

  const checkboxes = useCheckboxTree({
    items,
    isDisabled,
  })

  return (
    <>
      <Checkbox
        key={checkboxes.itemTree}
        checked={checkboxes.allChecked}
        partial={checkboxes.someChecked}
        onChange={checkboxes.toggleAll}
        label="Root"
      />

      {checkboxes.itemTree.children.map(item => (
        <Checkbox
          key={item.id}
          id={item.id}
          checked={checkboxes.isChecked(item)}
          partial={checkboxes.isPartiallyChecked(item)}
          disabled={checkboxes.isDisabled(item)}
          onChange={() => checkboxes.toggle(item)}
          label={`${item.name}, ${item.qtd}`}
        />
      ))}
    </>
  )
}
;<DisabledExample />
```

### Nested

...

## Detailed props

#### Input

The `useCheckboxTree` hook receives a single object as a parameter, which contains the following props:

##### items

- Represents the items of your collection. Each one will be related to a single checkbox and may be toggled by parents.
- **Type**: `Array<T>`
- ⚠️This property is required!

##### nodesKey

- Name of the property that contains the nested items, which is children by default.
- Type: `string`
- **Default**: `'children'`

##### checked

- List of items that are checked by default.
- Type: `Array<T>`
- **Default**: `[]`

##### comparator

- The curry that defines the condition that makes an item unique in the collection. You MUST grant item unicity! If the comparator condition is ambiguous the toggle algorithm will not work as it supposed to.
- **Type**: `(item: T) => (candidante: T) => boolean`
- **Default**: `(item: T) => (candidante: T) => item.id === candidate.id`

##### onToggle

- Funtion that is called on every item toggle.
- **Type**: `({ checkedItems: T[] }) => void`
- **Default**: `undefined`

##### isDisabled

- Function that defines a item disabled or not. Returns `true` for a disabled item
- **Type**: `(item: T | Tree<T>) => boolean`
- **Default**: `() => false`

#### Output

Similarly to input, the output is also a single object. All the exported properties are either states, memos or callbacks - meaning that you can safely include then as dependencies of your custom effects. They are so many to support a large number of use cases, and normally you will not need all of them to reach your solution.

##### itemTree

- Lorem.
- **Type**: `Tree<T>`.

##### checkedItems

- Current list of items that are checked.
- **Type**: `Array<T>`.

##### disabledItems

- Lorem
- **Type**: `Array<T>`

##### isChecked

- If a item is checked or not
- **Type**: `(item: T | Tree<T>) => boolean`

##### isPartiallyChecked

- Lorem
- **Type**: `(item: T | Tree<T>) => boolean`

##### allChecked

- Lorem
- **Type**: `boolean`

##### someChecked

- Lorem
- **Type**: `boolean`

##### toggle

- Lorem
- **Type**: `(item: T | Tree<T>) => void`

##### toggleAll

- Lorem
- **Type**: `() => void`

##### check

- Lorem
- **Type**: `(item: T | Tree<T>) => void`

##### checkAll

- Lorem
- **Type**: `() => void`

##### uncheck

- Lorem
- **Type**: `(item: T | Tree<T>) => void`

##### uncheckAll

- Lorem
- **Type**: `() => void`

##### isDisabled

- Lorem
- **Type**: `(item: T | Tree<T>) => boolean`
