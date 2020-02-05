import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import classNames from 'classnames'

import withDevice from '../utils/withDeviceHoc'
import Button from '../Button'
import IconClear from '../icon/Clear'
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

  handleCloseMenu = () => {
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
      this.handleCloseMenu()
    }
  }

  componentWillUnmount() {
    if (this.state.isMenuOpen) {
      this.handleCloseMenu()
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
      submitFilterLabel,
      newFilterLabel,
      isMobile,
      testIds,
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
        className={`br2 ba b--solid ${
          isEmpty || isMoreOptions ? '' : 'pr4'
        } pv1 dib ${
          alwaysVisible && isEmpty
            ? 'bg-transparent hover-bg-muted-5 b--muted-4'
            : isMoreOptions
            ? 'hover-bg-muted-5 b--muted-4'
            : 'bg-action-secondary hover-bg-action-secondary b--action-secondary'
        } c-on-base`}>
        <div className="flex items-stretch">
          <Menu
            open={isMenuOpen}
            onBackgroundClick={this.handleCloseMenu}
            align="left"
            options={options[subject]}
            button={
              <button
                type="button"
                className="bw1 ba br2 v-mid relative bg-transparent b--transparent c-action-primary pointer w-100 outline-0"
                onClick={isMenuOpen ? this.handleCloseMenu : this.openMenu}>
                <div className="flex items-center justify-center h-100 ph3 ">
                  <span className="flex items-center nl1 nowrap">
                    {isMoreOptions ? (
                      <span
                        className="fw5"
                        data-testid={testIds.moreOptionsButton}>
                        {getFilterLabel()}
                      </span>
                    ) : isMobile ? (
                      <span className="ttu f6 fw5">
                        {options[subject].label}
                      </span>
                    ) : (
                      <Fragment>
                        <span>{`${options[subject].label}:\xa0`}</span>
                        <span className="fw5">{`${getFilterLabel(
                          filterStatementBySubject(statements, subject)
                        )}`}</span>
                      </Fragment>
                    )}
                    {!isMobile && (
                      <div className="ml2 nr2">
                        <IconCaretDown size={11} color="currentColor" />
                      </div>
                    )}
                  </span>
                </div>
              </button>
            }>
            <div className="ma6 ma5-ns h-75 h-auto-ns flex flex-column justify-between">
              <div
                className={classNames({
                  'overflow-scroll': isMobile && 'overflow-scroll',
                })}>
                <div
                  className={`flex flex-wrap ${isMoreOptions ? 'mb6' : 'mb3'}`}>
                  {isMoreOptions && (
                    <span className="f4 mh3">{newFilterLabel}</span>
                  )}
                  <div className="flex flex-column">
                    {shouldOmitVerb && (
                      <span className="mh3">
                        {options[subject].verbs[0].label}
                      </span>
                    )}
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
              </div>
              <div className="flex justify-end mt4 mh3">
                <Button
                  testId={testIds.submitFiltersButton}
                  block={isMobile}
                  type="submit"
                  disabled={virtualStatement && !virtualStatement.object}
                  onClick={() => {
                    onSubmitFilterStatement(virtualStatement)
                    this.resetVirtualStatement()
                    this.handleCloseMenu()
                  }}>
                  {submitFilterLabel}
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
  newFilterLabel: 'New filter',
  testIds: {},
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
  submitFilterLabel: PropTypes.string.isRequired,
  newFilterLabel: PropTypes.string,
  device: PropTypes.string,
  isMobile: PropTypes.bool,
  testIds: PropTypes.shape({
    moreOptionsButton: PropTypes.string,
    submitFiltersButton: PropTypes.string,
  }),
}

export default withDevice(FilterTag)
