The `EXPERIMENTAL_useChecbokTree` is a hook to helps holding state the state of checboxes lists or trees.

### Handling disabled items

The disabled items are controlled by the `isDisabled` function, that receives an item as callBack. In the following example, we have a collection of clothes, which should be disabled if the quantity is below 1.

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const ID_PREFIX = 'disabled-example'

function DisabledExample() {
  const items = [
    { id: 'one', name: 'jacket', color: 'red', qtd: 12 },
    { id: 'two', name: 'shirt', color: 'pink', qtd: 0 },
    { id: 'three', name: 'sweater', color: 'blue', qtd: 8 },
    { id: 'four', name: 'hat', color: 'purple', qtd: 0 },
  ]

  const checkboxes = useCheckboxTree({
    items,
    isDisabled: item => item.qtd < 1,
  })

  return (
    <>
      <div className="mb3">
        <Checkbox
          id={`${ID_PREFIX}-${checkboxes.itemTree.id}`}
          checked={checkboxes.allChecked}
          partial={checkboxes.someChecked}
          onChange={checkboxes.toggleAll}
          label="Clothes"
        />
      </div>

      <div className="ml5">
        {checkboxes.itemTree.children.map(item => {
          const id = `${ID_PREFIX}-${item.id}-${item.color}`
          const label = `${item.qtd} ${item.color} ${item.name}${
            item.qtd > 1 ? 's' : ''
          } left`
          return (
            <Checkbox
              key={id}
              id={id}
              label={label}
              checked={checkboxes.isChecked(item)}
              partial={checkboxes.isPartiallyChecked(item)}
              disabled={checkboxes.isDisabled(item)}
              onChange={() => checkboxes.toggle(item)}
            />
          )
        })}
      </div>
    </>
  )
}
;<DisabledExample />
```

### Granting unicity

Unicity should be granted by the `comparator` curry, in which the curried parameters are two items and must return true if items are equal. In the example above there are some items with repeated `id`s, so we define a comparator that compares `id` and `color`.

⚠️If you encounter a collection that contains deep equal items, a good solution is to map it into a new collection adding a prop to grants unicity, and then use the comparator function.

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const ID_PREFIX = 'comparator-example'

function ComparatorExample() {
  const items = [
    { id: 'one', name: 'jacket', color: 'red', qtd: 12 },
    { id: 'one', name: 'shirt', color: 'pink', qtd: 0 },
    { id: 'one', name: 'sweater', color: 'blue', qtd: 8 },
    { id: 'four', name: 'hat', color: 'purple', qtd: 0 },
  ]

  const checkboxes = useCheckboxTree({
    items,
    comparator: item => candidate =>
      item.id === candidate.id && item.color === candidate.color,
  })

  return (
    <>
      <div className="mb3">
        <Checkbox
          id={`${ID_PREFIX}-${checkboxes.itemTree.id}`}
          checked={checkboxes.allChecked}
          partial={checkboxes.someChecked}
          onChange={checkboxes.toggleAll}
          label="Clothes"
        />
      </div>

      <div className="ml5">
        {checkboxes.itemTree.children.map(item => {
          const id = `${ID_PREFIX}-${item.id}-${item.color}`
          const label = `${item.qtd} ${item.color} ${item.name}${
            item.qtd > 1 ? 's' : ''
          } left`
          return (
            <Checkbox
              key={id}
              id={id}
              label={label}
              checked={checkboxes.isChecked(item)}
              partial={checkboxes.isPartiallyChecked(item)}
              onChange={() => checkboxes.toggle(item)}
            />
          )
        })}
      </div>
    </>
  )
}
;<ComparatorExample />
```

### Nested

TODO

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
