import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

import Statement from '../UncoupledStatement/UncoupledStatement'
import Collapsible from '../Collapsible'

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

class FilterColapsible extends PureComponent {
  constructor(props) {
    super(props)
    this.filterMenuContainer = React.createRef()

    this.state = {
      isCollapsibleOpen: false,
      virtualStatement: filterStatementBySubject(
        props.statements,
        props.subject,
        props.options
      )[0],
    }
  }

  handleChangeStatement = (newValue, structure) => {
    this.setState(state => {
      const virtualStatement = merge({}, state.virtualStatement, {
        [structure]: newValue,
      })
      this.props.onChangeStatement(virtualStatement)
      return { virtualStatement }
    })
  }

  resetVirtualStatement = () => {
    const { subject, options } = this.props
    const statement = filterStatementBySubject([], subject, options)
    this.setState({ virtualStatement: statement })
  }

  render() {
    const { options, subject, statements } = this.props
    const { isCollapsibleOpen, virtualStatement } = this.state

    const statement = filterStatementBySubject(statements, subject)[0]
    const shouldOmitVerb = options[subject].verbs.length === 1

    return (
      <div className="flex items-stretch">
        <Collapsible
          isOpen={isCollapsibleOpen}
          align="left"
          header={
            <div className="flex items-center h-100 ph4 pv5">
              <span className="flex nl3 ">
                <span className="fw5 f4">{options[subject].label}</span>
              </span>
            </div>
          }
          onClick={e => this.setState({ isCollapsibleOpen: e.target.isOpen })}>
          <div className="ma5">
            {isCollapsibleOpen && (
              <Statement
                isFullWidth
                omitSubject
                omitVerbs={shouldOmitVerb}
                options={options}
                subjectPlaceholder={'…'}
                statements={[merge({}, statement, virtualStatement)]}
                onChangeStatement={this.handleChangeStatement}
                onChangeObjectCallback={value =>
                  this.handleChangeStatement(value, 'object')
                }
              />
            )}
          </div>
        </Collapsible>
      </div>
    )
  }
}

FilterColapsible.propTypes = {
  options: PropTypes.object.isRequired,
  subject: PropTypes.string,
  statements: PropTypes.array,
  onChangeStatement: PropTypes.func.isRequired,
}

export default FilterColapsible
