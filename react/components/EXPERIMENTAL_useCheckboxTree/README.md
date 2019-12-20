💡 If you want a detailed explanation of each input/output, proceed to the `Detailed Props` section.

The `EXPERIMENTAL_useChecbokTree` is a hook to helps to hold state the state of checkboxes lists or trees. The following documentation exposes some examples of usage to give you an overview of how it works. To better structure our examples, let's imagine that we have a collection of clothes featuring the props `id`, `name`, `color` and `qtd` (for quantity). It is desired to select each one separately or all of them with a single checkbox (root):

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const ID_PREFIX = 'simple-example'

function SimpleExample() {
  const items = [
    { id: 'one', name: 'jacket', color: 'red', qtd: 12 },
    { id: 'two', name: 'shirt', color: 'pink', qtd: 0 },
    { id: 'three', name: 'sweater', color: 'blue', qtd: 8 },
    { id: 'four', name: 'hat', color: 'purple', qtd: 0 },
  ]

  const checkboxes = useCheckboxTree({
    items,
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
          const id = `${ID_PREFIX}-${item.id}`
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
;<SimpleExample />
```

### Handling disabled items

The disabled items are controlled by the `isDisabled` function, that receives an item as param. In the following example, an item should be disabled if the quantity is below 1.

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
          const id = `${ID_PREFIX}-${item.id}`
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

### Nested Items

Your items can be trees of any depth as well. To control which prop contains the nested items ('related' in our example) use the `nodesKey` input. You can also define default checked items with the `checked` input.

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const ID_PREFIX = 'tree-example'

function TreeExample() {
  const items = [
    {
      id: '1',
      name: 'jacket',
      color: 'red',
      qtd: 12,
      related: [
        { id: '1.1', name: 'sweater', color: 'blue', qtd: 8 },
        {
          id: '1.2',
          name: 'shirt',
          color: 'pink',
          qtd: 1,
          related: [
            { id: '1.2.1', name: 't-shirt', color: 'lime', qtd: 2 },
            { id: '1.2.2', name: 'shirt', color: 'pink', qtd: 2 },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'hat',
      color: 'purple',
      qtd: 10,
      related: [
        { id: '2.1', name: 'cap', color: 'black', qtd: 17 },
        { id: '2.2', name: 'bandana', color: 'green', qtd: 6 },
      ],
    },
  ]

  const checkboxes = useCheckboxTree({
    items,
    nodesKey: 'related',
    checked: [
      { id: '1.2.2', name: 'shirt', color: 'pink', qtd: 2 },
      { id: '2.2', name: 'bandana', color: 'green', qtd: 6 },
    ],
  })

  function recursiveRender(item, depth = 0) {
    const id = `${ID_PREFIX}-${item.id}`
    const label = `${item.qtd} ${item.color} ${item.name}${
      item.qtd > 1 ? 's' : ''
    } left`

    const containerProps = {
      className: 'mt3',
      style: { marginLeft: 18 * depth },
    }

    return item.related ? (
      <div {...containerProps}>
        <Checkbox
          key={id}
          id={id}
          label={label}
          checked={checkboxes.isChecked(item)}
          partial={checkboxes.isPartiallyChecked(item)}
          onChange={() => checkboxes.toggle(item)}
        />
        {item.related.map(related => recursiveRender(related, depth + 1))}
      </div>
    ) : (
      <div {...containerProps}>
        <Checkbox
          key={id}
          id={id}
          label={label}
          checked={checkboxes.isChecked(item)}
          partial={checkboxes.isPartiallyChecked(item)}
          onChange={() => checkboxes.toggle(item)}
        />
      </div>
    )
  }

  return (
    <>
      <div className="mb3">
        <Checkbox
          id={`${ID_PREFIX}-${checkboxes.itemTree.id}`}
          checked={checkboxes.allChecked}
          partial={checkboxes.someChecked}
          onChange={checkboxes.toggleAll}
          label="Clothes - Select All"
        />
      </div>

      <div className="ml5">
        {checkboxes.itemTree.related.map(item => recursiveRender(item))}
      </div>
    </>
  )
}
;<TreeExample />
```

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
- **Type**: `({ checkedItems: T[], disabledItems: T[] }) => void`
- **Default**: `undefined`

##### isDisabled

- Function that defines a item disabled or not. Returns `true` for a disabled item
- **Type**: `(item: T | Tree<T>) => boolean`
- **Default**: `() => false`

#### Output

Similarly to input, the output is also a single object. All the exported properties are either states, memos or callbacks - meaning that you can safely include then as dependencies of your custom effects. They are so many to support a large number of use cases, and normally you will not need all of them to reach your solution.

##### itemTree

- Parsed tree that has the shape:

```ts
type Tree<T>{
  id: 'VTEX_CheckboxTreeRoot' //id of the root
  [nodesKey]: T[] //Your items will be here
}
```

- **Type**: `Tree<T>`.

##### checkedItems

- Current list of items that are checked (including the root).
- **Type**: `Array<T>`.

##### disabledItems

- List of items that are disabled
- **Type**: `Array<T>`

##### isChecked

- If a item is checked or not
- **Type**: `(item: T | Tree<T>) => boolean`

##### isPartiallyChecked

- Return if an item or a tree is checked partially
- **Type**: `(item: T | Tree<T>) => boolean`

##### allChecked

- Returns true if all the items are checked
- **Type**: `boolean`

##### someChecked

- Returns true if one some item is checked
- **Type**: `boolean`

##### toggle

- Bulk toggle one item or a tree
- **Type**: `(item: T | Tree<T>) => void`

##### check

- Bulk checks one item or tree
- **Type**: `(item: T | Tree<T>) => void`

##### uncheck

- Bulk unchecks one item or tree
- **Type**: `(item: T | Tree<T>) => void`

##### toggleAll

- Toggle the root
- **Type**: `() => void`

##### checkAll

- Check the root
- **Type**: `() => void`

##### uncheckAll

- Uncheck the root
- **Type**: `() => void`

##### setChecked

- Sets the current `checkedItems`
- **Type**: `(checked: Array<T>) => void`
