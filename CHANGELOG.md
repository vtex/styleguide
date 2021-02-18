# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `values` prop to the `Slider`.

## [9.135.2] - 2021-02-10

### Fixed

- **PageBlock** responsiveness issue on aside variation.
- **EXPERIMENTAL_TableV2** rows height when using `disableScroll`.

## [9.135.1] - 2021-01-28

### Fixed

- Button not being disabled if it is loading.

## [9.135.0] - 2021-01-20

### Added

- Class `vtex-textarea__input` on `Textarea` component.

## [9.134.1] - 2020-12-22

### Fixed

- Input and dropdown now have font-size of 16px no matter their sizes

## [9.134.0] - 2020-12-04

### Added

- Class `vtex-tag` on `Tag` component.

## [9.133.3] - 2020-11-19

### Fixed

- **EXPERIMENTAL_Modal** height on small screens.
- **EXPERIMENTAL_Modal** overflown content overlapping on iOS Safari.
- `utilities` folder not being compiled on the package build.

## [9.133.2] - 2020-11-12

### Fixed

- **EXPERIMENTAL_Modal** `ref` not properly passed to modal element.
- **EXPERIMENTAL_Table** `emptyState` height

## [9.133.1] - 2020-10-29

### Fixed

- **Slider** race condition.

## [9.133.0] - 2020-10-14

### Added

- CSS handles to Input, Dropdown, and Textarea error messages and help texts.

## [9.132.1] - 2020-10-08

### Fixed

- **EXPERIMENTAL_Table** `emptyState` type definitions.

## [9.132.0] - 2020-10-08

### Added

- **AutocompleteInput** restart navigating from top when reaching the end of the suggested options with the down arrow key.

### Fixed

- **AutocompleteInput** double focus issue when navigating through the suggested options with tab and arrow keys.
- **EXPERIMENTAL_useCheckboxTree** root checkbox behavior when all children checkboxes are disabled.

## [9.131.0] - 2020-10-05

### Added

- `EXPERIMENTAL_Modal`.
- `useDisclosure` utils.

### Fixed

- **AutocompleteInput** term should follow `input.value` changes to allow input control outside the component.

## [9.130.2] - 2020-10-02

### Changed

- **Spinner** Make animation simpler for better performance.

## [9.130.1] - 2020-09-29

### Fixed

- **AutocompleteInput** exported types.

## [9.130.0] - 2020-09-29

### Added

- **AutocompleteInput** `input.prefix` and `input.suffix` props.

### Fixed

- **AutocompleteInput** without search button logic.

## [9.129.1] - 2020-09-24

### Fixed

- **AutocompleteInput** popup not closing when clicking on search button.
- **EXPERIMENTAL_Table** cell suffix classes.

## [9.129.0] - 2020-09-15

### Added

- `isOverflowHidden` prop to the `Collapsible` component.
- CSS handles to RadioGroup and Radio.

### Fixed

- **FilterOptions** behaviour and example.
- **ColorPicker** hex validation.
- **InputSearch** component icon unaligned.

## [9.128.1] - 2020-08-28

### Fixed

- **Plus** icon solid alignment.

## [9.128.0] - 2020-08-27

### Added

- `onClick` prop to `ActionMenu` component.

### Fixed

- **Plus** icon size and color.
- `AutoCompleteInput` padding-right when `ClearInputIcon` is shown.
- Checkbox alignment with large texts.

## [9.127.0] - 2020-08-13

### Added

- `accept`, `minSize` and `maxSize` props to `Dropzone` component.

## [9.126.0] - 2020-08-03

### Added

- `options.customMessage` prop to `AutocompleteInput`.
- `error` and `errorMessage` props to `AutocompleteInput` component.

### Fixed

- Tooltip `Portal` proptypes.
- `AutocompleteInput` typing definitions.

## [9.125.0] - 2020-07-23

### Fixed

- Table's empty state style
- Page header button hover
- `Tab` active color being set as `outset`.
- Select's label size on regular variation.
- Accent on `Select` input change.
- Conditions' operator label color
- `vtex-dropdown__container` CSS handle.
- Hide clear button on `InputSearch` when disabled

### Added

- `disabled` prop for ActionMenu items
- `testId` property to option in `ActionMenu`.

### Changed

- `AutocompleteInput` search icon is now optional.

## [9.124.2] - 2020-07-09

### Fixed

- Select menu position as a prop.

## [9.124.1] - 2020-07-09

### Fixed

- Select menu overflow.
- `Tooltip` position calculation. Use container and window to calculate collisions.

## [9.124.0] - 2020-07-02

### Added

- prop `zIndex` on `Menu` and `ActionMenu` components, to better control the z-index level of these components.

### Fixed

- `Experimental_Select` dropdown style

## [9.123.0] - 2020-06-26

### Added

- `size` prop to AutocompleteInput

## [9.122.0] - 2020-06-25

### Fixed

- `FilterBar` clear icon disabled style.
- `AutocompleteInput` disabled style.
- Filters hidden for existing statements.
- `EXPERIMENTAL_Select` style.

### Added

- testId props in `ModalDialog` confirmation and cancelation buttons.

## [9.121.0] - 2020-06-19

### Added

- `vtex-slider__base-internal` CSS handle.
- `Table.Sections.LoadedView` to export functionality of hiding the table's body when content is not loaded or is empty.
- `EXPERIMENTAL_Table/Cell` style prop.
- `content` render prop on `EXPERIMENTAL_Table/Row`.
- `isMobile` and `device` properties in the `FilterBar` component for device verification in the `withDeviceHoc` HOC.

### Fixed

- `FilterTag` disabled style.
- Filter bar button font.

## [9.120.1] - 2020-06-05

### Fixed

- Checkbox bug of not having a ref.

## [9.120.0] - 2020-06-04

### Added

- `forwardedRef` prop to `Textarea`.
- Add transition to table v2 cells width.
- `disabled` prop to FilterBar component.

### Fixed

- Transparent background on Dropdown component when `error={true}`.
- Border color of the Dropdown component not changing on focus.
- `AutocompleteInput` disabled style.
- `forwardedRef` of `Checkbox` not accepting function refs.
- Padding when table v2 cell has 0 width.

## [9.119.1] - 2020-06-02

### Fixed

- Remove trailing space from `numericStepper` when there isn't a suffix

## [9.119.0] - 2020-05-21

### Added

- Make screen readers anounce `Alert` content when it pops up in the screen
- Allow developers to choose to direct focus to the `Alert` when it pops up in the screen by using the `focusOnOpen` property
- `vtex-checkbox__box-wrapper`, `vtex-checkbox__box`, and `vtex-checkbox__input` handles.
- `noOptionsMessage` prop to `FilterBar`.

### Fixed

- Render empty span when `VerbAtom` has no value to show.

## [9.118.0] - 2020-05-14

### Added

- `vtex-slider__values-container`, `vtex-slider__left-value`, `vtex-slider__right-value`, `vtex-slider__dash` handles.
- `tabIndex` prop to `Button`.
- `error` and `errorMessage` props to `MultiSelect`.

## [9.117.0] - 2020-05-13

### Added

- `hideColumns` & `showColumns` functions to `useTableVisibility`
- `bodyHeight` memo to `useTableMeasures`
- `disableScroll` to `Table.Sections`

### Fixed

- `Table.Body.Cell` unstable heights

## [9.116.0] - 2020-05-07

### Added

- `error` and `errorMessage` props to `RadioGroup`.

## [9.115.0] - 2020-04-30

### Added

- `container` prop to `Tooltip`.

### Removed

- `ActionMenu` and `Menu` default fixed width.
- `Tooltip` popup `max-height`.

### Fixed

- Value when user tries to update with an option selected in the `AutocompleteInput` component

## [9.114.0] - 2020-04-28

### Fixed

- `AutoCompleteInput` custom render example.

### Added

- `unitMultiplier`, `measurementUnit`, and `showMeasurementUnit` props.
- Format display value with multiplier.

## [9.113.2] - 2020-04-16

### Fixed

- Spacing of last item in RadioGroup.
- `Dropdown` duplicate optgroup with `preventTruncate` option.
- Using indeterminate on checkbox when partial true

## [9.113.1] - 2020-04-09

### Changed

- Condition's statement layout for long inputs

### Fixed

- Add missing namespaced CSS classes to NumericStepper.

## [9.113.0] - 2020-04-07

### Added

- `fit` prop to `PageBlock` and `Box` components.

## [9.112.28] - 2020-04-02

### Fixed

- Dropdown's selected option when value is `undefined`.
- `ButtonGroup` outline.
- Table header should not be clickable.

### Added

- `Totalizer` testids.
- Support for `react-select` custom components
- Initial state of `useTableSorting` hook can now be set by its client.

## [9.112.27] - 2020-03-26

### Fixed

- Truncate big texts in `AutoCompleteInput` options.

## [9.112.26] - 2020-03-23

### Added

- Expose `EXPERIMENTAL_Table` sections.

## [9.112.25] - 2020-03-20

### Added

- Tests for `EXPERIMENTAL_Table` hooks.

### Changed

- Upgraded testing-library versions.

## [9.112.24] - 2020-03-19

### Fixed

- The `Tooltip` component overflows when there are long words.

## [9.112.23] - 2020-03-18

### Fixed

- Apply proper spacing to large dropdowns

## [9.112.22] - 2020-03-18

### Fixed

- Totalizer's container width when inverted.

## [9.112.21] - 2020-03-18

### Removed

- `checkboxes` prop from `EXPERIMENTAL_Table`.
- `EXPERIMENTAL_TableTree` component.

## [9.112.20] - 2020-03-17

### Fixed

- ReferenceError by accessing 'valueLabel' const on `Dropdown`.

## [9.112.19] - 2020-03-16

### Fixed

- `EXPERIMENTAL_useTableMeasures` SSR errors.

## [9.112.18] - 2020-03-16

### Fixed

- Add missing class to `Checkbox` to make it easier to customize it.

## [9.112.17] - 2020-03-16

### Changed

- From `currentDensity` to `density` on `EXPERIMENTAL_Table`

## [9.112.16] - 2020-03-16

- Broken styles of `Dropdown` inside an `Input` prefix or suffix.

## [9.112.15] - 2020-03-10

### Fixed

- Add `useCallback` in the `showAllColumns` and `hideAllColumns` in the `EXPERIMENTAL_useTableVisibility` hook.

## [9.112.14] - 2020-03-10

### Changed

