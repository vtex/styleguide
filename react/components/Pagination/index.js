import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CaretLeft from '../icon/CaretLeft'
import CaretRight from '../icon/CaretRight'
import Button from '../Button'
import Dropdown from '../Dropdown'

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
    const { rowsOptions } = this.props
    const { selectedRowsOptionIndex } = this.state
    const dropdownOptions = this.createRowOptions(rowsOptions)

    const isPrevDisabled = this.props.currentItemFrom === 1
    const isNextDisabled = this.props.currentItemTo >= this.props.totalItems

    return (
      <div
        className={`flex flex-row items-center ${
          rowsOptions ? 'justify-between' : 'justify-end'
        }`}
      >
        {dropdownOptions && (
          <div className="flex flex-row items-baseline">
            <span className="mr4">{this.props.textShowRows}</span>
            <Dropdown
              label=""
              options={dropdownOptions}
              value={dropdownOptions[selectedRowsOptionIndex].label}
              onChange={this.handleRowsChange}
            />
          </div>
        )}

        <div className="flex flex-row items-center">
          <div>
            {this.props.currentItemFrom}
            {' - '}
            {this.props.currentItemTo} {this.props.textOf}{' '}
            {this.props.totalItems}
          </div>
          <Button
            icon
            variation="tertiary"
            disabled={isPrevDisabled}
            onClick={this.handlePrevPage}
          >
            <CaretLeft color="currentColor" />
          </Button>
          <Button
            icon
            variation="tertiary"
            disabled={isNextDisabled}
            onClick={this.handleNextPage}
          >
            <CaretRight color="currentColor" />
          </Button>
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
