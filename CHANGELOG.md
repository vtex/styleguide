# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Dropdown** add missing border on disabled state

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