- Keep newLine button and search enabled on Table's toolbar while loading

## [9.112.13] - 2020-03-09

### Fixed

- Unecessary `Cell` rerender on `EXPERIMENTAL_Table` due not checking if the cell is sortable.

## [9.112.12] - 2020-03-09

### Added

- `testId` in `Filter` options.

## [9.112.11] - 2020-03-06

### Added

- New `buttonProps` prop to `Input` and `InputButton` component

## [9.112.10] - 2020-03-06

### Changed

- Split `EXPERIMENTAL_Table` docs on multiple files.

## [9.112.9] - 2020-03-05

### Added

- `COMPOSITION OVER OBJECT PROPS` section at `EXPERIMENTAL_Table` docs.

## [9.112.8] - 2020-03-05

### Fixed

- Generating lib folder

## [9.112.7] - 2020-03-02

### Added

- `testId` in `Toggle`.

## [9.112.6] - 2020-03-02

### Fixed

- FilterTag not closing when filter is cleaned.

## [9.112.5] - 2020-02-28

### Added

- New `Location` icon for place components

## [9.112.4] - 2020-02-28

### Fixed

- `EPERIMENTAL_Select` forcing focus after options are loaded
- Gap betwenn columns when scrollbar appears

## [9.112.3] - 2020-02-27

### Changed

- Color of active row on `EXPERIMENTAL_Table`.

## [9.112.2] - 2020-02-27

### Fixed

- `EXPERIMENTAL_Table` background colors.

## [9.112.1] - 2020-02-20

### Added

- `stickyHeader` prop to `EXPERIMENTAL_Table`.

## [9.112.0] - 2020-02-19

### Added

- `input` css handle to the `Input` component.

## [9.111.6] - 2020-02-19

### Changed

- Moved the `postinstall` script to `prepare`, to avoid adding devDependencies on production.

## [9.111.5] - 2020-02-17

## [9.111.5-beta] - 2020-02-17

### Changed

- `recharts@^2.0.0-beta.1` to `peerDependencies`.

## [9.111.4] - 2020-02-17

### Added

- Packages `react@^16.8.0` and `react-dom@^16.8.0` to `peerDependencies`.

## [9.111.3] - 2020-02-17

### Fixed

- Add more check to document for prevent undefined.

## [9.111.2] - 2020-02-17

### Added

- `highlightOnHover` prop to `EXPERIMENTAL_Table`

## [9.111.1] - 2020-02-17

### Fixed

- Add missing IconBase file.

## [9.111.0] - 2020-02-17

### Changed

- Refactor `icons` to support `<use>`.

## [9.110.1] - 2020-02-12

### Fixed

- `showToast` warning when it is used at any context

## [9.110.0] - 2020-02-12

### Added

- `LineChart` custom configuration to all inner components to allow a better usage of our charts.

## [9.109.4] - 2020-02-11

### Fixed

- `Tooltip` display verification logic.

## [9.109.3] - 2020-02-10

### Added

- `EXPERIMENTAL_Table` features documentation.

## [9.109.2] - 2020-02-07

### Added

- `testId` to `EXPERIMENTAL_TABLE`.

## [9.109.1] - 2020-02-05

### Added

- Test id in `FilterTag`.

## [9.109.0] - 2020-02-05

### Added

- `vtex-checkbox__line-container`, `vtex-checkbox__container`, `vtex-checkbox__inner-container` handles.

## [9.108.8] - 2020-02-04

### Changed

- `EXPERIMENTAL_Table` cell to have no dependencies.

### Removed

- `styled-components` dependency.

## [9.108.7] - 2020-02-04

### Added

- `index.js` file to import components the same way as in VTEX IO.

### Fixed

- Fix imports that were breaking when using components outside VTEX IO.

## [9.108.6] - 2020-02-03

### Added

- `EXPERIMENTAL_Table` state handlers documentation.

## [9.108.5] - 2020-02-03

### Added

- `condensed` and `extended` columns to `EXPERIMENTAL_Table`.

### Removed

- `EXPERIMENTAL_Table` line actions.

## [9.108.4] - 2020-02-03

### Added

- `ActionBar` to `EXPERIMENTAL_Table`.

## [9.108.3] - 2020-02-03

### Added

- `RadioGroup` now has `label` and `size` props

### Changed

- `RadioGroup` is now surrounded with a `<fieldset>` tag

## [9.108.2] - 2020-01-31

### Changed

- Toolbar buttons default size is now regular.

## [9.108.1] - 2020-01-30

### Changed

- `EXPERIMENTAL_Table` density names.

## [9.108.0] - 2020-01-29

### Added

- `keepAfterUpdate` option to `Toast`.

## [9.107.0] - 2020-01-28

### Added

- `numeric-stepper__label`, `numeric-stepper-container`, `numeric-steper__input`, `numeric-stepper__plus-button-container`, `numeric-stepper__plus-button`, `numeric-stepper__plus-button__text`, `numeric-stepper__minus-button-container`, `numeric-stepper__minus-button`, `numeric-stepper__minus-button__text` and `numeric-stepper-wrapper` to the elements that didn't have any handle.

## [9.106.3] - 2020-01-27

### Added

- `forwardRef` to `Checkbox` component.

### Fixed

- Avoid calling `onChange` callback when `undefined`.

## [9.106.2] - 2020-01-27

### Fixed

- Error caused by deleting a filter tag while the `Menu` is still active in the `FilterBar` component.

## [9.106.1] - 2020-01-27

### Fixed

- Checks if the paginationClone object is not empty in `Table`.

### Changed

- PropTypes required in `SwitchablePagination`.

## [9.106.0] - 2020-01-27

### Added

- `withDevice` HOC for responsiveness.
- Mobile behavior for the `FilterBar` component.

## [9.105.6] - 2020-01-27

### Fixed

- Margin when the Download Button is disabled.

## [9.105.5] - 2020-01-23

### Added

- Sortable columns to `EXPERIMENTAL_Table`.

## [9.105.4] - 2020-01-22

### Added

- `defaultMenuIsOpen` prop in `EXPERIMENTAL_Select`.

## [9.105.3] - 2020-01-22

### Fixed

- `EXPERIMENTAL_Table` npm import.

## [9.105.2] - 2020-01-20

### Added

- `Totalizer` to `EXPERIMENTAL_Table`.

## [9.105.1] - 2020-01-17

### Added

- Test ids in `ButtonWithIcon`, select element from `Dropdown`, `PageIndicator` and `Pagination`.

## [9.105.0] - 2020-01-16

### Added

- Handle to the label of the `Button`.

## [9.104.11] - 2020-01-15

### Added

- `EXPERIMENTAL_Table` motion.

## [9.104.10] - 2020-01-15

### Fixed

- Lint warnings of `EXPERIMENTAL_Table`, `EXPERIMENTAL_useCheckboxTree`, `EXPERIMENTAL_Charts`, `Tooltip`, `AutocompleteInput` and `Conditions`.

## [9.104.9] - 2020-01-15

### Changed

- Return `lastToggledItem` of `EXPERIMENTAL_useCheckboxTree`.

## [9.104.8] - 2020-01-15

### Added

- Disable `EXPERIMENTAL_Table` check all heading when all checkboxes are disabled.

## [9.104.7] - 2020-01-13

### Fixed

- `EXPERIMENTAL_Table` toolbar responsiveness on small screens.

## [9.104.6] - 2020-01-13

### Fixed

- `Table` toolbar's searchInput width on mobile.

## [9.104.5] - 2020-01-09

### Fixed

- Rendering problems due to dynamic key generation on `EXPERIMENTAL_Table`.

## [9.104.4] - 2020-01-09

### Changed

- Update eslint dependencies versions and fix new issues.

## [9.104.3] - 2020-01-08

### Fixed

- `EXPERIMENTAL_useCheckboxTree` hooks dependencies.

## [9.104.2] - 2020-01-08

### Added

- Last toggled item into `EXPERIMENTAL_useCheckboxTree` to be sent as param to `onToggle` function

## [9.104.1] - 2020-01-08

### Fixed

- `EXPERIMENTAL_useCheckboxTree` using stale values in `toggleAll` function.

## [9.104.0] - 2020-01-07

### Added

- Possibility to pass some `Box` props via the `Layout` component.

## [9.103.6] - 2020-01-07

### Fixed

- **Table** height calculation now gets scrollbar hight compensation from `virtualized` callback.

### Changed

- Default sized form elements text size to `t-body`.

## [9.103.4] - 2019-12-20

### Added

- `isDisabled` and `setChecked` functions to `EXPERIMENTAL_useCheckboxTree`

## [9.103.3] - 2019-12-20

### Changed

- columns shape of `EXPERIMENTAL_Table`.

## [9.103.2] - 2019-12-20

### Removed

- `key` that was used as prop in **AutocompleteInput**.

## [9.103.1] - 2019-12-20

### Fixed

- PropTypes in `Progress` and `Radio` components.

## [9.103.0] - 2019-12-19

### Added

- `BubbleChart` to `EXPERIMENTAL_Charts`

## [9.102.0] - 2019-12-19

### Changed

- `totalizers` prop in `Table` component.

## [9.101.0] - 2019-12-18

### Added

- `Totalizer` prop `horizontalLayout`.

## [9.100.3] - 2019-12-18

### Fixed

- `Totalizer` margin with table within the `Table` component.

## [9.100.2] - 2019-12-17

### Changed

- Deprecate `UNSAFE_CustomInput` in favor of using `AutoCompleteInput` on `EXPERIMENTAL_Table`.

## [9.100.1] - 2019-12-17

### Fixed

- Inconsistencies of the `Totalizer` documentation.

## [9.100.0] - 2019-12-17

### Added

- `inverted` prop to `Totalizer` component.

## [9.99.1] - 2019-12-17

### Fixed

- Typescript problems of version `9.99.0`.

## [9.99.0] - 2019-12-17

### Added

- `ScatterChart` to `EXPERIMENTAL_Charts`

## [9.98.1] - 2019-12-12

### Added

- `EXPERIMENTAL_useTableProportion` hook.

## [9.98.0] - 2019-12-12

### Added

- `mobileScroll` prop to `Totalizer`

## [9.97.5] - 2019-12-11

### Added

- `BarChart` to `EXPERIMENTAL_Charts`

### Fixed

- Missing dependencies in outer `package.json`.

## [9.97.4] - 2019-12-09

### Fixed

- Hooks errors on `EXPERIMENTAL_Table`.

