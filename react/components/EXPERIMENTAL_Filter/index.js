/* eslint-disable camelcase */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../ButtonWithIcon'
import IconClose from '../icon/Close'

import FilterTag from './FilterTag'

const isStatementComplete = st => st.subject && st.verb && st.object
const filterExtraOptions = (options, alwaysVisibleFilters, statements) => {
  const newOptions = { ...options }
  const optionsKeys = Object.keys(options)
  optionsKeys.forEach(key => {
    if (alwaysVisibleFilters.includes(key)) {
      delete newOptions[key]
    }
  })
  statements.forEach(st => {
    if (st && st.object) {
      delete newOptions[st.subject]
    }
  })
  return newOptions
}

const FILTER_VALUE_LABEL_MAX_LENGTH = 17
const truncateFilterValue = filterValue =>
  `${filterValue.substring(0, FILTER_VALUE_LABEL_MAX_LENGTH)}${
    filterValue.length <= FILTER_VALUE_LABEL_MAX_LENGTH ? '' : '…'
  }`

/**
 * @visibleName Filter
 */
class EXPERIMENTAL_Filter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visibleExtraOptions: [],
    }
  }

  toggleExtraFilterOption = key => {
    const { visibleExtraOptions } = this.state
    const newVisibleExtraOptions = [
      ...(visibleExtraOptions.indexOf(key) === -1 ? [key] : []),
      ...visibleExtraOptions.filter(op => op !== key),
    ]
    this.setState({ visibleExtraOptions: newVisibleExtraOptions })
  }

  handleSubmitFilter = st => {
    if (isStatementComplete(st)) {
      const { statements } = this.props
      const hasStatement = statements.some(_st => _st.subject === st.subject)
      if (hasStatement) {
        const newStatements = statements.map(_st => {
          if (_st.subject === st.subject) {
            return {
              ..._st,
              ...st,
            }
          }
          return _st
        })
        this.changeStatementsCallback(newStatements)
      } else {
        const newStatements = statements.slice(0)
        newStatements.push(st)
        this.changeStatementsCallback(newStatements)
      }
    }
  }

  handleMoreOptionsSelected = st => {
    if (isStatementComplete(st)) {
      this.handleSubmitFilter(st)
      this.toggleExtraFilterOption(st.subject)
    }
  }

  handleFilterClear = subject => {
    const { alwaysVisibleFilters, options, statements } = this.props
    const newStatements = statements.map(_st => {
      if (_st.subject === subject) {
        return {
          subject: subject,
          verb: options[subject].verbs[0].value,
        }
      }
      return _st
    })
    this.changeStatementsCallback(newStatements)
    !alwaysVisibleFilters.includes(subject) &&
      this.toggleExtraFilterOption(subject)
  }

  changeStatementsCallback = statements => {
    this.props.onChangeStatements(statements)
  }

  handleClearAllfilters = () => {
    this.setState({ visibleExtraOptions: [] })
    this.changeStatementsCallback([])
  }

  componentDidMount() {
    console.warn(
      `Experimental component warning:

       Filter component is in an experimental state.
       This component may suffer breaking changes in a near future, even in minor or patch versions.
       It may even cease to exist without further notice 👻`
    )
  }

  render() {
    const {
      options,
      moreOptionsLabel,
      alwaysVisibleFilters,
      clearAllFiltersButtonLabel,
      statements,
    } = this.props
    const { visibleExtraOptions } = this.state
    const optionsKeys = Object.keys(options)

    return (
      optionsKeys.length > 0 && (
        <div className="flex flex-wrap w-100">
          {optionsKeys
            .filter(
              key =>
                alwaysVisibleFilters.includes(key) ||
                visibleExtraOptions.includes(key)
            )
            .map(subject => {
              const statement = statements.find(st => st.subject === subject)
              return (
                <div key={`VTEX__filter_option--${subject}`} className="ma2">
                  <FilterTag
                    alwaysVisible={alwaysVisibleFilters.includes(subject)}
                    getFilterLabel={() => {
                      const label =
                        options[subject] &&
                        options[subject].renderFilterLabel(statement)
                      return (
                        (label &&
                          typeof label === 'string' &&
                          truncateFilterValue(label)) ||
                        '…'
                      )
                    }}
                    subject={subject}
                    options={options}
                    statements={statements}
                    onClickClear={() => this.handleFilterClear(subject)}
                    onSubmitFilterStatement={this.handleSubmitFilter}
                  />
                </div>
              )
            })}
          {alwaysVisibleFilters.length + visibleExtraOptions.length !==
            optionsKeys.length && (
            <div className="ma2">
              <FilterTag
                isMoreOptions
                subjectPlaceholder="Select a filter…"
                getFilterLabel={() => moreOptionsLabel}
                options={{
                  ...filterExtraOptions(
                    options,
                    alwaysVisibleFilters,
                    statements
                  ),
                }}
                statements={[]}
                onSubmitFilterStatement={this.handleMoreOptionsSelected}
              />
            </div>
          )}
          {clearAllFiltersButtonLabel &&
            statements.some(st => !!st && !!st.object) && (
              <div className="ml-auto mt1">
                <ButtonWithIcon
                  icon={<IconClose size={13} color="c-on-base" />}
                  size="small"
                  variation="tertiary"
                  onClick={this.handleClearAllfilters}>
                  <span className="c-on-base">
                    {clearAllFiltersButtonLabel}
                  </span>
                </ButtonWithIcon>
              </div>
            )}
        </div>
      )
    )
  }
}

EXPERIMENTAL_Filter.defaultProps = {
  options: [],
  moreOptionsLabel: 'More',
  alwaysVisibleFilters: [],
}

EXPERIMENTAL_Filter.propTypes = {
  /** filter options (mirroring statements from Conditions component) */
  options: PropTypes.object.isRequired,
  /** filter statements (mirroring statements from Conditions component) */
  statements: PropTypes.array,
  /** Filters change callback: returns array of statement definitions */
  onChangeStatements: PropTypes.func.isRequired,
  /** lable for MORE options */
  moreOptionsLabel: PropTypes.string,
  /** filter options that are always visible outside MORE options */
  alwaysVisibleFilters: PropTypes.arrayOf(PropTypes.string),
  /** if this label is passed, when some filter is not empty a clear all button will appear */
  clearAllFiltersButtonLabel: PropTypes.string,
}

export default EXPERIMENTAL_Filter
