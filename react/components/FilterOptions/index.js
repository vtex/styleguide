import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import head from 'lodash/head'

import FilterColapsible from './FilterColapsible'

class FilterOptions extends PureComponent {
  handleStatementChange = statement => {
    const { statements } = this.props
    const { subject } = statement
    const filteredStatements = statements.filter(st => st.subject !== subject)
    this.props.onChangeStatements([...filteredStatements, statement])
  }

  extractStatement = (statements, subject) =>
    find(statements, st => st.subject === subject)

  createEmptyStatement = (subject, options) => {
    const availableVerbs =
      options && options[subject] ? options[subject].verbs : []
    const verb = head(availableVerbs) ? head(availableVerbs).value : null
    return {
      subject,
      verb,
      object: null,
      error: null,
    }
  }

  render() {
    const { options, statements } = this.props
    const optionsKeys = Object.keys(options)
    return (
      optionsKeys.length > 0 && (
        <div className={'flex flex-column'}>
          {optionsKeys.map(subject => {
            const statement =
              this.extractStatement(statements, subject) ||
              this.createEmptyStatement(subject, options)
            return (
              <div key={subject} className="ma2">
                <FilterColapsible
                  subject={subject}
                  options={options}
                  statement={statement}
                  onChangeStatement={this.handleStatementChange}
                  beginWithOpenCollapsibles={optionsKeys.length <= 3}
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
  options: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      verbs: PropTypes.array.isRequired,
    })
  ).isRequired,
  /** filter statements (mirroring statements from Conditions component) */
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string.isRequired,
      object: PropTypes.any,
      error: PropTypes.any,
    })
  ),
  /** Filters change callback: returns array of statement definitions */
  onChangeStatements: PropTypes.func.isRequired,
}

export default FilterOptions
