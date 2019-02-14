/* eslint-disable camelcase */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FilterTag from './FilterTag'

const mountStatementsWithOptions = options => {
  // this preselects all subjects since each filter is a subject
  const optionsKeys = Object.keys(options)
  return optionsKeys.map(key => {
    return {
      subject: key,
      optionKey: key,
    }
  })
}

const filterExtraOptions = (options, alwaysVisibleFilters, statements) => {
  const newOptions = { ...options }
  const optionsKeys = Object.keys(options)
  optionsKeys.forEach(key => {
    if (alwaysVisibleFilters.includes(key)) {
      delete newOptions[key]
    }
  })
  statements.forEach(st => {
    if (st.object) {
      delete newOptions[st.optionKey]
    }
  })
  return newOptions
}

/**
 * @visibleName Filter
 */
class EXPERIMENTAL_Filter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visibleExtraOptions: [],
      statements: mountStatementsWithOptions(props.options),
    }
  }

  toggleExtraFilterOption = optionLabel => {
    const { visibleExtraOptions } = this.state
    const newVisibleExtraOptions = [
      ...(visibleExtraOptions.indexOf(optionLabel) === -1 ? [optionLabel] : []),
      ...visibleExtraOptions.filter(op => op !== optionLabel),
    ]
    this.setState({ visibleExtraOptions: newVisibleExtraOptions })
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
    const { options, moreOptionsLabel, alwaysVisibleFilters } = this.props
    const { statements } = this.state
    const optionsKeys = Object.keys(options)

    return (
      optionsKeys.length > 0 && (
        <div className="flex flex-wrap w-100">
          {optionsKeys
            .filter(key => alwaysVisibleFilters.includes(key))
            .map(optionKey => {
              return (
                <div key={`VTEX__filter_option--${optionKey}`} className="ma2">
                  <FilterTag
                    alwaysVisible={alwaysVisibleFilters.includes(optionKey)}
                    subjectPlaceholder={'Select subject'}
                    emptyFilterLabel="Any"
                    filterLabel="Range..."
                    optionKey={optionKey}
                    options={options}
                    statements={statements}
                    onClickClear={() => alert(`clear ${optionKey} filter!`)}
                  />
                </div>
              )
            })}
          {alwaysVisibleFilters.length !== optionsKeys.length && (
            <div className="ma2">
              <FilterTag
                isMoreOptions
                subjectPlaceholder="Select a filter..."
                filterLabel={moreOptionsLabel}
                options={{
                  ...filterExtraOptions(
                    options,
                    alwaysVisibleFilters,
                    statements
                  ),
                }}
                statements={[
                  { subject: null, verb: null, object: null, error: null },
                ]}
              />
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
  /** Filters change callback: returns array of statement definitions */
  onChangeStatements: PropTypes.func,
  /** lable for MORE options */
  moreOptionsLabel: PropTypes.string,
  /** filter options that are always visible outside MORE options */
  alwaysVisibleFilters: PropTypes.arrayOf(PropTypes.string),
}

export default EXPERIMENTAL_Filter
