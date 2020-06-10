#### Compound component often used to apply mass actions through a collection

```js
import BulkActions from './index'

function Showcase() {
  const primaryAction = {
    label: 'Primary Action',
    onClick: () => alert('clicked primary action'),
  }

  const secondaryActions = {
    label: 'Quantity',
    actions: [
      {
        label: 'Secondary Action 1',
        onClick: ctx => alert(`clicked ${ctx} one`),
      },
      {
        label: 'Secondary Action 1',
        onClick: ctx => alert(`clicked ${ctx} two`),
      },
    ],
    onActionClick: action => action.onClick('secondary-action'),
  }

  return (
    <BulkActions active={true}>
      <BulkActions.Actions>
        <BulkActions.Actions.Primary {...primaryAction} />
        <BulkActions.Actions.Secondary {...secondaryActions} />
      </BulkActions.Actions>
      <BulkActions.Tail>
        <BulkActions.Tail.Info>
          Info example
        </BulkActions.Tail.Info>
        <BulkActions.Tail.Toggle
          button={{
            text: 'Select all items',
            onClick: () => alert('clicked on toggle'),
          }}
          active={false}>
          Selected items count: 20
        </BulkActions.Tail.Toggle>
        <BulkActions.Tail.Dismiss onClick={() => alert('clicked on dismiss')} />
      </BulkActions.Tail>
    </BulkActions>
  )
}

;<Showcase />
```

## Props

#### Any prop of div is accepted

| Property | Type             | Required | Default | Description         |
|----------|------------------|----------|---------|---------------------|
| active   | boolean          | 🚫       | false   | If is active or not |
| height   | number or string | 🚫       | 56      | Height of container |

## Composition

#### Actions

##### Primary

- Button to handle primary.

| Property | Type       | Required | Default | Description            |
|----------|------------|----------|---------|------------------------|
| label    | string     | ✅        | 🚫      | Button text            |
| onClick  | () => void | ✅        | 🚫      | Action on click button |

##### Secondary

- Button to handle secondary actions.

| Property      | Type                    | Required | Default | Description             |
|---------------|-------------------------|----------|---------|-------------------------|
| label         | string                  | ✅        | 🚫      | Button text             |
| onClick       | () => void              | ✅        | 🚫      | Action on click button  |
| onActionClick | (e: MenuAction) => void | 🚫       | 🚫      | Action on click actions |

#### Tail

##### Info

- Displays information of any kind.
- Often used to display selected rows count.

| Property | Type           | Required | Default | Description     |
|----------|----------------|----------|---------|-----------------|
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
|----------|----------------|----------|---------|-------------------------------|
| button   | Button         | ✅        | 🚫      | Button props                  |
| active   | boolean        | 🚫       | false   | Action on click button        |
| children | React.ReacNode | 🚫       | 🚫      | Item to show when is inactive |

##### Dismiss

- Button to handle download or export actions.

| Property | Type       | Required | Default | Description            |
|----------|------------|----------|---------|------------------------|
| onClick  | () => void | ✅        | 🚫      | Action on click button |
