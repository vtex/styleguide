import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CaretLeft from '../icon/CaretLeft'
import CaretRight from '../icon/CaretRight'
import ButtonWithIcon from '../ButtonWithIcon'
import Dropdown from '../Dropdown'

const caretLeft = <CaretLeft />
const caretRight = <CaretRight />

class Pagination extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowsOptionIndex: 0,
    }
  }

  handleRowsChange = (e, value) => {
    const { rowsOptions } = this.props
    const optionIndex = rowsOptions.indexOf(parseInt(value, 10))
    this.setState({ selectedRowsOptionIndex: optionIndex })
    this.props.onRowsChange && this.props.onRowsChange(e, value)
  }

  handlePrevPage = e => {
    this.props.onPrevClick && this.props.onPrevClick(e)
  }

  handleNextPage = e => {
    this.props.onNextClick && this.props.onNextClick(e)
  }

  createRowOptions = rowsOptions => {
    if (rowsOptions) {
      const opts = []
      rowsOptions.forEach(o => opts.push({ label: o, value: o }))
      return opts
    }
    return null
  }

  render() {
    const {
      rowsOptions,
      totalItems,
      currentItemFrom,
      currentItemTo,
      textOf,
      textShowRows,
    } = this.props
    const { selectedRowsOptionIndex } = this.state

    const dropdownOptions = this.createRowOptions(rowsOptions)

    const isPrevDisabled = currentItemFrom === 1
    const isNextDisabled = currentItemTo >= totalItems

    const itemTo = currentItemTo > totalItems ? totalItems : currentItemTo

    return (
      <div
        className={`flex flex-row items-center ${
          rowsOptions ? 'justify-between' : 'justify-end'
        }`}>
        {dropdownOptions && (
          <div className="flex flex-row pt5 items-baseline">
            <span className="mr4 c-muted-2 t-small self-center">
              {textShowRows}
            </span>
            <Dropdown
              size="small"
              options={dropdownOptions}
              value={dropdownOptions[selectedRowsOptionIndex].label}
              onChange={this.handleRowsChange}
            />
          </div>
        )}

        <div className="flex flex-row pt5 items-center">
          <div className="c-muted-2 t-small">
            {currentItemFrom}
            {' - '}
            {itemTo} {textOf} {totalItems}
          </div>
          <div className="ml4">
            <ButtonWithIcon
              icon={caretLeft}
              variation="secondary"
              size="small"
              disabled={isPrevDisabled}
              onClick={this.handlePrevPage}
            />
          </div>
          <div className="ml2">
            <ButtonWithIcon
              icon={caretRight}
              variation="secondary"
              size="small"
              disabled={isNextDisabled}
              onClick={this.handleNextPage}
            />
          </div>
        </div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  rowsOptions: null,
}

Pagination.propTypes = {
  rowsOptions: PropTypes.array,
  currentItemFrom: PropTypes.number.isRequired,
  currentItemTo: PropTypes.number.isRequired,
  textOf: PropTypes.string.isRequired,
  textShowRows: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,

  onRowsChange: PropTypes.func,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
}

export default Pagination
