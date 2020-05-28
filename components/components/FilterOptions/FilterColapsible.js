import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Statement from '../Statement'
import Collapsible from '../Collapsible'

class FilterColapsible extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsibleOpen: props.beginWithOpenCollapsibles,
    }
  }

  handleChangeStatement = (newValue, structure) => {
    const { statement } = this.props
    return this.props.onChangeStatement({ ...statement, [structure]: newValue })
  }

  render() {
    const { options, subject, statement } = this.props
    const { isCollapsibleOpen } = this.state

    const shouldOmitVerb = options[subject].verbs.length === 1

    return (
      <div className="flex items-stretch">
        <Collapsible
          isOpen={isCollapsibleOpen}
          align="left"
          caretColor="base"
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
                statements={[statement]}
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

FilterColapsible.defaultProps = {
  statement: {
    subject: null,
    verb: null,
    object: null,
    error: null,
  },
}

FilterColapsible.propTypes = {
  options: PropTypes.object.isRequired,
  subject: PropTypes.string.isRequired,
  statement: PropTypes.objectOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string.isRequired,
      object: PropTypes.object,
      error: PropTypes.any,
    })
  ),
  onChangeStatement: PropTypes.func.isRequired,
  beginWithOpenCollapsibles: PropTypes.bool,
}

export default FilterColapsible
