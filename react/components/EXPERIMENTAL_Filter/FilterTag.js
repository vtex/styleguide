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

const emptyVirtualStatement = {
  subject: null,
  verb: null,
  object: null,
  error: null,
}

class FilterTag extends PureComponent {
  constructor() {
    super()
    this.filterMenuContainer = React.createRef()
    this.state = {
      isMenuOpen: false,
      virtualStatement: emptyVirtualStatement,
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

  onChangeExtraStatement = (newValue, structure) => {
    this.setState(state => {
      return {
        virtualStatement: {
          subject:
            structure === 'subject' ? newValue : state.virtualStatement.subject,
          verb: structure === 'verb' ? newValue : state.virtualStatement.verb,
          object:
            structure === 'object' ? newValue : state.virtualStatement.object,
          error:
            structure === 'error' ? newValue : state.virtualStatement.error,
        },
      }
    })
  }

  resetVirtualStatement = () => {
    this.setState({
      virtualStatement: emptyVirtualStatement,
    })
  }

  render() {
    const {
      options,
      optionKey,
      statements,
      alwaysVisible,
      emptyFilterLabel,
      getFilterLabel,
      subjectPlaceholder,
      onClickClear,
      isMoreOptions,
      onChangeFilterStatements,
      onSubmitFilterStatement,
    } = this.props
    const { isMenuOpen, virtualStatement } = this.state

    const isEmpty = !!(
      statements && !statements.find(st => st.optionKey === optionKey).object
    )

    return (
      <div
        ref={this.filterMenuContainer}
        className={`br-pill ${
          isEmpty || isMoreOptions ? '' : 'pr4'
        } pv1 dib bn pointer ${
          isMenuOpen
            ? 'bg-action-secondary'
            : alwaysVisible
            ? 'bg-muted-5 hover-bg-muted-4'
            : isMoreOptions
            ? 'hover-bg-muted-5'
            : 'bg-muted-4 hover-bg-muted-5'
        } c-on-base`}>
        <div className="flex items-stretch">
          <Menu
            open={isMenuOpen}
            align="left"
            button={
              <button
                type="button"
                className="bw1 ba br2 v-mid relative bg-transparent b--transparent c-action-primary pointer w-100 outline-0"
                onClick={isMenuOpen ? this.closeMenu : this.openMenu}>
                <div className="flex items-center justify-center h-100 ph3 ">
                  <span className="flex items-center nl1 nowrap">
                    {isMoreOptions ? (
                      <span className="fw5">{getFilterLabel()}</span>
                    ) : (
                      <Fragment>
                        <span className="">{`${
                          options[optionKey].label
                        }:\xa0`}</span>
                        <span className="fw5">{`${
                          isEmpty
                            ? `\xa0${emptyFilterLabel}`
                            : `\xa0${getFilterLabel(filterStatementByOptionKey(statements, optionKey))}`
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
                options={
                  isMoreOptions ? options : { [optionKey]: options[optionKey] }
                }
                subjectPlaceholder={subjectPlaceholder}
                statements={
                  isMoreOptions
                    ? [virtualStatement]
                    : filterStatementByOptionKey(statements, optionKey)
                }
                onChangeStatement={(newValue, structure) =>
                  isMoreOptions
                    ? this.onChangeExtraStatement(newValue, structure)
                    : onChangeFilterStatements(newValue, structure, optionKey)
                }
              />
              <div className="flex justify-end mt4">
                <Button
                  onClick={() => {
                    onSubmitFilterStatement(virtualStatement)
                    this.resetVirtualStatement()
                    this.closeMenu()
                  }}>
                  OK
                </Button>
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
  onSubmitFilterStatement: () => {},
}

FilterTag.propTypes = {
  options: PropTypes.object.isRequired,
  optionKey: PropTypes.string,
  alwaysVisible: PropTypes.bool,
  getFilterLabel: PropTypes.func,
  emptyFilterLabel: PropTypes.string,
  subjectPlaceholder: PropTypes.string,
  onClickClear: PropTypes.func,
  isMoreOptions: PropTypes.bool,
  onChangeFilterStatements: PropTypes.func,
  onSubmitFilterStatement: PropTypes.func,
}

export default FilterTag
