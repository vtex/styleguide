# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Input** `dataAttributes` prop to pass data attributes

### Changed
- **Modal** Replaced `react-modal` for `react-responsive-modal`
- **Input** if the prop `label` is not passed, no HTML for label is rendered.
- **Input** props `large` and `xLarge` are now `size="large"` and `size="x-large"`.

### Removed
- **Dropdown** and **Input** prop `block`. They are always block.
- **Dropdown** and **Input** props `short` and `long`. Their widths should be defined by their parents.
