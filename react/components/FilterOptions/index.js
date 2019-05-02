import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FilterColapsible from './FilterColapsible'

class FilterOptions extends PureComponent {
  handleStatementChange = statement => {
    const { statements } = this.props
    const { subject } = statement
    const filteredStatements = statements.filter(st => st.subject !== subject)
    this.props.onChangeStatements([...filteredStatements, statement])
  }

  render() {
    const { options, statements } = this.props
    const optionsKeys = Object.keys(options)
    return (
      optionsKeys.length > 0 && (
        <div className={'flex flex-column'}>
          {optionsKeys.map(subject => {
            return (
              <div key={`VTEX__filter_option--${subject}`} className="ma2">
                <FilterColapsible
                  subject={subject}
                  options={options}
                  statements={statements}
                  onChangeStatement={this.handleStatementChange}
                />
              </div>
            )
          })}
        </div>
      )
    )
  }
}

FilterOptions.defaultProps = {
  options: [],
}

FilterOptions.propTypes = {
  /** filter options (mirroring statements from Conditions component) */
  options: PropTypes.object.isRequired,
  /** filter statements (mirroring statements from Conditions component) */
  statements: PropTypes.array,
  /** Filters change callback: returns array of statement definitions */
  onChangeStatements: PropTypes.func.isRequired,
}

export default FilterOptions
