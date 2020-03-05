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
