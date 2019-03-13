/* eslint-disable */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconClear from '../icon/Clear'
import IconCaretDown from '../icon/CaretDown'
import Statement from '../EXPERIMENTAL_Conditions/Statement'
import Menu from './Menu'

const emptyVirtualStatement = {
  subject: null,
  verb: null,
  object: null,
  error: null,
}

const filterStatementBySubject = (statements = [], sbj, options = {}) => {
  const hasStatement = statements.some(st => st.subject === sbj)
  return hasStatement
    ? statements.filter(st => st.subject === sbj)
    : [
        {
          ...emptyVirtualStatement,
          subject: sbj,
          verb:
            options[sbj] && options[sbj].verbs.length === 1
              ? options[sbj].verbs[0].value
              : null,
        },
      ]
}

class FilterTag extends PureComponent {
  constructor(props) {
    super(props)
    this.filterMenuContainer = React.createRef()

    this.state = {
      isMenuOpen: false,
      virtualStatement: filterStatementBySubject(
        props.statements,
        props.subject,
        props.options
      )[0],
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.statements &&
      nextProps.statements.length > 0 &&
      nextProps.subject &&
      nextProps.statements.some(st => st.subject === nextProps.subject)
    ) {
      const statement = filterStatementBySubject(nextProps.statements, nextProps.subject, nextProps.options)
      return {
        isMenuOpen: prevState.isMenuOpen,
        virtualStatement: statement,
      }
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

  onChangeStatement = (newValue, structure) => {
    this.setState(state => {
      return {
        virtualStatement: {
          ...state.virtualStatement,
          [structure]: newValue,
        },
      }
    })
  }

  resetVirtualStatement = () => {
    const { subject } = this.props
    this.setState({
      virtualStatement: {
        ...emptyVirtualStatement,
        subject,
      },
    })
  }

  render() {
    const {
      options,
      subject,
      statements,
      alwaysVisible,
      getFilterLabel,
      subjectPlaceholder,
      onClickClear,
      isMoreOptions,
      onSubmitFilterStatement,
    } = this.props
    const { isMenuOpen, virtualStatement } = this.state

    const statement = filterStatementBySubject(statements, subject)[0]
    const isEmpty = !!(
      statements &&
      (!statement || (statement && !statement.object))
    )

    const shouldOmmitSubject = !isMoreOptions
    const shouldOmmitVerb = isMoreOptions
      ? false
      : options[subject].verbs.length === 1

    return (
      <div
        ref={this.filterMenuContainer}
        className={`br-pill ${
          isEmpty || isMoreOptions ? '' : 'pr4'
        } pv1 dib bn pointer ${
          isMenuOpen
            ? 'bg-action-secondary'
            : alwaysVisible && isEmpty
            ? 'bg-transparent hover-bg-muted-5'
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
                          options[subject].label
                        }:\xa0`}</span>
                        <span className="fw5">{`\xa0${getFilterLabel(
                          filterStatementBySubject(statements, subject)
                        )}`}</span>
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
              {shouldOmmitSubject && (
                <span className="b mh3">{options[subject].label}</span>
              )}
              {shouldOmmitVerb && (
                <span className="b mh3">{options[subject].verbs[0].label}</span>
              )}
              <Statement
                isFullWidth
                canDelete={false}
                ommitSubject={shouldOmmitSubject}
                ommitVerbs={shouldOmmitVerb}
                options={options}
                subjectPlaceholder={subjectPlaceholder}
                statementIndex={0}
                statements={
                  isMoreOptions
                    ? [
                        {
                          ...{},
                          ...virtualStatement,
                        },
                      ]
                    : [
                        {
                          ...{},
                          ...statement,
                          ...virtualStatement,
                        },
                      ]
                }
                onChangeStatement={this.onChangeStatement}
                onChangeObjectCallback={value =>
                  this.onChangeStatement(value, 'object')
                }
              />
              <div className="flex justify-end mt4 mh3">
                <Button
                  type="submit"
                  onClick={() => {
                    onSubmitFilterStatement(virtualStatement)
                    this.resetVirtualStatement()
                    this.closeMenu()
                  }}>
                  {/* TO DO: convert this to label prop, so it's translatable */}
                  OK
                </Button>
              </div>
            </div>
          </Menu>
          {!isEmpty && !isMoreOptions && (
            <div
              className="flex items-center c-link"
              onClick={() => onClickClear()}>
              <IconClear solid size={16} />
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
  subjectPlaceholder: '…',
}

FilterTag.propTypes = {
  options: PropTypes.object.isRequired,
  subject: PropTypes.string,
  statements: PropTypes.array,
  alwaysVisible: PropTypes.bool,
  getFilterLabel: PropTypes.func,
  subjectPlaceholder: PropTypes.string,
  onClickClear: PropTypes.func,
  isMoreOptions: PropTypes.bool,
  onSubmitFilterStatement: PropTypes.func.isRequired,
}

export default FilterTag
