# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
