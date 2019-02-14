/* eslint-disable */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconClear from '../icon/Clear'
import IconCaretDown from '../icon/CaretDown'
import Statement from '../EXPERIMENTAL_Conditions/Statement'
import Menu from './Menu'

const filterStatementByOptionKey = (statements, key) => {
  let filteredStatements = statements.filter(st => st.optionKey === key)
  // delete filteredStatements.optionKey
  return filteredStatements
}

class FilterTag extends PureComponent {
  constructor() {
    super()
    this.filterMenuContainer = React.createRef()
    this.state = {
      isMenuOpen: false,
    }
  }

  openMenu = () => {
    if (this.state.isMenuOpen) return

    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({ isMenuOpen: true })
  }

  closeMenu = () => {
    if (!this.state.isMenuOpen) return

    document.removeEventListener('mousedown', this.handleClickOutside)
    this.setState({ isMenuOpen: false })
  }

  handleClick = () => {
    if (!this.state.isMenuOpen) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  handleClickOutside = e => {
    if (
      this.filterMenuContainer &&
      this.filterMenuContainer.current &&
      !this.filterMenuContainer.current.contains(e.target) &&
      this.state.isMenuOpen
    ) {
      this.closeMenu()
    }
  }

  componentWillUnmount() {
    if (this.state.isMenuOpen) {
      this.closeMenu()
    }
  }

  render() {
    const {
      options,
      optionKey,
      statements,
      alwaysVisible,
      emptyFilterLabel,
      filterLabel,
      subjectPlaceholder,
      onClickClear,
      isMoreOptions,
    } = this.props
    const { isMenuOpen } = this.state

    // TO DO: implement this logic
    const isEmpty = alwaysVisible ? true : false

    return (
      <div
        ref={this.filterMenuContainer}
        className={`br-pill t-small ${
          isEmpty || isMoreOptions ? '' : 'pr4'
        } pv1 dib bn pointer ${
          isMenuOpen
            ? 'bg-action-secondary'
            : alwaysVisible || isMoreOptions
            ? ''
            : 'bg-muted-4'
        } c-on-base hover-bg-muted-5`}>
        <div className="flex items-stretch">
          <Menu
            open={isMenuOpen}
            align="left"
            button={
              <button
                type="button"
                className="bw1 ba br2 v-mid relative t-action--small bg-transparent b--transparent c-action-primary pointer w-100 outline-0"
                onClick={isMenuOpen ? this.closeMenu : this.openMenu}>
                <div className="flex items-center justify-center h-100 ph3 ">
                  <span className="flex items-center nl1 nowrap">
                    {isMoreOptions ? (
                      <span className="fw5">{filterLabel}</span>
                    ) : (
                      <Fragment>
                        <span className="fw5">{`${
                          options[optionKey].label
                        }: `}</span>
                        <span className="">{`${
                          isEmpty ? emptyFilterLabel : filterLabel
                        }`}</span>
                      </Fragment>
                    )}
                    <div className="ml2 nr2">
                      <IconCaretDown size={11} color="currentColor" />
                    </div>
                  </span>
                </div>
              </button>
            }>
            <div className="ma5">
              <Statement
                isFullWidth
                canDelete={false}
                ommitSubject={!isMoreOptions}
                ommitVerbs={
                  isMoreOptions
                    ? false
                    : filterStatementByOptionKey(statements, optionKey) &&
                      filterStatementByOptionKey(statements, optionKey).verb
                }
                options={isMoreOptions ? options : { [optionKey]: options[optionKey] }}
                subjectPlaceholder={subjectPlaceholder}
                statements={isMoreOptions ? statements : filterStatementByOptionKey(statements, optionKey)}
              />
              <div className="flex justify-end mt4">
                <Button onClick={() => this.closeMenu()}>OK</Button>
              </div>
            </div>
          </Menu>
          {!isEmpty && !isMoreOptions && (
            <div className="flex items-center" onClick={() => onClickClear()}>
              <IconClear
                solid
                // TO DO: when import primary action color is available, update this
                color="#134cd8"
                size={16}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

FilterTag.defaultProps = {
  alwaysVisible: false,
  isMoreOptions: false,
}

FilterTag.propTypes = {
  options: PropTypes.object.isRequired,
  optionKey: PropTypes.string,
  alwaysVisible: PropTypes.bool,
  filterLabel: PropTypes.string,
  emptyFilterLabel: PropTypes.string,
  subjectPlaceholder: PropTypes.string,
  onClickClear: PropTypes.func,
  isMoreOptions: PropTypes.bool,
}

export default FilterTag