## [9.97.3] - 2019-12-06

### Changed

- Make `BulkActions` of `EXPERIMENTAL_Table` a compound component.

### Fixed

- Default comparator of `useCheckoxesTree`.
- Error on not passing the onToggle function to useCheckboxesTree.

## [9.97.2] - 2019-12-03

### Added

- `hide` prop to allow hiding a LineChart axis
- `type` prop to allow different interpolations of the LineChart
- `tick` prop to allow a customized label on LineChart

### Changed

- `axis` prop to `xAxis` and `yAxis` props on LineChart schema
- default `container` prop to have a `width` and `height` dependent of the screen size
- `schema` to `config` prop.

## [9.97.1] - 2019-12-03

### Added

- `EXPERIMENTAL_useCheckboxTree` hook

### Removed

- `EXPERIMENTAL_useTableBulkActions` hook
- `EXPERIMENTAL_useTableTreeCheckboxes` hook

### Changed

- Unify the Headings of `EXPERIMENTAL_Table` and `EXPERIMENTAL_TableTree`

### Fixed

- Distance of checkboxes on `EXPERIMENTAL_TABLE`

## [9.97.0] - 2019-12-02

### Added

- Page top indicator option to the `Pagination` component

## [9.96.11] - 2019-12-02

### Fixed

- Set color of `EXPERIMENTAL_Table` toolbar buttons to `c-muted-2` when they are disabled.
- Fix the distance of checkboxes, so they are the same on `EXPERIMENTAL_TABLE`

## [9.96.10] - 2019-11-21

### Fixed

- First column width of `EXPERIMENTAL_TableTree` docs.

## [9.96.9] - 2019-11-20

### Fixed

- `checkbox` was not vertically centered when there is no `arrow` in the `EXPERIMENTAL_TableTree`.

## [9.96.8] - 2019-11-19

### Changed

- Show `EXPERIMENTAL_BulkActions` even if no action is set.

## [9.96.7] - 2019-11-18

### Fixed

- Alignment between checkboxes and carets on `EXPERIMENTAL_TableTree`.

### Changed

- Carets size to be smaller on `EXPERIMENTAL_TableTree`.
- EXPERIMENTAL_TableTree collapses on click the first cell.

### Added

- `onRowClick` prop to `EXPERIMENTAL_TableTree`.

## [9.96.6] - 2019-11-13

### Fixed

- `Progress` when line type, renders with width 100%, regardless of your parent's display.

## [9.96.5] - 2019-11-13

### Fixed

- **Table** toolbar had a <form> wrapping it, but the wanted behaviour should not be of a form with submit.

## [9.96.4] - 2019-11-12

### Changed

- `LineChart` to `EXPERIMENTAL_Charts`.

## [9.96.3] - 2019-11-12

- Names of `cellRender` and `headerRender` in favor of `cellRenderer` and `headerRenderer` on `EXPERIMENTAL_Table`.

### Removed

- `hidden` prop from `Column`.

## [9.96.2] - 2019-11-11

### Changed

- Description for the **Table**'s `dynamicRowHeight` property.
- `LineChart` component.

## [9.96.1] - 2019-11-08

### Added

- **Tabs** possibility of importing `Tab` directly from the lib folder instead of from 'Tabs/Tab'.

## [9.96.0] - 2019-11-07

### Added

- `updateCellMeasurements` function in **Table** to be used in `cellRenderer` in order to update cell size programatically

## [9.95.0] - 2019-11-07

### Added

- `Progress` component

## [9.94.2] - 2019-11-07

### Fixed

- Extra margin from last Radio in the RadioGroup list.

## [9.94.0] - 2019-11-07

### Fixed

- **Table** stale height on first render when using `dynamicRowHeight`.

## [9.93.0] - 2019-11-07

### Changed

- **Table** Deselect all lines when clearing the input search if there are bulk actions.

## [9.92.0] - 2019-11-07

### Added

- `title` prop for `Box` component

## [9.91.6] - 2019-11-06

### Fixed

- `EXPERIMENTAL_TableTree` shows arrow with empty `nodesKey`.

## [9.91.5] - 2019-11-06

### Added

- `comparator` function to `EXPERIMENTAL_Table` and `EXPERIMENTAL_TableTree`.

## [9.91.4] - 2019-11-05

### Added

- isLoading prop to InputButton component.

## [9.91.3] - 2019-10-31

### Fixed

- `EXPERIMENTAL_Table` toolbar's alignment

## [9.91.2] - 2019-10-31

### Fixed

- `Tooltip` not working with SSR

## [9.91.1] - 2019-10-31

### Fixed

- **Table** warning whenever some line's checkbox was selected
- `InputButton` component.

## [9.90.8] - 2019-10-30

### Added

- `useTableMeasures` hook

### Changed

- Remove contexts from `EXPERIMENTAL_Table` and `EXPERIMENTAL_TableTree`
- `useTableState` is now deprecated

### Added

- `ButtonPlain` component.

## [9.90.7] - 2019-10-29

### Added

- **Table** `onRowHover` optional prop.

### Fixed

- **Table** selectAll and allRowsSelected required warnings. These props are actually optional.

## [9.90.5] - 2019-10-28

### Added

- New component `Selectable Card`.

## [9.90.4] - 2019-10-25

### Added

- **NumericStepper** `readOnly` prop.

## [9.90.3] - 2019-10-25

### Fixed

- `Button` labels vertical align.

## [9.90.2] - 2019-10-24

### Fixed

- **FilterBar** `submitFilterLable` and `newFilterLable` prop names typos.

## [9.90.1] - 2019-10-24

### Added

- `w-100` style on `TopBar` title className from `Modal` component.
- `arrowAlign` prop on `Collapsible` to allow icon position selection.

## [9.90.0] - 2019-10-24

- **Conditions** `group` property to contract. This allows conditions subject to be grouped by the given string value.
- **Select** grouping options documentation.

## [9.89.0] - 2019-10-24

### Added

- vtex-tachyons mention in non-io docs

## [9.88.5] - 2019-10-18

### Fixed

- **Table** SSR errors

## [9.88.4] - 2019-10-18

### Fixed

- **FilterBar** `VerbAtom` behavior when there is only one verb option to show a `span` tag instead of a `Select`.

## [9.88.3] - 2019-10-17

### Fixed

- **Select** `defaultValue` warning when receiving an array of options.

## [9.88.2] - 2019-10-16

### Fixed

- **FilterBar** `statement` must be an empty array in `defaultProps`.

## [9.88.1] - 2019-10-16

### Fixed

- Table tree not rendering if checkboxes are not allowed

## [9.88.0] - 2019-10-15

### Added

- `Fixed` option to bulk actions for a sticky behaviour

## [9.87.3] - 2019-10-14

### Added

- Added `FilterBar` to `EXPERIMENTAL_Table` and `EXPERIMENTAL_TableTree`.

## [9.86.4] - 2019-10-08

### Added

- Export for `EXPERIMENTAL_useTableTreeCheckboxes`.

### Changed

- Allow `EXPERIMENTAL_TableTree` to use pagination.

## [9.86.3] - 2019-10-07

### Added

- Checkboxes to `EXPERIMENTAL_TableTree`

### Changed

- Separate `EXPERIMENTAL_Table`'s BulkContext from TableContext

## [9.86.2] - 2019-10-04

### Fixed

- Fix problem with responsive spaces on alert component

## [9.86.1] - 2019-10-03

### Fixed

- Label PropTypes of `Input`, `TextArea` and `Toggle`.
- Value PropType of `Input`.
- `Button` hover state in collapsed tertiary buttons

## [9.86.0] - 2019-10-03

### Fixed

- removing auto modal width
- **Conditions** `isRtl` prop was not working after refactor.

### Added

- example of modal with table
- `Box`: added title prop
- Workspace link reminder in pull request template

## [9.85.0] - 2019-10-03

### Added

- `data-testid` attribute for testing purposes on `Input`, `Dropdown`, `EmptyState`, `Button` & `PageBlock`

## [9.84.0] - 2019-10-01

### Added

- Option for dynamic row heights in table.

## [9.83.1] - 2019-10-01

### Added

- `BulkActions` to `EXPERIMENTAL_TableV2`

## [9.83.0] - 2019-10-01

### Fixed

- `InputSearch` update component style with figma's design.
- `Input` add `onMouseEnter` and `onMouseLeave` events support.

## [9.82.0] - 2019-10-01

### Added

- New component to split elements.

## [9.81.4] - 2019-09-26

### Fixed

- `EXPERIMENTAL_Table`'s `ButtonNewLine` style.

### Changed

- **Filters**: little style corrections and design improvements.

## [9.81.3] - 2019-09-26

### Fixed

- `Input`'s placeholder style.

## [9.81.2] - 2019-09-26

### Removed

- Multiselect documentation (deprecated).

## [9.81.1] - 2019-09-26

### Fixed

- Designing documentation.

## [9.81.0] - 2019-09-25

### Added

- Preferential sort order to a sortable table column, which can be used to set the first sort order when sorting is set. Defaults to `ASC`, which is the previous behaviour.

## [9.80.4] - 2019-09-24

### Fixed

- `withForwardedRef` propType

## [9.80.3] - 2019-09-24

- `LineActions` to `EXPERIMENTAL_TableV2`

## [9.80.2] - 2019-09-24

### CHANGED

- `EXPERIMENTAL_Table` to be clickable

## [9.80.1] - 2019-09-23

### Added

- `EXPERIMENTAL_TableTree` component

### Removed

- `EXPERIMENTAL_Table` ability to deal with child rows

## [9.80.0] - 2019-09-20

### Added

- **AutocompleteInput** component.

## [9.79.4] - 2019-09-19

## [9.79.3] - 2019-09-19

### Fixed

- **RadioGroup** remove unnecessary paddings and margins if `hideBorder` is ON.
- **RadioGroup** updates examples in documentation to encourage usage without borders.

## [9.79.2] - 2019-09-19

### Fixed

- `readOnly` style of `Input`.

## [9.79.1] - 2019-09-17

### Added

- **RadioGroup** `hideBorder` prop to hide group border.

## [9.79.0] - 2019-09-17

## [9.78.12] - 2019-09-17

### Added

- Css class to the vtex toast container

## [9.78.11] - 2019-09-12

### Added

- `EmptyState` to `EXPERIMENTAL_TableV2`

## [9.78.10] - 2019-09-10

### Fixed

- **Tooltip** offset size, default font size and shadow css class.

