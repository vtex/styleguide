import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import CaretLeft from '../icon/CaretLeft'
import CaretRight from '../icon/CaretRight'
import ButtonWithIcon from '../ButtonWithIcon'
import Dropdown from '../Dropdown'
import PageIndicator from './PageIndicator'

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
      selectedOption,
      hasPageTopIndicator,
      itemLabel,
      testIds,
    } = this.props
    const { selectedRowsOptionIndex } = this.state

    const dropdownOptions = this.createRowOptions(rowsOptions)

    const isPrevDisabled = currentItemFrom <= 1
    const isNextDisabled = currentItemTo >= totalItems

    const itemTo = currentItemTo > totalItems ? totalItems : currentItemTo

    return (
      <div className="flex flex-column">
        {hasPageTopIndicator && (
          <div className="mt2 mb5">
            <PageIndicator
              currentItemFrom={currentItemFrom}
              itemTo={itemTo}
              textOf={textOf}
              totalItems={totalItems}
              itemLabel={itemLabel}
            />
          </div>
        )}
        {this.props.children}
        <div
          className={classNames([
            'flex flex-row items-center',
            {
              'justify-between': rowsOptions,
              'justify-end': !rowsOptions,
            },
          ])}>
          {dropdownOptions && (
            <div className="flex flex-row pt5 items-baseline">
              <span className="mr4 c-muted-2 t-small self-center">
                {textShowRows}
              </span>
              <Dropdown
                size="small"
                options={dropdownOptions}
                selectTestId={testIds.rowsOptions}
                value={
                  selectedOption ||
                  dropdownOptions[selectedRowsOptionIndex].label
                }
                onChange={this.handleRowsChange}
              />
            </div>
          )}

          <div className="flex flex-row pt5 items-center">
            <PageIndicator
              currentItemFrom={currentItemFrom}
              itemTo={itemTo}
              textOf={textOf}
              totalItems={totalItems}
              testId={testIds.pageIndicator}
            />
            <div className="ml4">
              <ButtonWithIcon
                icon={caretLeft}
                variation="secondary"
                size="small"
                disabled={isPrevDisabled}
                onClick={this.handlePrevPage}
                testId={testIds.prevBtn}
              />
            </div>
            <div className="ml2">
              <ButtonWithIcon
                icon={caretRight}
                variation="secondary"
                size="small"
                disabled={isNextDisabled}
                onClick={this.handleNextPage}
                testId={testIds.nextBtn}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  rowsOptions: null,
  hasPageTopIndicator: false,
  testIds: {},
}

Pagination.propTypes = {
  children: PropTypes.node,

  rowsOptions: PropTypes.array,
  currentItemFrom: PropTypes.number.isRequired,
  currentItemTo: PropTypes.number.isRequired,
  textOf: PropTypes.node.isRequired,
  textShowRows: PropTypes.node.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemLabel: PropTypes.string,
  /**
   * Use this prop if you want to control the number of rows selected, instead of leaving it to the Pagination component.
   */
  selectedOption: PropTypes.number,

  onRowsChange: PropTypes.func,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,

  hasPageTopIndicator: PropTypes.bool,

  testIds: PropTypes.shape({
    rowsOptions: PropTypes.string,
    prevBtn: PropTypes.string,
    nextBtn: PropTypes.string,
    pageIndicator: PropTypes.string,
  }),
}

export default Pagination
