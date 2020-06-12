The column's visibility can be toggled using `useGridVisibility`. This is useful to hide optional properties, providing a more distinct visualization.

## Inputs

| Property      | Type     | Required | Default | Description                      |
| ------------- | -------- | -------- | ------- | -------------------------------- |
| columns       | Column[] | ✅       | 🚫      | Columns of the table             |
| hiddenColumns | string[] | 🚫       | []      | Columns that are initally hidden |

## Outputs

| Property       | Type                 | Description                      |
| -------------- | -------------------- | -------------------------------- |
| visibleColumns | Column[]             | Columns that are visible         |
| hiddenColumns  | string[]             | Columns that are hidden          |
| toggleColumn   | (id: string) => void | Toggle a column visibility by id |
| showColumn     | (id: string) => void | Show a column visibility by id   |
| hideColumn     | (id: string) => void | Hide a column visibility by id   |
| showAllColumns | () => void           | Make all columns visible         |
| hideAllColumns | () => void           | Make all columns hidden          |
