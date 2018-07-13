import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconArrowLeft from './IconArrowLeft'
import IconArrowRight from './IconArrowRight'
import config from 'vtex-tachyons/config.json'

class Pagination extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: props.currentPage,
      error: props.pages < props.currentPage || props.currentPage < 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: nextProps.currentPage,
      error: nextProps.pages < nextProps.currentPage ||
        nextProps.currentPage < 1,
    })
  }

  handlePreviousPage = () => {
    const newValue = this.props.currentPage - 1
    this.props.onChange(newValue)
    this.setState({ currentPage: newValue })
  };

  handleNextPage = () => {
    const newValue = this.props.currentPage + 1
    this.props.onChange(newValue)
    this.setState({ currentPage: newValue })
  };

  handleInputChange = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '')

    this.setState({
      currentPage: value,
      error: this.props.pages < value || value < 1,
    })
  };

  handleBlur = () => {
    this.setState({ currentPage: this.props.currentPage, error: false })
  };

  handleKeyDown = ({ key }) => {
    if (key === 'Enter' && !this.state.error) {
      this.props.onChange(this.state.currentPage)
    }
  };

  render() {
    const { currentPage, pages } = this.props
    const previousDisabled = parseInt(currentPage, 10) === 1
    const nextDisabled = parseInt(pages, 10) === parseInt(currentPage, 10)

    return (
      <div className="flex">
        <div className="flex bt bl bb b--light-gray bw1 br2 br--left">
          <button
            onClick={this.handlePreviousPage}
            disabled={previousDisabled}
            className={
              `bn f6 pv3 ph4 flex items-center ${previousDisabled ? '' : 'pointer hover-bg-washed-blue'}`
            }
          >
            <IconArrowLeft
              fill={previousDisabled ? config.colors.silver : undefined}
            />
          </button>
        </div>
        <div className="dib">
          <input
            className={
              `ba ${this.state.error ? 'b--washed-red' : 'b--light-gray'} f6 pa3 bw1 dib w2 tc`
            }
            value={this.state.currentPage}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="flex bt br bb b--light-gray bw1 br2 br--right">
          <button
            onClick={this.handleNextPage}
            disabled={nextDisabled}
            className={
              `bn f6 pv3 ph4 flex items-center ${nextDisabled ? '' : 'pointer hover-bg-washed-blue'}`
            }
          >
            <IconArrowRight
              fill={nextDisabled ? config.colors.silver : undefined}
            />
          </button>
        </div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  currentPage: 1,
  pages: Infinity,
}

Pagination.propTypes = {
  /** Current page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  pages: PropTypes.number.isRequired,
  /** onChange event */
  onChange: PropTypes.func.isRequired,
}

export default Pagination
