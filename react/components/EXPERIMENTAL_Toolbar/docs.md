#### The toolbar is a bundle of features, including search input, autocomplete, columns visibility toggle, density controls, import and export buttons, extra actions menu using ActionMenu component and a newLine button to help with entry creation (you can see the illustrative diagram in the beginning of the page for a better visualization of this structure)

```js
import Toolbar from './index'

function Showcase() {

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
    visibility: {
      columns: [
        { id: 'name', title: 'Name' },
        { id: 'balance', title: 'Balance' },
        { id: 'locale', title: 'Locale' }
      ],
      hiddenColumns: ['locale']
    },
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

  return (
    <Toolbar>
      <Toolbar.InputSearch {...inputSearch} />
      <Toolbar.ButtonGroup>
        <Toolbar.ButtonGroup.Columns {...buttonColumns} />
        <Toolbar.ButtonGroup.Density {...density} />
        <Toolbar.ButtonGroup.Download {...download} />
        <Toolbar.ButtonGroup.Upload {...upload} />
        <Toolbar.ButtonGroup.ExtraActions {...extraActions} />
        <Toolbar.ButtonGroup.NewLine {...newLine} />
      </Toolbar.ButtonGroup>
    </Toolbar>
  )
}
;<Showcase />
```

## Composition

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
