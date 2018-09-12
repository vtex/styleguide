import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import InputSearch from '../InputSearch'
import Button from '../Button'
import IconDownload from '../icon/Download'
import IconUpload from '../icon/Upload'

class ResourceList extends PureComponent {
  handleInputSearchSubmit = e => {
    this.props.inputSearch.onSubmit && this.props.inputSearch.onSubmit(e)
  }

  render() {
    const {
      table,
      exportBtn,
      importBtn,
      pagination,
      inputSearch,
    } = this.props
    const showExportBtn = exportBtn && exportBtn.show
    const showImportBtn = importBtn && importBtn.show

    return (
      <div className="vtex-resourceList__container">
        <div className="mb5 flex flex-row justify-between w-100">
          <div id="toolbar">
            {showExportBtn && (
              // eslint-disable-next-line react/jsx-handler-names
              <Button variation="tertiary" size="small" onClick={exportBtn.callback}>
                <span className="flex align-baseline">
                  <span className="mr3">
                    <IconDownload color="currentColor" />
                  </span>
                  {exportBtn.label}
                </span>
              </Button>
            )}
            {showImportBtn && (
              // eslint-disable-next-line react/jsx-handler-names
              <Button variation="tertiary" size="small" onClick={importBtn.callback}>
                <span className="flex align-baseline">
                  <span className="mr3">
                    <IconUpload color="currentColor" />
                  </span>
                  {importBtn.label}
                </span>
              </Button>
            )}
          </div>
          {inputSearch && (
            <form className="w-30" onSubmit={this.handleInputSearchSubmit}>
              <InputSearch {...inputSearch} />
            </form>
          )}
        </div>

        <Table
          {...table}
          containerClass="vh-100"
          containerHeight={36 + (64 * table.items.length)}
        />

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
    callback: PropTypes.func.isRequired,
  }),
  importBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
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
