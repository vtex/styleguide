import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

import Button from '../Button'
import IconClear from '../icon/Clear'
import IconClose from '../icon/Close'
import IconCaretDown from '../icon/CaretDown'
import Statement from '../Statement'
import Menu from './Menu'

const OPEN_MENU_STYLE = { backgroundColor: '#dbe9fd' }
const emptyVirtualStatement = {
  subject: null,
  verb: null,
  object: null,
  error: null,
}

const filterStatementBySubject = (statements = [], subject, options = {}) => {
  const hasStatement = statements.some(st => st.subject === subject)
  return hasStatement
    ? statements.filter(st => st.subject === subject)
    : [
        {
          ...emptyVirtualStatement,
          subject: subject,
          verb:
            options[subject] && options[subject].verbs.length > 0
              ? options[subject].verbs[0].value
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
      const statement = filterStatementBySubject(
        nextProps.statements,
        nextProps.subject,
        nextProps.options
      )[0]
      return {
        virtualStatement: merge({}, statement, prevState.virtualStatement),
      }
    }
    return prevState
  }

  openMenu = () => {
    if (this.state.isMenuOpen) return

    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({
      isMenuOpen: true,
      virtualStatement: filterStatementBySubject(
        this.props.statements,
        this.props.subject,
        this.props.options
      )[0],
    })
  }

  closeMenu = () => {
    if (!this.state.isMenuOpen) return

    document.removeEventListener('mousedown', this.handleClickOutside)
    this.setState({
      isMenuOpen: false,
      virtualStatement: filterStatementBySubject(
        [],
        this.props.subject,
        this.props.options
      )[0],
    })
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

  handleChangeStatement = statement => {
    this.setState(state => {
      return {
        virtualStatement: merge({}, state.virtualStatement, {
          ...statement,
        }),
      }
    })
  }

  resetVirtualStatement = () => {
    const { subject, options } = this.props
    const statement = filterStatementBySubject([], subject, options)
    this.setState({ virtualStatement: statement })
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
      submitFilterLable,
      newFilterLable,
    } = this.props
    const { isMenuOpen, virtualStatement } = this.state

    const statement = filterStatementBySubject(statements, subject)[0]
    const isEmpty = !!(
      statements &&
      (!statement || (statement && !statement.object))
    )

    const shouldOmitSubject = !isMoreOptions
    const shouldOmitVerb = isMoreOptions
      ? false
      : options[subject].verbs.length === 1

    // this is temporary just to assure backward compatibility
    const compatibleOptions = {}
    Object.keys(options).forEach(opt => {
      compatibleOptions[opt] = merge({}, { ...options[opt] })
      compatibleOptions[opt].verbs = options[opt].verbs.map(verb => {
        if (typeof verb.object === 'function') {
          return verb
        }
        console.warn(
          '[Deprecation alert]',
          'FilterBar prop "options" will change contract due to Conditions and Statement refactor.',
          'please if you are using it let @guigs and @eric know...'
        )
        return {
          ...verb,
          object: ({ error, onChange, value }) => {
            return (
              <>
                {verb.object.renderFn({
                  statements: [merge({}, statement, virtualStatement)],
                  values: value,
                  statementIndex: 0,
                  error,
                  extraParams: verb.object && verb.object.extraParams,
                  onChangeObjectCallback: onChange,
                })}
              </>
            )
          },
        }
      })
    })

    return (
      <div
        ref={this.filterMenuContainer}
        style={{
          ...(isMenuOpen && OPEN_MENU_STYLE),
        }}
        className={`br-pill ${
          isEmpty || isMoreOptions ? '' : 'pr4'
        } pv1 dib bn ${
          alwaysVisible && isEmpty
            ? 'bg-transparent hover-bg-muted-5'
            : isMoreOptions
            ? 'hover-bg-muted-5'
            : 'bg-action-secondary hover-bg-action-secondary'
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
                        <span>{`${options[subject].label}:\xa0`}</span>
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
              <div
                className={`flex flex-wrap ${isMoreOptions ? 'mb6' : 'mb3'}`}>
                {isMoreOptions && (
                  <span className="f4 mh3">{newFilterLable}</span>
                )}
                <div className="flex flex-column">
                  {shouldOmitSubject && (
                    <span className="f4 mh3 mb5">{options[subject].label}</span>
                  )}
                  {shouldOmitVerb && (
                    <span className="mh3">
                      {options[subject].verbs[0].label}
                    </span>
                  )}
                </div>
                <div
                  className="ml-auto mr3 items-center pointer"
                  onClick={() => this.closeMenu()}>
                  <IconClose size={18} />
                </div>
              </div>
              <Statement
                isFullWidth
                omitSubject={shouldOmitSubject}
                omitVerbs={shouldOmitVerb}
                options={compatibleOptions}
                subjectPlaceholder={subjectPlaceholder}
                statement={
                  isMoreOptions
                    ? virtualStatement
                    : merge({}, statement, virtualStatement)
                }
                onChangeStatement={this.handleChangeStatement}
                onChangeObjectCallback={st =>
                  this.handleChangeStatement({
                    ...st,
                    error: null,
                  })
                }
              />
              <div className="flex justify-end mt4 mh3">
                <Button
                  type="submit"
                  disabled={virtualStatement && !virtualStatement.object}
                  onClick={() => {
                    onSubmitFilterStatement(virtualStatement)
                    this.resetVirtualStatement()
                    this.closeMenu()
                  }}>
                  {submitFilterLable}
                </Button>
              </div>
            </div>
          </Menu>
          {!isEmpty && !isMoreOptions && (
            <div
              className="flex items-center c-link hover-c-link pointer"
              onClick={() => {
                this.resetVirtualStatement()
                onClickClear()
              }}>
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
  newFilterLable: '…',
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
  submitFilterLable: PropTypes.string.isRequired,
  newFilterLable: PropTypes.string,
}

export default FilterTag
