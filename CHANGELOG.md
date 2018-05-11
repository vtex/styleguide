# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2018-05-10

### Changed

* **Dropdown:** Allows for empty/invalid initial values, and adds a placeholder option in that case

## [3.0.0] - 2018-05-10

### Changed

* **Radio** `checked` prop as `boolean`
* **Toggle** demo prop `onClick` to `onChange`

## [2.3.0] - 2018-05-08

### Added

* **Icon** `Search`

## [2.2.1] - 2018-05-08

### Changed

* **Icon** `Upload` & `Download` weight

## [2.2.0] - 2018-05-08

### Added

* **Icon** `Plus`
* **Icon** `Upload`
* **Icon** `Download`

## [2.1.1] - 2018-05-07

### Changed

* **Card** Border radius

## [2.1.0] - 2018-05-04

### Added

* **Button** prop `isLoading`

## [2.0.2] - 2018-05-04

### Added

* **Radio:** New component

## [2.0.1] - 2018-05-04

### Added

* **Badge:**

## [2.0.0-rc.41] - 2018-04-30

### Changed

* **Modal:** Move close button into the modal padding, and increase its hit area.

### Added

* **Input:** Adds prop `onKeyPress` for event handling
* **Dropdown:** Allows using numbers as items values and labels, and nodes as labels

### Changed

* **Button** Change secondary button style, remove outline and change color

## [2.0.0-rc.40] - 2018-04-26

### Fixed

* **Dropdown** Fix inline vendor prefix

## [2.0.0-rc.39] - 2018-04-19

### Changed

* **Dropdown** Changed prop `optionsCaption` to `placeholder`
* **Dropdown** Uses the native `select` instead of a custom one
* **Dropdown** Allows for `node` and `string` on the props `helpText` and `errorMessage`

## [2.0.0-rc.38] - 2018-04-18

### Fixed

* Remove css from spinner

## [2.0.0-rc.37] - 2018-04-11

### Fixed

* Remove extra space in button with icon, and fix alignment between buttons

## [2.0.0-rc.36] - 2018-04-11

### Added

* Namespaces to make components customizable

## [2.0.0-rc.35] - 2018-04-06

### Added

* **Input** `dataAttributes` prop to pass data attributes

### Changed

* Dependencies update
* **Modal** prop `content` renamed to `children`
* **Input** if the prop `label` is not passed, no HTML for label is rendered.
* **Input** props `large` and `xLarge` are now `size="large"` and `size="x-large"`.

### Removed

* **Modal** props `title` & `style`
* **Dropdown** and **Input** prop `block`. They are always block.
* **Dropdown** and **Input** props `short` and `long`. Their widths should be defined by their parents.
