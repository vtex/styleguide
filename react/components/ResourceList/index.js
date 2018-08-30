import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import InputSearch from '../InputSearch'
import Button from '../Button'
import IconDownload from '../icon/Download'

class ResourceList extends PureComponent {
  handleInputSearchSubmit = e => {
    this.props.inputSearch.onSubmit && this.props.inputSearch.onSubmit(e)
  }

  render() {
    const { table, exportBtn, pagination, inputSearch } = this.props
    const showExportBtn = exportBtn && exportBtn.show

    return (
      <div className="vtex-resourceList__container">
        <div className="mb5 flex flex-row">
          {inputSearch && (
            <form className="w-100" onSubmit={this.handleInputSearchSubmit}>
              <InputSearch {...inputSearch} />
            </form>
          )}

          {showExportBtn && (
            <Button variation="primary" size="small">
              <span className="flex align-baseline">
                <span className="mr3">
                  <IconDownload color="currentColor" />
                </span>
                {exportBtn.label}
              </span>
            </Button>
          )}
        </div>

        <Table {...table} />

        {pagination && <Pagination {...pagination} />}
      </div>
    )
  }
}

ResourceList.defaultProps = {
  exportBtn: { show: false },
}

ResourceList.propTypes = {
  table: PropTypes.shape({
    items: PropTypes.array.isRequired,
    schema: PropTypes.object.isRequired,
  }).isRequired,
  exportBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string.isRequired,
  }),
  pagination: PropTypes.shape({
    onNextClick: PropTypes.func.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    currentItemFrom: PropTypes.number.isRequired,
    currentItemTo: PropTypes.number.isRequired,
    textOf: PropTypes.string.isRequired,
    totalItems: PropTypes.number.isRequired,
  }),
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
  }),
}

export default ResourceList
