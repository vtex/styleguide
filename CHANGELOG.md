# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0-rc.34] - 2018-04-04

### Added

* Structure: page per section
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