## [9.78.9] - 2019-09-09

## [9.78.8] - 2019-09-09

### Removed

- `charts` documentation.

## [9.78.7] - 2019-09-06

### Added

- `ButtonColumns` to `EXPERIMENTAL_TableV2`

## [9.78.6] - 2019-09-06

### Fixed

- **MultiSelect** docs.

## [9.78.5] - 2019-09-06

### Fixed

- **PageHeader** `subtitle` was rendering even if there is no prop to render it.

## [9.78.4] - 2019-09-06

### Changed

- **Table** bulk actions doesn't show "Select all" button if the "selectAll" and "AllRowsSelected" parameters are not passed.

## [9.78.3] - 2019-09-05

### Fixed

- **Conditions** `hideOperator` default value was wrong.

## [9.78.2] - 2019-09-05

### Added

- `Loading` to `EXPERIMENTAL_TableV2`

## [9.78.1] - 2019-09-05

- Redeploy to generate lib folder in npm package that broke on last deploy

## [9.78.0] - 2019-09-05

### Fixed

- **Table** with FilterBar example.
- **FilterBar** examples that were broken.
- **Button** variation `tertiary` hover when disabled (there shouldn't be hover if disabled).

### Added

- **Conditions** component. Not EXPERIMENTAL anymore.
- **Statement** refactor so it can be shared between FilterTag and Conditions components.

## [9.77.5] - 2019-09-05

### Fixed

- `Input` disabled background.

## [9.77.4] - 2019-09-04

### Changed

- Move `appearance: none` inline style to class in `Input` component.

### Added

- **Table** allow `isDangerous` style to bulk actions.

## [9.77.3] - 2019-09-04

### Fixed

- Fix `Button` label escaping loading button when the prop `block` exists

## [9.77.2] - 2019-09-03

### Fixed

- Default export of `useTableState` from `EXPERIMENTAL_TableV2`

## [9.77.1] - 2019-09-03

### Fixed

- `tsconfig.json` module resolution to be `node`.

## [9.77.0] - 2019-09-03

### Added

- **Tooltip** component.

## [9.76.1] - 2019-09-02

### Fixed

- Fix release v9.76.0 and get changes from v9.75.3

## [9.76.0] - 2019-08-30

### Fixed

- Fix `Button` label text leaving button when too big (`nowrap` class)
- Potential bug when using more then one `Button` prop related to the label

### Added

- `Button` prop `noWrap`, which allows the button's label not to wrap

## [9.75.3] - 2019-09-02

### Added

- `Pagination` to `EXPERIMENTAL_TableV2`

### Changed

- Export `useTableState` hook from `EXPERIMENTAL_TableV2`

## [9.75.2] - 2019-08-29

## [9.75.1] - 2019-08-29

### Fixed

- Radio circle position to `items-start`

## [9.75.0] - 2019-08-29

### Added

- `InputCustom` to `EXPERIMENTAL_TableV2`

## [9.74.3] - 2019-08-29

### Changed

- `value` prop to be not required in the `Checkbox` component.

## [9.74.2] - 2019-08-29

### Fixed

- Invalid `PropType` for the `positionFixed` prop in `DatePicker` component.

## [9.74.1] - 2019-08-29

### Added

- `nowrap` class to button labels.

## [9.74.0] - 2019-08-29

### Added

- prop `noUpperCase` to `Button`.

## [9.73.16] - 2019-08-28

### Added

- `InputSearch` to `EXPERIMENTAL_TableV2`

## [9.73.15] - 2019-08-28

### Fixed

- Wrong import of `constants` into `Button` at `EXPERIMENTAL_TableV2`

## [9.73.14] - 2019-08-28

### Added

- `ButtonDownload` to `EXPERIMENTAL_TableV2`
- `ButtonUpload` to `EXPERIMENTAL_TableV2`
- `ButtonExtraActions` to `EXPERIMENTAL_TableV2`
- `ButtonNewLine` to `EXPERIMENTAL_TableV2`

## [9.73.13] - 2019-08-27

### Fixed

- Bumps `eslint-utils` dependency to 1.4.1 due to security warnings.

## [9.73.12] - 2019-08-27

### Added

- Nested rows to `EXPERIMENTAL_TableV2`

## [9.73.11] - 2019-08-26

### Fixed

- Add a class to Button component to fix its label alignment when using `href` and `block` props.

## [9.73.10] - 2019-08-23

### Fixed

- Fix mismatched versions of `react-responsive-modal` lib between the two existing package.json files

## [9.73.9] - 2019-08-22

### Fixed

- Make Layout component always have the height of its viewport

## [9.73.8] - 2019-08-22

### Fixed

- **Button** `tertiary` variation hover text color.
- **Button** `tertiary` variation collapsed example.

## [9.73.7] - 2019-08-22

### Fixed

- Toggle click area

## [9.73.6] - 2019-08-22

### Added

- `Toolbar` component to `EXPERIMENTAL_TableV2`
- `ButtonGroup` component to `EXPERIMENTAL_TableV2`
- `ButtonDensity` component to `EXPERIMENTAL_TableV2`
- Allow `EXPERIMENTAL_TableV2` to have multiple densities

## [9.73.5] - 2019-08-21

### Fixed

- Latest release had no `lib` folder

## [9.73.4] - 2019-08-20

### Fixed

- **Dropdown** docs example was not displaying.
- **Dropdown** font size.
- **Input** height was slightly off.

## [9.73.2] - 2019-08-20

### Fixed

- **FloatingActionBar** padding in mobile devices.

## [9.73.1] - 2019-08-19

### Added

- `EXPERIMENTAL_TableV2` component

## [9.73.0] - 2019-08-15

### Changed

- Get changes made at version `v8.73.0`

## [8.73.0] - 2019-08-15

### Added

- **Icon** `Printer`.

## [9.72.8] - 2019-08-15

### Changed

- Get changes made at version `v8.72.8`

## [9.72.7] - 2019-08-13

### Changed

- Get changes made at version `v8.72.7`

## [8.72.8] - 2019-08-15

### Added

- Optional prop `selectedRows` that can control the table selected items

## [8.72.7] - 2019-08-13

### Changed

- `Action Menu` props to accept formatted message texts
- `Page Header` props to accept formatted message texts
- `Pagination` props to accept formatted message texts
- `Table` props to accept formatted message texts
- `Alert` props to accept formatted message texts
- `Menu` props to accept formatted message texts

### Fixed

- Sortable columns title's breaking entirely when using Formatted Message on `Table` component

## [9.72.6] - 2019-08-13

### Changes

- Get changes made at version `v8.72.6`.

## [8.72.6] - 2019-08-13

### Fixed

- Dynamic width for prefixes & suffixes in `<Input />` component

## [9.72.5] - 2019-08-12

### Changes

- Get changes made at version `v8.72.5`.

## [8.72.5] - 2019-08-12

### Changed

- **ActionMenu**: set default `menuWidth` to `292` to make it consistent with `Menu`'s width previous behavior.

### Fixed

- **Menu** uses `width` property instead of always using `DEFAULT_WIDTH`.

## [9.72.4] - 2019-08-09

### Changes

- Get changes made at version `v8.72.4`.

## [8.72.4] - 2019-08-09

### Changes

- Expanded checkbox click area for table row selection

## [9.72.3] - 2019-08-08

### Changed

- Get changes made at version `v8.72.3`.

## [8.72.3] - 2019-08-08

### Changed

- Condition to unset `Button`'s `type` property now doesn't use `iconOnly` prop.

## [9.72.2] - 2019-08-08

### Changes

- Get changes made at version `v8.72.2`.

## [8.72.2] - 2019-08-08

### Fixed

- Proptypes verification of `ButtonGroup`

## [9.72.1] - 2019-08-07

### Changes

- Get changes made at version `v8.72.1`.

## [8.72.1] - 2019-08-07

### Fixed

- Apply same spacing to `Box` in all screen sizes

## [9.72.0] - 2019-08-07

### Changed

- Get changes made at version `v8.72.0`.

## [8.72.0] - 2019-08-02

### Added

- **Icon** `Info`.

## [9.71.0] - 2019-08-01

### Changed

- Get changes made at version `v8.71.0`.

## [8.71.0] - 2019-08-01

### Added

- TypeScript support (made with ❤ by UFCG).

### Changed

- **Box** component now is TypeScript based.

## [9.70.2] - 2019-07-31

### Changed

- Get changes made at version `v8.70.4`

## [8.70.4] - 2019-07-31

### Added

- **Modal** and **ModalDialog** now accept an optional "container" prop which lets the user choose where they are rendered

## [8.70.3] - 2019-07-31

### Fixed

- `Collapsible` arrow position.

## [8.70.2] - 2019-07-31

### Removed

- Animation of the `Collapsible` when it is mounted for the first time.

## [9.70.1] - 2019-07-26

### Changed

- Get changes made at version `v8.70.1`.

## [8.70.1] - 2019-07-26

### Fixed

- **Button** tertiary now correctly collapse (including compensating the border width)

## [9.70.0] - 2019-07-25

### Changed

- Get changes made at version `v8.70.0`.

## [8.70.0] - 2019-07-25

### Added

- **TimePicker** component

## [9.69.0] - 2019-07-25

### Changed

- Get changes made at version `v8.69.0`.

## [8.69.0] - 2019-07-25

### Fixed

- **Table** when search is performed, the selection of itens is removed

## [9.68.1] - 2019-07-23

### Changed

- Get changes made at version `v8.68.1`.

## [8.68.1] - 2019-07-23

### Fixed

- Collapse button is not correctly aligned when the header title is longer than the width in the `Collapsible` component.
  s

## [9.68.0] - 2019-07-23

### Changed

- Get changes made at version `v8.68.0`.

## [8.68.0] - 2019-07-23

### Fixed

- **FloatingActionBar** now has better props shape.

## [9.67.0] - 2019-07-22

### Changed

- Get changes made at version `v8.67.0` & fix version.

## [9.63.1] - 2019-07-22

### Changed

- Get changes made at version `v8.66.1`.

## [9.63.0] - 2019-07-16

### Changed

- Get changes made at version `v8.63.0`.

## [8.67.0] - 2019-07-22

### Added

- Disabled state for upload & download options in `Table` toolbar

## [8.66.1] - 2019-07-22

### Added

- `word-break` css property to the label of the `Radio` component.

## [8.66.0] - 2019-07-18

### Added

- Icons: Bold, Italic, Underline, Ordered List, Unordered List, Text, Image
- Prop `size` in Textarea to normalize label sizes with other types of inputs

## [8.65.0] - 2019-07-17

### Added

- `onCloseTransitionFinish` prop to `ModalDialog`

## [8.64.0] - 2019-07-17

### Added

- **FloatingActionBar** component

## [8.63.0] - 2019-07-16

### Changed

- `vtex-tachyons` major version from `2` to `3`.

### Added

- **Link** Component

## [9.62.1] - 2019-07-11

### Changed

- Get changes made at version `v8.62.1`.

## [8.62.1] - 2019-07-11

### Fixed

- **DatePicker** fix time selection internationalization
- **DatePicker** enable input raw change (keyboard typing changes)

## [9.62.0] - 2019-07-11

### Changed

- Get changes made at version `v8.62.0`.

## [8.62.0] - 2019-07-11

### Added

- Add CODEOWNERS file

## [9.61.0] - 2019-07-11

### Changed

- Get changes made at version `v8.61.0`.
- Get changes made at version `v8.60.4`.

## [8.61.0] - 2019-07-11

### Fixed

- Add padding-top to **Modal** iff without `title` prop

## [8.60.4] - 2019-07-11

### Fixed

- Security vulnerabilities

## [9.60.3] - 2019-07-08

### Changed

- Get changes made at version 'v8.60.3'

## [8.60.3] - 2019-07-08

### Fixed

- Fix `Table` usage breaking automated tests

## [9.60.2] - 2019-07-05

### Changed

- Get changes made at version 'v8.60.2'

## [8.60.2] - 2019-07-05

### Added

- **Totalizers** we created a component with the totalizers used by the table

## [8.60.1] - 2019-07-05

### Added

- Add `showBottomBarBorder` prop to `Modal`

### Fixed

- Fix `Modal` spacing for mobile

## [8.60.0] - 2019-07-04

### Added

- Prop `showTopBar` in `Modal` to make it possible to hide top bar at modal.

## [8.59.0] - 2019-07-04

### Fixed

- **CheckBox** breaks when the label has more than one line.

## [8.58.0] - 2019-07-04

### Fixed

- Hide `Menu`'s scroll bar when its content is not overflowing.

## [8.57.1] - 2019-06-28

### Changed

- Change **NumericStepper** lean mode to use input instead of div

### Added

- Add hover status to **NumericStepper** lean mode

## [8.57.0] - 2019-06-27

### Changed

- **Table** new line button with action replaced by a **ButtonGroup**.

### Removed

- **EXPERIMENTAL_ButtonWithAction** in favor of ButtonGroup.

## [8.56.0] - 2019-06-27

### Added

- **ModalDialog** loading state.

## [8.55.3] - 2019-06-27

### Fixed

- Updates eslint dependency to fix a possible security vulnerability.
- **FilterBar** properly remove filter statement when filterTag clear button is clicked.

## [8.55.2] - 2019-06-26

### Fixed

- **Pagination** was not disabling the previous page button if `currentItemFrom` was zero.

## [8.55.1] - 2019-06-24

### Fixed

- **Colapsible** open/close transition animation when content resizes.

## [9.55.0] - 2019-06-18

### Changed

- Get changes made at version `8.55.0`.

## [8.55.0] - 2019-06-18

### Fixed

- **Table** issue where the top checkbox state was always inverted
- **Table** warnings that happened when using bulk actions

## [9.54.2] - 2019-06-17

### Changed

- Get changes made at version `8.54.2`.

## [8.54.2] - 2019-06-17

### Fixed

- **Table** bulk actions `select all` button now disables all checkboxes so nothing can be unselected
- **Table** deselects bulk action checked lines when paginating.

## [9.54.1] - 2019-06-14

### Changed

- Get changes made at version `8.54.1`.

## [8.54.1] - 2019-06-14

### Added

- **Table** add bulkActions.onChange prop as callback to any selection changes

## [9.54.0] - 2019-06-13

### Changed

- Get changes made at version `8.54.0`.

## [8.54.0] - 2019-06-13

### Fixed

- **PageHeader** warning when using formattedMessage as title.

## [8.53.1] - 2019-06-13

### Fixed

- **Toast** `href` has the correct proptype (i.e. `string`).

### Added

- **Table** bulk actions documentation
- **Checkbox** `label` prop now accepts both string or a node.

## [9.53.0] - 2019-06-13

### Changed

- Get changes made at version `8.53.0`.

## [8.53.0] - 2019-06-13

### Fixed

- **Tab** Repeated keys when using formattedMessage

## [9.52.3] - 2019-06-13

### Changed

- Get changes made at version `8.52.3`.

## [8.52.3] - 2019-06-13

### Fixed

- **Table** `density` changes are now is nativelly considered for rerender and height recalculation.

## [9.52.2] - 2019-06-13

### Changed

- Get changes made at version `8.52.2`.

## [8.52.2] - 2019-06-13

### Added

- **Button** `href` prop, along with `<a>` tag props `target`, `rel`, `referrerPolicy`, `download`.
- **Button** `inverted-tertiary` variation.
- **Toast** Allow a link as a prop, via the `href` option on the action parameter.

### Changed

- `readme` section on two majors release flow.

## [9.52.1] - 2019-06-13

### Changed

- Get changes made at version `8.52.1`.

## [8.52.1] - 2019-06-13

### Fixed

- **Table** `toolbar` default prop to null.

## [9.52.0] - 2019-06-11

### Changed

- Get changes made at version `8.52.0`.

## [8.52.0] - 2019-06-11

### Added

- `IconGrid` and `IconInlineGrid` Components.

## [9.51.3] - 2019-06-11

### Changed

- Get changes made at `8.51.3`.

## [8.51.3] - 2019-06-06

### Fixed

- **NumericStepper** Fixed issue where buttons would submit forms they were children of.

## [8.51.2] - 2019-06-06

### Fixed

- Position of elements in **Alert** to top

## [8.51.1] - 2019-06-06

### Fixed

- Development documentation

## [8.51.0] - 2019-05-29

### Added

- **DatePicker** Add `positionFixed` prop, which fixes issues related to `overflow: hidden`.

## [8.50.1] - 2019-05-28

### Added

- **DatePicker** Add `positionFixed` prop, which fixes issues related to `overflow: hidden`.

### Changed

- Only automatically add `key` prop to `Tabs` children when the prop is not present.

## [8.50.0] - 2019-05-28

### Changed

- **EXPERIMENTAL_Select** now uses the new **Select** component for its atoms.
- **EXPERIMENTAL_Select** horizontal growth to make it simpler to the user.

## [9.49.1] - 2019-05-26

## [9.49.0] - 2019-05-24

### Changed

- Get changes made at `8.49.1`.

## [8.49.1] - 2019-05-26

### Changed

- **ButtonWithIcon** Prop `icon` is not required anymore.

### Changed

- Get changes made at `8.49.0`.

## [8.49.0] - 2019-05-24

### Fixed

- **Spinner** Use CSS animations instead of SVG animations, in order to make the animation work while the page is loading.

### Added

- **EXPERIMENTAL_Select**: `formatCreateLabel` now allows the user to customize the create option message.
- **Textarea**: `resize` property to control the component's resize behaviour. See [resize CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) for more info.

### Changed

- **Button** now uses `b--muted-5` instead of `b--disabled` when it is `disabled`.

### Removed

- **Spinner** prop `status`

## [9.48.1] - 2019-05-24

### Added

- Get changes made at `8.48.1`.

## [8.48.1] - 2019-05-24

### Added

- **Table** schema property `headerRight`.

## [9.48.0] - 2019-05-23

### Added

- Get changes made at `8.48.0`.

## [8.48.0] - 2019-05-23

### Added

- **ButtonGroup** component.

## [8.47.3] - 2019-05-22

### Fixed

- **Table** labels for download & upload buttons.

## [8.47.2] - 2019-05-20

### Fixed

- Added required props to **CheckboxGroup** README

### Removed

- **CheckboxGroup** `Without label group` example

## [8.47.1] - 2019-05-20

### Added

- Optional prop to control `Pagination` number of rows.

## [8.47.0] - 2019-05-20

### Added

## [8.46.3] - 2019-06-11

### Fixed

- **Modal** fixed unexpected behavion on shadows in top bar

## [8.46.2] - 2019-05-16

### Fixed

- **Table** add offset in table content height so the horizontal scroll bar does not overlap its content.

## [8.46.1] - 2019-05-16

### Removed

- Remove ramda dependency and uses lodash instead.

### Changed

- **Table** add a callback to line density change.
- **Table** update docs and examples.

## [8.46.0] - 2019-05-15

### Added

- **Icon** `TableFilter`
- Solid prop to **Icon** `Minus`

## [8.45.2] - 2019-05-13

### Fixed

- ResponsiveFullScreen padding

## [8.45.1] - 2019-05-10

### Fixed

- Unexpected Modal shadow behavior on top and bottom bars

## [8.45.0] - 2019-05-10

### Added

- **FilterOptions** component added to the styleguide.

## [8.44.2] - 2019-05-10

### Fixed

- **Table** resize.

## [8.44.1] - 2019-05-09

## [8.44.0] - 2019-05-09

## [8.43.0] - 2019-05-09

### Added

- **Collapsible** now receives a props containing a color name for its caret icon.

## [8.42.0] - 2019-05-09

### Added

- BottomBar and TopBar to **_Modal_**
- ResponsiveFullScreen to **_Modal_**

### Changed

- **_Modal_** scroll to be inside the Modal component

## [8.41.0] - 2019-05-07

### Fixed

- **Collapsible** default focus outline removed for non-keyboard users.

## [8.40.1] - 2019-05-07

### Added

- Remove hover on tertiary buttons which have `collapsedLeft` or `collapsedRight` props set.

## [8.40.0] - 2019-05-03

### Added

- **CheckboxGroup** added to the styleguide.

### Fixed

- Fix some component pages references not working properly.

## [8.39.1] - 2019-05-03

### Fixed

- **Collapsible** not open on first render with `isOpen` set to true.

## [8.39.0] - 2019-05-03

### Added

- **Toggle** added `name` and pass it down to `input`.

## [8.38.0] - 2019-04-30

### Added

- **ProgressBar** added to the styleguide.

## [8.37.1] - 2019-04-24

### Fixed

- **Tabs** fix partial width content.

## [8.37.0] - 2019-04-18

### Added

- **CheckPartial** icon for new partial state in Checkbox.

## [8.36.2] - 2019-04-18

### Fixed

- Fix `withForwardedRef` type, remove oneOfType usage.

## [8.36.1] - 2019-04-18

### Changed

- **Table**: `Toolbar` without the search input now aligns to the right.

## [8.36.0] - 2019-04-17

### Added

- **EXPERIMENTAL_ButtonWithAction** new component in _EXPERIMENTAL_ mode.

## [8.35.1] - 2019-04-16

### Fixed

- **FilterBar** fix filterExtraOptions logic for "More Filters" option
- **FilterBar** auto-select first verb for filter statements
- **FilterBar** make Popover Menu style compatible with Figma
- **FilterBar** fix checkbox examples clickbox
- **FilterBar** use Select instead of Dropdown in subject filter statement
- **FilterBar** add lable props for fix texts

### Added

- **Experimental_SELECT** add `clearable` prop.

## [8.35.0] - 2019-04-16

### Added

- **Table** added disabled state to `newLine` toolbar prop.

## [8.34.0] - 2019-04-15

### Added

- **Tabs** added _sticky_ property.

## [8.33.0] - 2019-04-11

### Added

- **Table** new emptyStateChildren prop.
- **Table** custom empty state example.

### Fixed

- **Table** height behavior.

## [8.32.0] - 2019-04-11

### Added

- **Tabs** added _small_, _regular_ and _large_ sizes.

## [8.31.0] - 2019-04-11

### Added

- **Box** added a new noPadding prop.

## [8.30.2] - 2019-04-10

### Changed

- **Pagination** `Button` to `ButtonWithIcon`

## [8.30.1] - 2019-04-10

### Fixed

- **Toggle** Set checkbox input parent's position to relative.

## [8.30.0] - 2019-04-10

### Added

- **Collapsible** new component!

## [8.29.1] - 2019-04-08

### Fixed

- **DatePicker** input now respects parent width instead of allways being 199px wide.

### Added

- **EXPERIMENTAL_Filter** as Experimental component.
- **EXPERIMENTAL_Conditions** add `onChangeObjectCallback` prop so it can be passed to the object atom as a callback.
- **Table** add FilterBar option in toolbar and example with FilterBar.

## [8.29.0] - 2019-04-08

### Added

- **DatePicker** props:
  - `limitMonthNavigation`, for preventing users from navigating to months that are not inside the specified date range;
  - `maxTime` and `minTime`, for setting a time range.

## [8.28.0] - 2019-04-04

### Added

- **Experimental_SELECT** `valuesMaxHeight` props added, giving the user an option to deal with a lot of selected values.

## [8.27.5] - 2019-04-04

### Fixed

- **DatePicker** Disable `hide` modifier to prevent warnings.

## [8.27.4] - 2019-04-04

### Fixed

- Fixed **Table** pagination when total items was not a multiple of rows length.

## [8.27.3] - 2019-04-03

### Fixed

- Fixed error caused by `instanceof` `null` on `withFowardedRef` module.

## [8.27.2] - 2019-04-03

### Fixed

- **DatePicker** Overflow issues.

## [8.27.0] - 2019-03-27

### Added

- **DatePicker** `align` and `direction` props, giving users more control over the popper position.

## [8.26.0] - 2019-03-25

### Added

- **EXPERIMENTAL_Conditions** statement now provides _ref_ to its atoms components (Subject, Verb and Object).

## [8.25.1] - 2019-03-22

### Fixes

- **Alert** can now be used with ref.

## [8.25.0] - 2019-03-22

### Added

- **Toast** Export `ToastContext` to use the `useContext` Hook.

### Changed

- **Toast** Use the `ToastManager` as HOC to provide the toast state as it changes.

## [8.24.3] - 2019-03-18

### Fixed

- Reusing code.

## [8.24.2] - 2019-03-18

### Fixed

- **PageHeader** fixed behavior of subtitle misplacement when without children.

## [8.24.1] - 2019-03-18

### Fixed

- Fix `ref` prop in InputCurrency.

## [8.24.0] - 2019-03-18

### Added

- **PageHeader** added a new subtitle prop.

### Fixed

- Fix prop types of forwarded `ref`.

## [8.23.3] - 2019-03-14

### Fixed

- **Select** can now be used with ref now.

## [8.23.2] - 2019-03-14

### Fixed

- **DatePicker** can be used with ref now.

## [8.23.1] - 2019-03-14

### Fixed

- **Table** Toolbar extra options button was using deprecated ActionMenu props.

## [8.23.0] - 2019-03-13

### Added

- **Table** `lineActions` prop to add a new column with an **ActionMenu**-like component used to execute actions for each line.

## [8.22.1] - 2019-03-01

### Fixed

- **ActionMenu** `icon` prop compatibility bug.

### Changed

- **Toast** ToastProvider HOC architecture reverted. Using ref again.

## [8.22.0] - 2019-03-01

### Added

- **Toast** now can be undismissable by the user.

### Changed

- **Toast** `ToastManager` is now a HOC. There is no need to use ref inside `ToastProvider`.

### Fixed

- npm build

## [8.21.2] - 2019-03-01

## [8.21.1] - 2019-02-28

### Changed

- **Tabs** increase horizontal padding

## [8.21.0] - 2019-02-28

### Fixed

- **ActionMenu** unwanted behavior, where the menu would be cropped when inside other components that use `overflow: hidden`.

### Changed

- **ActionMenu** now uses the `ButtonWithIcon` component. As a result, the `icon` prop should now be passed within the `buttonProps` prop. This makes the `icon` prop now _deprecated_.

### Deprecated

- **ActionMenu** deprecates `icon` prop of in favor of `buttonProps` since now it's using the **ButtonWithIcon** component.

## [8.20.2] - 2019-02-28

### Fixed

- **Table** toolbar buttons alignment.
- **Table** uses hints in favor of button labels in toolbar buttons.

## [8.20.1] - 2019-02-28

## [8.20.1-beta] - 2019-02-28

### Added

- **Tabs** `disabled` prop

## [8.20.0] - 2019-02-28

### Added

- **Table** `totalizers` property.

## [8.19.5] - 2019-02-27

### Fixed

- **Table** paginated example.

## [8.19.4] - 2019-02-22

### Fixed

- **ColorPicker** require prop `colorHistory`.
- **ColorPicker** always show the correct hex value.

## [8.19.3] - 2019-02-21

### Fixed

- Adds favicon URL to styleguidist build configs.

## [8.19.2] - 2019-02-20

## [8.19.1] - 2019-02-20

## [8.19.0] - 2019-02-20

### Added

- **Tag** `low` new variation prop, now tags may have borders.

## [8.18.3] - 2019-02-18

### Fixed

- **EXPERIMENTAL_Select** fix focus behaviour when typing in the search input.

## [8.18.2] - 2019-02-15

### Fixed

- Wrong prop types

## [8.18.1] - 2019-02-15

### Fixed

- Fix ref forwarding for the following components:
  - **Button**
  - **ButtonWithIcon**
  - **Dropdown**
  - **Input**
  - **InputCurrency**
  - **InputPassword**
  - **InputSearch**

## [8.18.0] - 2019-02-15

### Added

- **ColorPicker** component.

## [8.17.8] - 2019-02-11

### Added

- **Table** `isLoading` prop for toolbar buttons

## [8.17.7] - 2019-02-08

## [8.17.6] - 2019-02-08

### Fixed

- **Dropdown** select position and height in Windows Chrome was preventing click action on bottom part of Dropdown.
- **Input** hide Input decorations in Internet Explorer and MS Edge.
- **NumericStepper** hide Input decorations in Internet Explorer and MS Edge.
- **Button** remove height 100% from block prop.
- **Pagination** align Rows quantity selector label in center in Internet Explorer and MS Edge.

## [8.17.5] - 2019-02-07

### Changed

- **Checkbox** `label` un-require prop

## [8.17.4] - 2019-02-07

### Removed

- **Checkbox** `margin-bottom`

## [8.17.3] - 2019-02-04

### Fixed

- **EXPERIMENTAL_Select** fixed lost of focus behaviour when props were updated.
- **PageLayout** now occupies all available width (even without using fullWidth)

## [8.17.2] - 2019-02-01

## [8.17.2-beta] - 2019-02-01

## [8.17.1] - 2019-02-01

### Changed

- **Box**, **Layout**, **PageBlock**, **Header** mobile styles

## [8.17.0] - 2019-02-01

### Added

- **Table** `minWidth` key for schema

## [8.16.0] - 2019-01-31

### Added

- **Spinner** `status` prop to start & stop the animation.

## [8.15.2] - 2019-01-30

### Fixed

- **EXPERIMENTAL_Conditions** object empty validation to allow `false` values
  and to disallow `[]` (empty array) values.

## [8.15.1] - 2019-01-29

### Fixed

- **InputCurrency** `onChange` callback was using the formatted value instead of
  the actual float value.

## [8.15.0] - 2019-01-29

### Added

- **InputCurrency** New component designed for monetary input values.

## [8.14.0] - 2019-01-28

### Added

- **`EXPERIMENTAL_Select`** New component.
- **`Clear`** New Icon.

### Deprecated

- Deprecates `MultiSelect` in favor of `Select`

## [8.13.0] - 2019-01-17

### Added

- **`Toast`** Add `horizontalPosition` to `showToast` options.

## [8.12.0] - 2019-01-17

### Added

- **Dropdown** `variation` prop

## [8.11.3] - 2019-01-17

### Fixed

- **Button** when using block prop and small size, button height was smaller than it was supposed to be.
- **Table** Align toolbar buttons and use ButtonWithIcon instead of Button.

## [8.11.2] - 2019-01-16

### Added

- **Conditions** Add the `subjectPlaceholder` prop to control the placeholder
  of the subject atom dropdown.

### Changed

- **Conditions** Remove `flex-auto` from the subject and verb atoms.
- **Conditions** Automatically select first verb when changing a subject.

## [8.11.1] - 2019-01-16

### Changed

- **Conditions** Modify object atom prop to allow developers to pass extra
  parameters to the render function. Now instead of passing a `function` to the
  object prop you need to pass an `object` with the following structure:

  ```js
  const options = {
    ...
    verbs: [
      {
        ...
        object: {
          renderFn: foo,
          extraParams: {
            a: 1,
            b: 2,
            ...
          }
        }
      },
    ]
  }
  ```

  The extraParams property will be available in your render function as a
  parameter like the example below:

  ```js
  foo = ({ statements, values, statementIndex, error, extraParams }) => {
    // here goes the render logic of you object component
  }
  ```

## [8.11.0] - 2019-01-11

### Added

- **PageBlock** `titleAside` prop for side header content

## [8.10.5] - 2019-01-10

### Fixed

- Fixed Dropdown label adding a stray margin at the top of the component.
- Fixed Radio getting squished on small sizes.

### Changed

- `react` & `react-dom` version to `16.7.0`

## [8.10.4] - 2019-01-09

### Fixed

- **Toast** Pass event parameter to onClick

## [8.10.3] - 2019-01-08

### Fix

- Fix #458 by adding postinstall script to run the install dependencies for the
  `react/` folder after installing dependencies for the `root` folder.

## [8.10.2] - 2019-01-08

### Added

- **Table** loading prop, holding the table size.

## [8.10.1] - 2019-01-07

### Changed

- **Toast** Allow single line toast on small screens if the message is short enough.

## [8.10.0] - 2019-01-07

### Added

- **ActionMenu** component

### Changed

- **InputPassword** Use monospaced font to prevent the width from shifting.

### Fixed

- **Input** Fixed `token` prop which was not working.
- **Button** Fix layout on linebreak.

## [8.9.1] - 2019-01-02

### Changed

- **Layout** full height control

## [8.9.0] - 2018-12-28

### Added

- **ButtonWithIcon** New component

### Deprecated

- **Button** `icon` prop was deprecated in favor of the `ButtonWithIcon` component

## [8.8.1] - 2018-12-28

### Added

- **Conditions** new experimental component to filter data based on statements.

## [8.7.4] - 2018-12-27

- **DatePicker** Disable keyboard interaction until date-fns `parse` function
  support localized date strings (https://github.com/date-fns/date-fns/issues/896)

### Fixed

- **Input** Fix styles for disabled and read-only states.

## [8.7.3] - 2018-12-21

### Fixed

- **Dropdown** Size was corrected to follow the standards

## [8.7.2] - 2018-12-20

- Reverting v8.7.1. The implemented solution for the `yarn install` problem was
  causing some build problems due to missing dependencies (probably caused by
  the changes to `package.json`)

## [8.7.1] - 2018-12-20

### Fixed

- Fix wrong `yarn install` behaviour mentioned in #458

## [8.7.0] - 2018-12-20

### Changed

- **Button** Tertiary variations now change background on hover

### Added

- **Table** Prop `fullWidth` for a 100% width table and all colunms equal.

## [8.6.2] - 2018-12-18

### Fixed

- **Layout** Prevent the Layout component from not filling the whole height of the page

## [8.6.0] - 2018-12-18

### Added

- **Tab** Add different class names for selected and unselected states

## [8.5.0] - 2018-12-18

### Added

- **DatePicker** new component to select a Date and Time.

## [8.4.4] - 2018-12-18

### Fixed

- **PageBlock** file export name.

## [8.4.3] - 2018-12-17

### Fixed

- Fix typo on `/docs/styles/breakpoints.md`
- **PageBlock** export.

## [8.4.2] - 2018-12-14

### Fixed

- Fixed bug where Tabs component would crash if it had a single Tab

## [8.4.1] - 2018-12-14

### Fixed

- **Layout** Fix fullWidth prop.

## [8.4.0] - 2018-12-14

### Added

- **Layout** new component to establish layout standards in our Admin pages.

## [8.3.0] - 2018-12-13

### Fixed

- **Toast** Increase z-index to the max.

### Added

- **PageBlock** new component for organizing the blocks that make up our Admin pages.
- **Table** Add `title` as param to headerRenderer callback declared in schema to customize header cell

## [8.2.0] - 2018-12-06

### Added

- **Button** Add `collapseLeft` and `collapseRight` props, to cancel out paddings

### Fixed

- **Dropdown** add missing border on disabled state

### Changed

- Renamed **PasswordInput** to **InputPassword**, to make it consistent with InputSearch

### Deprecated

- Deprecates `PasswordInput` in favor of `InputPassword`

## [8.1.0] - 2018-12-03

### Added

- **Table** add `emptyStateLabel` prop to use in EmptyState when there is nothing to show
- **Table** add `fixFirstColumn` prop to enhance the multiple column horizontal scroll experience
- **Toggle** Added size `large`
- Added size `small` to the following components: `Input`, `InputSearch`, `PasswordInput`, `Dropdown`, and `NumericStepper`

### Changed

- **Table** Use color tokens on the Table Toolbar
- **[BREAKING]** **PageHeader** background set to transparent
- **[BREAKING]** **Table** Now width in schema properties is absolute (mirroring react pattern in style obj)
- **[BREAKING]** **Toggle** Decreased the default size
- **[BREAKING]** Use typography tokens instead of font-scale classes
- **[BREAKING]** Changed the rendered sizes of the following form components: `Dropdown`, `Pagination`, `Input`, `InputSearch`, `PasswordInput`, `Button`, `Toggle`, and `NumericStepper`. This might only affect you if your layouts are pixel-perfect. In that case, verify if the components are properly aligned.

### Deprecated

- Deprecated `x-large` size from all components (`Dropdown`, `Input`, `InputSearch`, `PasswordInput`, and `NumericStepper`)
- **Badge** renamed component to Tag (still compatible with former usage, only deprecation alert)

### Removed

- **[BREAKING]** **Toggle** Removed size `small`
- **[BREAKING]** **Table** Remove `indexColumnLabel` prop, index column is no longer a native feature
- **[BREAKING]** **Table** Remove `onRowMouseOver` prop
- **[BREAKING]** **Table** Remove `onRowMouseOut` prop

## [7.6.6] - 2018-11-21

## [7.6.5] - 2018-11-21

### Fixed

- **Button** Add `danger-tertiary` to Button variation propTypes, to stop React warning

## [7.6.4] - 2018-11-19

### Fixed

- **Toggle** Fixes styling when it's `semantic` and `disabled` simultaneously

## [7.6.3] - 2018-11-14

### Added

- **Toast** Export toast HOC to allow VTEX IO usage

## [7.6.2] - 2018-11-14

## [7.6.1] - 2018-11-14

### Added

- **Button** Add "danger tertiary" Button variation

## [7.6.0] - 2018-11-09

### Added

- **Toast** Add Toast higher order component

## [7.5.7] - 2018-11-09

### Fixed

- **PageHeader** using `flex-wrap` to fix layout on small screens
- Revert ToastMessage, fixing a bug where children of ToastProvider would not update

## [7.5.6] - 2018-11-08

## [7.5.5] - 2018-11-08

### Added

- **Toast** Create ToastMessage passed on ToastConsumer to immediately allow to use toast

## [7.5.4] - 2018-11-07

## [7.5.3] - 2018-11-07

## [7.5.2] - 2018-11-07

### Fixed

- **Spinner** Fixed bug where the spinner wasn't animating while the page was loading.

## [7.5.1] - 2018-11-07

### Added

- **CSS** file support

- **Icon** add OptionsDots icon

## [7.5.0] - 2018-11-06

### Added

- **NumericStepper** Add lean mode

## [7.4.1] - 2018-11-06

## [7.4.0] - 2018-11-01

### Changed

- **Input** `prefix` prop now accepts any element
- **Input** `suffixIcon` prop to `suffix`. `suffixIcon` has been deprecated.

## [7.3.5] - 2018-10-15

### Added

- **Toast** Add duration argument to `showToast`

### Changed

- **Toast** Increase Toast duration if it has an action

## [7.3.4] - 2018-10-15

## [7.3.3] - 2018-10-11

### Added

- **Table** `density` prop
- **Table** `toolbar.density` prop to have native control via toolbar of Table content density

## [7.3.2] - 2018-10-11

### Changed

- **Styleguidist** Version to latest

## [7.3.1] - 2018-10-11

## [7.3.0] - 2018-10-11

### Added

- **Badge** `onClick` prop

## [7.2.0] - 2018-10-11

### Added

- **ModalDialog**

## [7.1.3] - 2018-10-11

### Fixed

- **Textarea** Border style error state
- **Input** Update color token of prefix & suffix to match Figma version

### Added

- **Toast** Added `positioning` prop to `ToastProvider` to position toasts based either on the parent element dimensions, or window dimensions.

## [7.1.2] - 2018-10-08

### Fixed

- Demo files

## [7.1.1] - 2018-10-04

### Added

- `IconBars`, `IconUser` and `IconShoppingCart` components

## [7.1.0] - 2018-10-03

### Changed

- **PageHeader** Side buttons changed to `children`

## [7.0.0] - 2018-10-03

### Added

- **Icon** add columns icon
- **InputSearch** add `onClear` callback as prop
- **Pagination** control state of selected rows quantity dropdown
- **Table** add `containerHeight` prop to enhance Table height control
- **Table** add `pagination` prop to make it easier to use Table and Pagination together
- **Table** add `toolbar` prop with actions and search features possibility

### Changed

- **[BREAKING]** **Table** Remove `indexColumn` prop. `indexColumnLabel` alone now activates the feature
- **[BREAKING]** **Table** Remove `containerClass` prop

### Fixed

- **Pagination** change button styles to secondary to match rows dropdown weight

## [6.4.4] - 2018-10-01

### Added

- **Icons** Fix plus icon svg.
- Improves styles of Multiselect

### Fixed

- **NumericStepper** Refrains from using the label tag if there is no label, to prevent the keyboard from popping up on iOS unnecessarily
- Disable host checking on dev server in order to make it publicly accessible

## [6.4.3] - 2018-09-28

### Added

- **Tabs** Added new classes to elements

### Fixed

- **EmptyState** Remove border

## [6.4.2] - 2018-09-28

### Fixed

- Fixed Toast export for render

## [6.4.1] - 2018-09-27

### Fixed

- Exports ToastProvider, ToastConsumer, and IconPlusLines to render

## [6.4.0] - 2018-09-27

### Added

- **Icons** Add plus outline version and PlusLines, another plus icon without a circle around it.
- **MultiSelect** New component
- **PasswordInput** New component
- **Toast** New component

### Fixed

- Removed extra iOS styiling from inputs
- **Icons** Fix plus icon svg.

## [6.3.2] - 2018-09-13

### Added

- **Table** Sortable columns with opinionated style for clickable Headers.

## [6.3.1] - 2018-09-12

### Fixed

- Execute `yarn install` to fix wrong dependencies.

## [6.3.0] - 2018-09-12

### Added

- **Slider** New component

## [6.2.0] - 2018-09-06

## [6.2.0] - 2018-09-06

### Added

- **Box** New component

## [6.1.5] - 2018-09-06

### Fixed

- **Alert** styles

## [6.1.4] - 2018-09-06

### Added

- **Textarea** character countdown when maxLength is defined

## [6.1.3] - 2018-08-29

### Fixed

- **Input** fix propType of ref
- **Dropdown** fix propType of ref

## [6.1.2] - 2018-08-28

### Fixed

- **Icons** block prop was sometimes not applied when icons had a `solid` variation

## [6.1.1] - 2018-08-27

### Added

- **Table** Enhance schema examples in README documentation

## [6.1.0] - 2018-08-24

### Added

- **InputSearch** component

### Fixed

- **Button** component should be disabled while loading

## [6.0.1] - 2018-08-23

### Fixed

- **Dropdown** forward ref to select
- **Pagination** Next button disabled

## [6.0.0] - 2018-08-23

### Added

- **Badge** add prop `type`
- **Spinner** add prop `color`
- **Spinner** add default color of `.c-action-primary`

### Changed

- **[BREAKING]** **Alert** Remove default value of `type` prop
- **[BREAKING]** **Alert** Remove value `info` from `type` prop
- **[BREAKING]** Icons default color is now `currentColor`, which is the current text color
- **[BREAKING]** **Spinner** remove prop `secondary`

### Fixed

- Spinner proptypes

## [5.6.2] - 2018-8-17

## [5.6.1] - 2018-08-17

## [5.6.0] - 2018-08-17

### Added

- **PageHeader** Add action button
- Add CSS classes to all icon components
- Add `block` prop to display icons as block
- `tabindex` to several components
- **Input** `onKeyUp` and `onKeyDown` hooks
- **Input** `groupBottom` prop

## [5.5.1] - 2018-08-13

## [5.5.0] - 2018-08-13

### Added

- **Alert** Add action button

## [5.4.7] - 2018-08-08

### Changed

- **Dropdown** Decrease default label's font size

### Fixed

- **NumericStepper** Fix width on block mode
- **Button** Update spinner size on small buttons and spinner color on the `danger` variation

## [5.4.6] - 2018-08-03

## [5.4.5] - 2018-08-03

## [5.4.4] - 2018-08-02

### Changed

- **Input** Decrease default label's font size

### Fixed

- `maxLength` propType in `Input` component

## [5.4.3] - 2018-07-27

## [5.4.2] - 2018-07-26

### Added

- `SuffixIcon` to `Input` component.

## [5.4.1] - 2018-07-20

### Changed

- **Tabs** border color

## [5.4.0] - 2018-07-20

### Added

- **Pagination**

## [5.3.3] - 2018-07-18

### Fixed

- **Dropdown** Works with `null`/`undefined` values

## [5.3.2] - 2018-07-17

### Changed

- **Radio** Change its size, making it smaller

## [5.3.1] - 2018-7-17

### Changed

- Disable script to update `manifest.json` temporarily

## [5.3.0] - 2018-07-17

### Added

- **NumericStepper** Create component

## [5.2.3] - 2018-07-05

### Changed

- **PageHeader** prop `linkClick` to `onLinkClick`

### Fixed

- **PageHeader** Exports component

## [5.2.2] - 2018-07-05

### Changed

- **Input** Added default value `text` for attribute `type`

## [5.2.1] - 2018-07-04

### Changed

- **PageHeader** Styles & readme adujsts

## [5.2.0] - 2018-07-04

### Added

- **PageHeader**

### Changed

- Modal's `z-index` to appear above the topbar

## [5.1.0] - 2018-07-03

### Added

- **Toggle** Add `helpText` prop

### Fixed

- **Textarea** Add `value` and `defaultValue` props to enable control

### Changed

- **Input** Ref now points to the input element itself
- **Tabs** add `fullWidth` display

## [5.0.1] - 2018-6-25

### Changed

- Export the `Tab` component to render

## [5.0.0] - 2018-6-25

### Changed

- **[BREAKING] Tabs** Group tabs in a single component

## [4.3.5] - 2018-6-21

### Fixed

- **Alert** wrap icon in a div to always maintain its size

## [4.3.4] - 2018-6-20

### Added

- **Table** Create Table component

## [4.3.3] - 2018-6-19

### Fixed

- **RadioGroup** add onChange mock function to examples
- **Toggle** replace `min-width` with `minWidth` - Issue #163

## [4.3.2] - 2018-06-18

### Changed

- **Modal** Add `closeOnEsc` and `closeOnOverlayClick` props

## [4.3.1] - 2018-06-15

### Changed

- Export the following components to render: `EmptyState`, `IconArrowBack`, `IconArrowDown`, `IconArrowUp`, `IconCaretDown`, `IconCaretUp`, `IconClock`, `IconCog`, `IconCopy`, `IconDelete`, `IconExternalLink`, `IconExternalLinkMini`, `IconFilter`, `IconHelp`, `IconLink`, `IconSave`, `Tabs`,

## [4.3.0] - 2018-06-15

### Added

- **RadioGroup** Create RadioGroup component

### Changed

- **CaretLeft** Export CaretLeft component as an app to render.
- **CaretRight** Export CaretRight component as an app to render.
- **Toggle** Decrease the width and adjust the animation.
- **Spinner** Update animation
- **Icon** Updated documentation
- **Radio** Add blue border on checked radio buttons
- **Checkbox** Add animation on toggle

## [4.2.1] - 2018-06-14

### Fixed

- **Checkbox** Export Checkbox component as an app to render.

## [4.2.0] - 2018-06-12

### Fixed

- **Radio** Make the entire container clickable instead of just the label and the radio button itself

### Changed

- **Radio** Change label proptype from `string` to `node`
- **Radio** Add animation on toggle
- **Spinner** Add round linecap and make it spin a little faster

## [4.1.0] - 2018-06-04

### Added

- **Icon** `CaretDown`, `CaretUp`, `CaretLeft`, `CaretRigth`, `Clock`, `Cog`, `Copy`, `Delete`, `ExternalLink`, `ExternalLinkMini`, `Filter`, `Help`, `Link`, `Save`

## [4.0.3] - 2018-06-01

### Fixed

- **Toggle** add label disabled style - Issue #136
- **Toggle** add `min-width` - Issue #134
- **Tabs** hover style added - Issue #135

## [4.0.2] - 2018-05-29

### Changed

- **Icon** `BoldCheck` removed

## [4.0.1] - 2018-05-29

- Fix codemod script from v4

## [4.0.0] - 2018-05-28

### Added

- **Toggle** add `size` prop: `small` or `regular` (default)
- **Icon** `BoldCheck`
- **Checkbox:** New component
- **Tabs** New component
- **Input** `prefix` prop
- **Emptystate** New component
- Provide codemod script to automatically transform `Button` deprecated props. To run it:
  ```sh
    yarn global add jscodeshift
    jscodeshift -t node_modules/@vtex/styleguide/codemod/button-v4.js --ignore-pattern node_modules <path>
  ```

### Changed

- **[BREAKING] Button** change `primary` and `secondary` to `variation="primary"` and `variation="secondary"`
- **[BREAKING] Button** change default variation from tertiary to primary
- **[BREAKING] Button** change size values to "small", "regular" and "large"
- **[BREAKING] Button** change default size to "regular"
- **Button** fix secondary button colors to blue tones
- **Card** Container to 100% width
- **Card** change prop `fullWidth` to `noPadding`
- **Check icon** change SVG and `size` prop type
- **Deny icon** change SVG and `size` prop type
- **Dropdown** fix `value` prop type
- **Input** fix `required` prop type
- **Radio** increase radio input area
- **Toggle** fix disabled contrast

## [3.0.2] - 2018-05-11

### Changed

- **Input** `label` container to 100% width

## [3.0.1] - 2018-05-10

### Changed

- **Dropdown:** Allows for empty/invalid initial values, and adds a placeholder option in that case

## [3.0.0] - 2018-05-10

### Changed

- **Radio** `checked` prop as `boolean`
- **Toggle** demo prop `onClick` to `onChange`

## [2.3.0] - 2018-05-08

### Added

- **Icon** `Search`

## [2.2.1] - 2018-05-08

### Changed

- **Icon** `Upload` & `Download` weight

## [2.2.0] - 2018-05-08

### Added

- **Icon** `Plus`
- **Icon** `Upload`
- **Icon** `Download`

## [2.1.1] - 2018-05-07

### Changed

- **Card** Border radius

## [2.1.0] - 2018-05-04

### Added

- **Button** prop `isLoading`

## [2.0.2] - 2018-05-04

### Added

- **Radio:** New component

## [2.0.1] - 2018-05-04

### Added

- **Badge:**

## [2.0.0-rc.41] - 2018-04-30

### Changed

- **Modal:** Move close button into the modal padding, and increase its hit area.

### Added

- **Input:** Adds prop `onKeyPress` for event handling
- **Dropdown:** Allows using numbers as items values and labels, and nodes as labels

### Changed

- **Button** Change secondary button style, remove outline and change color

## [2.0.0-rc.40] - 2018-04-26

### Fixed

- **Dropdown** Fix inline vendor prefix

## [2.0.0-rc.39] - 2018-04-19

### Changed

- **Dropdown** Changed prop `optionsCaption` to `placeholder`
- **Dropdown** Uses the native `select` instead of a custom one
- **Dropdown** Allows for `node` and `string` on the props `helpText` and `errorMessage`

## [2.0.0-rc.38] - 2018-04-18

### Fixed

- Remove css from spinner

## [2.0.0-rc.37] - 2018-04-11

### Fixed

- Remove extra space in button with icon, and fix alignment between buttons

## [2.0.0-rc.36] - 2018-04-11

### Added

- Namespaces to make components customizable

## [2.0.0-rc.35] - 2018-04-06

### Added

- **Input** `dataAttributes` prop to pass data attributes

### Changed

- Dependencies update
- **Modal** prop `content` renamed to `children`
- **Input** if the prop `label` is not passed, no HTML for label is rendered.
- **Input** props `large` and `xLarge` are now `size="large"` and `size="x-large"`.

### Removed

- **Modal** props `title` & `style`
- **Dropdown** and **Input** prop `block`. They are always block.
- **Dropdown** and **Input** props `short` and `long`. Their widths should be defined by their parents.
